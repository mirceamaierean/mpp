"use client";
import { CldImage } from "next-cloudinary";

export default function CloudinaryImage({
  imageSource,
  width,
  height,
  alt,
  className = "",
}: {
  imageSource: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) {
  return (
    <CldImage
      src={imageSource}
      width={width}
      height={height}
      crop={{
        type: "auto",
        source: true,
      }}
      quality="auto"
      alt={alt}
      className={className}
    />
  );
}
