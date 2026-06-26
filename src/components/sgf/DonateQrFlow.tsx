import { useState } from "react";
import { Smartphone, QrCode, ArrowLeft, CheckCircle2 } from "lucide-react";
import { UpiQr } from "@/components/sgf/UpiQr";
import { siteConfig } from "@/lib/site-config";
import { useT } from "@/lib/i18n";

const PRESET_AMOUNTS = [100, 500, 1000, 2500];

/**
 * Interactive donate flow:
 * 1. Donor fills in their details (name + amount).
 * 2. Clicking "Show QR code" reveals a dynamic UPI QR pre-filled with the amount.
 * 3. Donor scans and pays in any UPI app.
 */
export function DonateQrFlow() {
  const { donate } = siteConfig;
  const t = useT();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [showQr, setShowQr] = useState(false);

  const numericAmount = Number(amount);
  const validAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const canShow = name.trim().length > 0 && validAmount;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="flex items-center gap-3">
        <Smartphone className="size-6 text-blue" aria-hidden="true" />
        <h3 className="font-heading text-xl font-bold text-blue">{t.donate.upiTitle}</h3>
      </div>

      {!showQr ? (
        <form
          className="mt-5 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (canShow) setShowQr(true);
          }}
        >
          <div>
            <label htmlFor="donor-name" className="text-sm font-medium text-foreground">
              {t.donate.donorName}
            </label>
            <input
              id="donor-name"
              type="text"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.donate.donorNamePlaceholder}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="donor-amount" className="text-sm font-medium text-foreground">
              {t.donate.amountLabel}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                    amount === String(preset)
                      ? "border-blue bg-blue text-white"
                      : "border-border bg-background text-foreground hover:border-blue"
                  }`}
                >
                  ₹{preset}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center rounded-md border border-input bg-transparent px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
              <span className="text-sm font-semibold text-muted-foreground">₹</span>
              <input
                id="donor-amount"
                type="number"
                min={1}
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t.donate.amountPlaceholder}
                className="h-10 w-full bg-transparent px-2 py-2 text-sm focus-visible:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canShow}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3 text-base font-bold text-red-foreground shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <QrCode className="size-5" /> {t.donate.showQr}
          </button>
        </form>
      ) : (
        <div className="mt-5 flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground">
            {t.donate.scanFor}{" "}
            <span className="font-bold text-foreground">{name.trim()}</span>
          </p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-blue">₹{numericAmount}</p>

          <div className="mt-4 grid place-items-center rounded-xl border border-border bg-white p-3">
            <UpiQr size={200} amount={numericAmount} />
          </div>

          <div className="mt-4 w-full rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">{t.donate.upiId}</p>
            <p className="font-heading text-base font-bold text-foreground break-all">{donate.upiId}</p>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-green" /> {t.donate.scanHint}
          </p>

          <button
            type="button"
            onClick={() => setShowQr(false)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline"
          >
            <ArrowLeft className="size-4" /> {t.donate.editDetails}
          </button>
        </div>
      )}
    </div>
  );
}
