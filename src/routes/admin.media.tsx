import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, CheckCircle2, Loader2, Upload } from "lucide-react";
import { uploadMediaPost } from "@/lib/media.functions";

export const Route = createFileRoute("/admin/media")({
  head: () => ({
    meta: [
      { title: "Post a media update — SGF Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminMedia,
});

type Status = "idle" | "loading" | "success" | "error";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getDimensions(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 1200, h: 900 });
    img.src = dataUrl;
  });
}

function AdminMedia() {
  const upload = useServerFn(uploadMediaPost);
  const fileRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [section, setSection] = useState<"field" | "press">("field");
  const [captionEn, setCaptionEn] = useState("");
  const [captionTe, setCaptionTe] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onPick = async (f: File | null) => {
    if (!f) return;
    setFile(f);
    const dataUrl = await readFileAsDataUrl(f);
    setPreview(dataUrl);
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setCaptionEn("");
    setCaptionTe("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !preview) {
      setStatus("error");
      setMessage("Please choose a photo first.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const { w, h } = await getDimensions(preview);
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const fileExt = (["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg") as
        | "jpg"
        | "jpeg"
        | "png"
        | "webp";
      await upload({
        data: {
          password,
          section,
          captionEn,
          captionTe,
          width: w,
          height: h,
          imageDataUrl: preview,
          fileExt,
        },
      });
      setStatus("success");
      setMessage("Posted! It is now live on the Media page.");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-blue">Post a media update</h1>
      <p className="mt-2 text-muted-foreground">
        Upload a field photo or press clipping. It appears on the website's Media page instantly.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold">Upload password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5"
            placeholder="Enter the shared password"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Section</label>
          <div className="mt-1.5 grid grid-cols-2 gap-3">
            {(["field", "press"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSection(s)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium capitalize transition ${
                  section === s
                    ? "border-blue bg-blue text-blue-foreground"
                    : "border-border bg-background"
                }`}
              >
                {s === "field" ? "From the field" : "Press clipping"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">Photo</label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-1.5 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 transition hover:border-blue"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-2 text-muted-foreground">
                <Camera className="size-8" />
                <span className="text-sm">Tap to choose a photo</span>
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Caption (English)</label>
          <input
            value={captionEn}
            onChange={(e) => setCaptionEn(e.target.value)}
            maxLength={300}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5"
            placeholder="Short description of the photo"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Caption (Telugu) — optional</label>
          <input
            value={captionTe}
            onChange={(e) => setCaptionTe(e.target.value)}
            maxLength={300}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5"
            placeholder="ఫోటో వివరణ"
          />
        </div>

        {message && (
          <p
            className={`flex items-center gap-2 text-sm ${
              status === "success" ? "text-green" : "text-destructive"
            }`}
          >
            {status === "success" && <CheckCircle2 className="size-4" />}
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue px-6 py-3.5 font-bold text-blue-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-5 animate-spin" /> Posting…
            </>
          ) : (
            <>
              <Upload className="size-5" /> Post to website
            </>
          )}
        </button>
      </form>
    </div>
  );
}
