import type { RoofShape } from "@/lib/roof-estimate";

/**
 * Line drawings of each roof shape, seen from a raised corner so the planes
 * read. Stroke follows currentColor.
 */
export default function RoofShapeIcon({ shape, className }: { shape: RoofShape; className?: string }) {
  return (
    <svg viewBox="0 0 96 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Walls, shared by every shape. */}
      <path d="M14 44V30h52v14M66 30l16-6v14l-16 6" opacity={0.45} />
      {shape === "gable" && (
        <>
          <path d="M10 31L28 10h44l14 15" />
          <path d="M28 10l12 21M10 31h56l20-6" />
        </>
      )}
      {shape === "hip" && (
        <>
          <path d="M10 31l26-18h28l22 12" />
          <path d="M10 31h56l20-6M36 13l-2 18M64 13l2 18" />
        </>
      )}
      {shape === "complex" && (
        <>
          <path d="M10 31l20-15h14l8 6 8-10h12l14 13" />
          <path d="M10 31h56l20-6M30 16l-2 15M52 22l6 9M72 12l-6 19" />
        </>
      )}
      {shape === "concealed" && (
        <>
          <path d="M12 30V22h56v8M68 22l16-6v8" />
          <path d="M18 22l46-2M64 20l16-6" opacity={0.6} />
        </>
      )}
    </svg>
  );
}
