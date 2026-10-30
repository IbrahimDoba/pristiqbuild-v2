import HeroBackdrop from "@/components/HeroBackdrop";

/**
 * Height shared by every inner-page hero, so the site reads as one system.
 * ProjectHero uses it too. The homepage hero is full-screen on purpose and
 * does not.
 */
export const HERO_HEIGHT = "min-h-[34rem] md:min-h-[40rem]";

interface PageHeroProps {
  /** Background photo. Falls back to the plain deep-steel panel. */
  image?: string | null;
  /** CSS object-position for the photo. */
  imagePosition?: string;
  /** Centre the copy, and even out the overlay to suit. */
  centered?: boolean;
  /** Small caption in the corner, e.g. to flag a render as a render. */
  imageNote?: string;
  as?: "section" | "header";
  children: React.ReactNode;
}

export default function PageHero({
  image,
  imagePosition,
  centered = false,
  imageNote,
  as: Tag = "section",
  children,
}: PageHeroProps) {
  return (
    <Tag
      className={`relative overflow-hidden bg-deep-steel text-white flex items-center ${HERO_HEIGHT}`}
    >
      {image && <HeroBackdrop src={image} position={imagePosition} centered={centered} />}
      <div className={`relative w-full container-custom py-16 md:py-20 ${centered ? "text-center" : ""}`}>
        {children}
      </div>
      {image && imageNote && (
        <p className="absolute bottom-3 right-4 text-xs text-white/60">{imageNote}</p>
      )}
    </Tag>
  );
}
