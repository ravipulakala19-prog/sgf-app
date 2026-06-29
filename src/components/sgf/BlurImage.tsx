import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  blur: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  /** crop to the container (object-cover) vs. fit (object-contain) */
  fit?: "cover" | "contain";
};

/**
 * Image with a tiny base64 blur placeholder, native lazy loading, async
 * decoding and intrinsic width/height to avoid layout shift. The blurred
 * placeholder is shown until the real image finishes loading.
 */
export function BlurImage({ src, blur, width, height, alt, className, fit = "cover" }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-muted/30", className)}>
      {/* Blurred placeholder */}
      <img
        src={blur}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-full scale-105 object-cover blur-lg transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
        )}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full transition-[transform,opacity] duration-500",
          fit === "cover" ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
