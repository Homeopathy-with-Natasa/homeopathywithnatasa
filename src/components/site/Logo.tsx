import { cn } from "@/lib/utils";

/**
 * LOGO PLACEHOLDER SLOT.
 *
 * TODO: replace the inline mark below with the supplied dandelion files:
 *   - navbar:  src/assets/logo-green.svg   (approx 40px high)
 *   - footer:  src/assets/logo-white.svg   (white, on green-800)
 *   - favicon: public/favicon.ico          (square version)
 *
 * Until then this draws a simple dandelion-style placeholder in currentColor,
 * so nothing looks broken.
 */
export function LogoMark({ className }: { className?: string }) {
  const seeds = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    return { x: 20 + Math.cos(angle) * 9, y: 22 + Math.sin(angle) * 9 };
  });

  return (
    <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M20 22 C22 32 22 38 20 44" />
        {seeds.map((s, i) => (
          <line key={i} x1="20" y1="22" x2={s.x} y2={s.y} />
        ))}
        {seeds.map((s, i) => (
          <circle key={`d-${i}`} cx={s.x} cy={s.y} r="1.5" fill="currentColor" stroke="none" />
        ))}
        <circle cx="34" cy="11" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="40" cy="7" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="37" cy="17" r="1" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
  text,
}: {
  className?: string;
  markClassName?: string;
  text: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="font-display text-[1.05rem] leading-tight tracking-tight">{text}</span>
    </span>
  );
}
