/**
 * Renders one JSON-LD block.
 *
 * A plain <script> rather than next/script: structured data has to be in the
 * initial HTML for crawlers, and next/script defers by default. Undefined
 * fields are dropped by JSON.stringify, so builders can omit what they cannot
 * substantiate.
 */
export default function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown>;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Escaped so a "</script>" inside any content string cannot close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
