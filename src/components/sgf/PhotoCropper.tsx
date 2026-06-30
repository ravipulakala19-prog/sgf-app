import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Loader2 } from "lucide-react";

type Area = { x: number; y: number; width: number; height: number };

type Props = {
  /** Object URL of the image to crop */
  src: string;
  /** Called with the cropped square image as a JPEG File */
  onCropped: (file: File) => void;
  onCancel: () => void;
  labels?: { title?: string; cancel?: string; save?: string; zoom?: string };
};

async function getCroppedFile(src: string, area: Area): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const size = Math.max(1, Math.round(Math.min(area.width, area.height)));
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, size, size);

  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Crop failed"))),
      "image/jpeg",
      0.9,
    ),
  );
  return new File([blob], "profile.jpg", { type: "image/jpeg" });
}

/** A modal that lets the user crop an image into a square (1:1) before upload. */
export function PhotoCropper({ src, onCropped, onCancel, labels }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);

  const onComplete = useCallback((_: Area, pixels: Area) => {
    setAreaPixels(pixels);
  }, []);

  async function handleSave() {
    if (!areaPixels) return;
    setSaving(true);
    try {
      const file = await getCroppedFile(src, areaPixels);
      onCropped(file);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="border-b border-border px-5 py-3">
          <h3 className="font-heading text-lg font-bold text-foreground">{labels?.title ?? "Crop your photo"}</h3>
        </div>
        <div className="relative h-72 w-full bg-muted">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            showGrid
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onComplete}
          />
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <span className="text-xs font-medium text-muted-foreground">{labels?.zoom ?? "Zoom"}</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-1 flex-1 accent-saffron"
            aria-label={labels?.zoom ?? "Zoom"}
          />
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            {labels?.cancel ?? "Cancel"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !areaPixels}
            className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2 text-sm font-bold text-saffron-foreground disabled:opacity-70"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : null}
            {labels?.save ?? "Apply crop"}
          </button>
        </div>
      </div>
    </div>
  );
}
