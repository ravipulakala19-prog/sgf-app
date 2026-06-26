## Goal
Replace the static QR placeholders with a real, scannable **UPI QR code generated automatically from the UPI ID** in `src/lib/site-config.ts`. Change the UPI ID (or name/amount) and the QR updates everywhere — no image to upload.

## How it works
A UPI QR encodes a standard UPI payment string:
```text
upi://pay?pa=<upiId>&pn=<payeeName>&cu=INR
```
We feed that string into a QR generator and render an SVG. Scanning it in any UPI app (GPay, PhonePe, Paytm) opens a pre-filled payment to SGF.

## Changes

1. **Add a QR library** — `bun add qrcode.react` (lightweight, SSR-safe, renders an inline SVG so it stays crisp at any size).

2. **New component `src/components/sgf/UpiQr.tsx`**
   - Reads `siteConfig.donate.upiId` and `siteConfig.donate.bank.accountName` (payee name).
   - Builds the `upi://pay?...` string and renders `<QRCodeSVG>` at a configurable size.
   - Accepts props: `size`, `className` and an optional `amount` for future use.
   - Includes proper `role="img"` + `aria-label` (e.g. "Scan to pay Special Guys Foundation via UPI") for accessibility.

3. **`src/lib/site-config.ts`**
   - Add an editable `payeeName` under `donate` (defaults to the foundation name) so the QR label is controllable without touching component code. UPI ID stays the single source of truth.

4. **`src/routes/donate.tsx`**
   - Replace the dashed placeholder box (the `QrCode` icon + `qrPlaceholder` text) with `<UpiQr size={160} />`.
   - Keep the UPI ID text shown beside it.

5. **`src/components/sgf/Footer.tsx`**
   - Replace the "Scan to give" placeholder tile with a small `<UpiQr size={120} />` on a white background.

6. **Cleanup**
   - Remove now-unused `QrCode` icon imports / `qrPlaceholder` usages where they no longer apply (translations keys can stay; they just won't be referenced).

## Technical notes
- `qrcode.react`'s `QRCodeSVG` renders pure SVG with no browser-only APIs, so it works under TanStack Start SSR without guards.
- QR is derived at render time from config — fully dynamic, no build step or image asset.
- For valid scanning, the UPI ID in config must be a real, active VPA (the current `specialguysfoundation@upi` is a placeholder and should be updated to the foundation's actual UPI ID).

## Result
The footer and donate page show a live, scannable UPI QR that always matches the configured UPI ID — editing one value in `site-config.ts` updates every QR on the site.