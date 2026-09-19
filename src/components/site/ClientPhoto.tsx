import { useState } from "react";

type ClientPhotoProps = {
  src: string;
  alt: string;
  placeholder: string;
  width: number;
  height: number;
  className?: string;
  placeholderClassName?: string;
};

export function ClientPhoto({
  src,
  alt,
  placeholder,
  width,
  height,
  className,
  placeholderClassName,
}: ClientPhotoProps) {
  const [available, setAvailable] = useState(true);

  if (!available) {
    return (
      <div
        role="img"
        aria-label={placeholder}
        className={placeholderClassName}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
      onError={() => setAvailable(false)}
    />
  );
}