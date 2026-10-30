import Image from "next/image";

interface HeroBackdropProps {
  src: string;
  /** Position of the subject within the frame, as a CSS object-position. */
  position?: string;
  /** Even overlay for centred copy, instead of the left-weighted gradient. */
  centered?: boolean;
}

/**
 * Photo layer for the inner-page heroes. The image sits at reduced opacity
 * over the section's own background colour, and a gradient darkens the left
 * side so the headline keeps its contrast whatever the photo does.
 *
 * The parent section needs `relative overflow-hidden`, and its content
 * wrapper needs `relative` so it paints above this layer.
 */
export default function HeroBackdrop({
  src,
  position = "center",
  centered = false,
}: HeroBackdropProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
        style={{ objectPosition: position }}
      />
      <div
        className={
          centered
            ? "absolute inset-0 bg-deep-steel/70"
            : "absolute inset-0 bg-linear-to-r from-deep-steel/90 via-deep-steel/70 to-deep-steel/35"
        }
      />
    </div>
  );
}
