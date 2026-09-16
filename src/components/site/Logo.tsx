import { cn } from "@/lib/utils";
import logoGreen from "@/assets/logo-green.png.asset.json";
import logoWhite from "@/assets/logo-white.png.asset.json";

/**
 * Dandelion logo, drawn for Natasa in 2019.
 *   - navbar: green version, approx 80px high on desktop
 *   - footer: white version, on green-800
 */
export function LogoMark({
  className,
  variant = "green",
}: {
  className?: string | undefined;
  variant?: "green" | "white";
}) {
  return (
    <img
      src={variant === "white" ? logoWhite.url : logoGreen.url}
      alt=""
      aria-hidden="true"
      className={cn("h-16 w-auto md:h-20", className)}
    />
  );
}

export function Wordmark({
  className,
  markClassName,
  text,
  variant = "green",
}: {
  className?: string;
  markClassName?: string;
  text: string;
  variant?: "green" | "white";
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={markClassName} variant={variant} />
      <span className="font-display text-[1.15rem] leading-tight tracking-tight md:text-[1.35rem]">
        {text}
      </span>
    </span>
  );
}
