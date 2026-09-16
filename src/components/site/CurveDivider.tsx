import { cn } from "@/lib/utils";

type Variant = "soft" | "deep" | "wave";

const PATHS: Record<Variant, string> = {
  soft: "M0,64 C360,128 1080,0 1440,56 L1440,120 L0,120 Z",
  deep: "M0,32 C420,140 900,-20 1440,88 L1440,120 L0,120 Z",
  wave: "M0,80 C240,20 480,110 720,70 C960,30 1200,100 1440,48 L1440,120 L0,120 Z",
};

/**
 * Soft curved transition between sections. `fill` names the colour of the
 * section that follows, using design tokens only.
 */
export function CurveDivider({
  variant = "soft",
  fill = "muted",
  flip = false,
  className,
}: {
  variant?: Variant;
  fill?: "background" | "muted" | "green-100" | "green-800";
  flip?: boolean;
  className?: string;
}) {
  const fillClass = {
    background: "fill-background",
    muted: "fill-muted",
    "green-100": "fill-green-100",
    "green-800": "fill-green-800",
  }[fill];

  return (
    <div className={cn("-mb-px w-full leading-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("block h-12 w-full md:h-20", flip && "rotate-180", fillClass)}
      >
        <path d={PATHS[variant]} />
      </svg>
    </div>
  );
}
