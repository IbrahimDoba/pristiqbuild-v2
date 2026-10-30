"use client";

import { useEffect, useState } from "react";
import Projects from "@/components/Projects";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
import ProjectsIndex from "@/components/portfolio/ProjectsIndex";
import { PREVIEW_READY, PREVIEW_UPDATE, withDraft, type PreviewUpdate } from "@/lib/portfolio-preview";

export default function PortfolioPreview() {
  const [state, setState] = useState<PreviewUpdate | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      if (event.data?.type === PREVIEW_UPDATE) setState(event.data as PreviewUpdate);
    };
    // A link click would navigate the frame away from the draft.
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.("a[href]")) event.preventDefault();
    };

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    window.parent.postMessage({ type: PREVIEW_READY }, window.location.origin);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  if (!state) {
    return <p className="container-custom py-40 text-center text-steel-500">Loading preview…</p>;
  }

  const { view, item, others } = state;
  if (view === "page") return <ProjectDetail item={item} />;

  const listed = withDraft(item, others);
  if (view === "list") return <ProjectsIndex items={listed} />;
  return <Projects items={listed.filter((i) => i.featured)} />;
}
