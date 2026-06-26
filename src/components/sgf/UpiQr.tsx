import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "@/lib/site-config";

type UpiQrProps = {
  /** Pixel size of the rendered QR (width = height). */
  size?: number;
  /** Optional pre-filled amount (in INR). */
  amount?: number;
  className?: string;
};

/**
 * Renders a scannable UPI QR code generated from the UPI ID in site-config.
 * Edit `siteConfig.donate.upiId` / `payeeName` to update every QR on the site.
 */
export function UpiQr({ size = 160, amount, className }: UpiQrProps) {
  const { upiId, payeeName } = siteConfig.donate;
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
    cu: "INR",
  });
  if (amount && amount > 0) params.set("am", String(amount));
  const upiUri = `upi://pay?${params.toString()}`;

  return (
    <div
      className={className}
      role="img"
      aria-label={`Scan to pay ${payeeName} via UPI`}
    >
      <QRCodeSVG
        value={upiUri}
        size={size}
        level="M"
        bgColor="#ffffff"
        fgColor="#000000"
        marginSize={2}
        style={{ width: "100%", height: "auto", maxWidth: size }}
      />
    </div>
  );
}
