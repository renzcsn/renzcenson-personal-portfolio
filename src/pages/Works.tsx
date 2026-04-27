import { useCallback, useEffect, useRef, useState } from "react";

import { projects as projectsData } from "../datas/projects";
import logoFallback from "../assets/images/Logo.svg";

type ProjectWithThumb = {
  thumbnailUrl?: string;
  title: string;
  id: string;
};

function resolveThumbnailSrc(project: ProjectWithThumb) {
  const candidate = project.thumbnailUrl?.trim();
  return candidate ? candidate : logoFallback;
}

function applyImgFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === "true") return;
  img.dataset.fallbackApplied = "true";
  img.src = logoFallback;
}

function Works() {
  const projects = projectsData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [edgeSpacerWidth, setEdgeSpacerWidth] = useState(0);

  const stripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollRafRef = useRef<number | null>(null);
  const lastWheelAtRef = useRef(0);

  // Get the selected project safely
  const selected = projects[selectedIndex] ?? projects[0];

  const centerIndex = useCallback((index: number, behavior: ScrollBehavior) => {
    const stripEl = stripRef.current;
    const thumbEl = thumbRefs.current[index];
    if (!stripEl || !thumbEl) return;

    const stripRect = stripEl.getBoundingClientRect();
    const thumbRect = thumbEl.getBoundingClientRect();
    const stripCenterX = stripRect.left + stripRect.width / 2;
    const thumbCenterX = thumbRect.left + thumbRect.width / 2;
    const delta = thumbCenterX - stripCenterX;

    stripEl.scrollTo({ left: stripEl.scrollLeft + delta, behavior });
  }, []);

  const updateSelectedFromScroll = useCallback(() => {
    const stripEl = stripRef.current;
    if (!stripEl) return;

    const stripRect = stripEl.getBoundingClientRect();
    const stripCenterX = stripRect.left + stripRect.width / 2;

    let bestIndex = selectedIndex;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let idx = 0; idx < projects.length; idx += 1) {
      const el = thumbRefs.current[idx];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - stripCenterX);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestIndex = idx;
      }
    }

    if (bestIndex !== selectedIndex) setSelectedIndex(bestIndex);
  }, [projects.length, selectedIndex]);

  useEffect(() => {
    const stripEl = stripRef.current;
    if (!stripEl) return;

    const recomputeSpacers = () => {
      const firstThumb = thumbRefs.current[0];
      if (!firstThumb) return;

      const spacer = Math.max(0, stripEl.clientWidth / 2 - firstThumb.clientWidth / 2);
      setEdgeSpacerWidth(spacer);
    };

    recomputeSpacers();

    const ro = new ResizeObserver(() => recomputeSpacers());
    ro.observe(stripEl);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    // Ensure the very first selected thumbnail starts centered.
    // Use rAF so layout/spacer widths are applied before centering.
    const id = window.requestAnimationFrame(() => centerIndex(0, "auto"));
    return () => window.cancelAnimationFrame(id);
  }, [centerIndex, edgeSpacerWidth]);

  const onStripScroll = useCallback(() => {
    if (scrollRafRef.current != null) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      updateSelectedFromScroll();
    });
  }, [updateSelectedFromScroll]);

  const stepSelection = useCallback(
    (direction: 1 | -1) => {
      if (projects.length === 0) return;
      const nextIndex = Math.min(
        projects.length - 1,
        Math.max(0, selectedIndex + direction)
      );
      if (nextIndex === selectedIndex) return;

      setSelectedIndex(nextIndex);
      centerIndex(nextIndex, "smooth");
    },
    [centerIndex, projects.length, selectedIndex]
  );

  const onStripWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      // Treat wheel/trackpad as a discrete carousel step.
      // Prevent default so we don't get "free" pixel scrolling + our snap scroll fighting.
      event.preventDefault();
      event.stopPropagation();

      const now = Date.now();
      // Cooldown to avoid skipping multiple items per fast wheel tick.
      if (now - lastWheelAtRef.current < 160) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const dominantDelta = absX > absY ? event.deltaX : event.deltaY;
      if (dominantDelta === 0) return;

      lastWheelAtRef.current = now;
      stepSelection(dominantDelta > 0 ? 1 : -1);
    },
    [stepSelection]
  );

  const onPageWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      // Allow scrolling anywhere on the page to move next/prev.
      event.preventDefault();

      const now = Date.now();
      if (now - lastWheelAtRef.current < 160) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const dominantDelta = absX > absY ? event.deltaX : event.deltaY;
      if (dominantDelta === 0) return;

      lastWheelAtRef.current = now;
      stepSelection(dominantDelta > 0 ? 1 : -1);
    },
    [stepSelection]
  );

  return (
    <div
      onWheel={onPageWheel}
      className="w-full h-[84dvh] px-6 md:px-16 lg:px-24 overflow-hidden overscroll-none"
    >
      <div className="h-full w-full flex flex-col justify-start pt-10 px-4">
        {/* Header */}
        <div className="flex items-start gap-8 md:gap-12">
          <div className="flex flex-col items-center shrink-0">
            <span className="font-wildcat text-center text-white text-[28px] md:text-[32px] border-b-2 border-[#283963] h-[40px] px-1">
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm font-bold pb-2 text-[#283963]">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <h1 className="text-white font-wildcat leading-none text-[56px] md:text-[72px] lg:text-[92px]">
            {selected.title}
          </h1>
        </div>

        {/* Main content */}
        <div className="mt-2 flex-1 grid grid-cols-1 lg:grid-cols-[1.20fr_0.80fr] gap-8 lg:gap-10 min-h-0">
          {/* Preview panel */}
          <div className="min-h-0 rounded-2xl border border-[#283963] bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="h-full w-full flex items-center justify-center bg-[#1A2538]">
              <img
                key={selected.id}
                src={resolveThumbnailSrc(selected)}
                alt={selected.title}
                onError={applyImgFallback}
                className="h-full w-full object-cover p-2 rounded-2xl"
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col min-h-0">
            <p className="text-[#8CA3C6] text-sm md:text-base leading-relaxed">
              {selected.description}
            </p>

            <div className="mt-6 text-[#8CA3C6] text-sm md:text-base">
              {selected.tags}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button
                type="button"
                className="h-12 w-full rounded-lg border border-[#8CA3C6] bg-transparent text-white/90"
              >
                View More Details
              </button>
              {Array.isArray(selected.links) && selected.links.length > 0 && selected.links.map((link: {label: string; url: string; status: string}, i: number) => (
                <button
                  key={link.label + i}
                  type="button"
                  className={
                    "h-12 w-full rounded-lg mt-1 text-white " +
                    (link.status === "active"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 opacity-50 cursor-not-allowed")
                  }
                  disabled={link.status !== "active"}
                  onClick={() => {
                    if (link.status === "active" && link.url && link.url !== "#") {
                      window.open(link.url, "_blank");
                    }
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div
          ref={stripRef}
          onScroll={onStripScroll}
          onWheel={onStripWheel}
          className="mt-8 flex items-center gap-4 pb-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide mask-fade-x"
        >
          <div className="shrink-0" style={{ width: edgeSpacerWidth }} aria-hidden="true" />

          {projects.map((project, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={project.id}
                ref={(el) => {
                  thumbRefs.current[idx] = el;
                }}
                type="button"
                aria-label={`Select ${project.title}`}
                onClick={() => {
                  setSelectedIndex(idx);
                  centerIndex(idx, "smooth");
                }}
                className={
                  "snap-center shrink-0 h-16 w-28 md:h-20 md:w-36 rounded-2xl border bg-white/5 backdrop-blur-md transition-colors " +
                  (isSelected
                    ? "border-[#94BDEB]"
                    : "border-[#283963] hover:border-[#8CA3C6]")
                }
              >
                <img
                  src={resolveThumbnailSrc(project)}
                  alt={project.title}
                  onError={applyImgFallback}
                  className="h-full w-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </button>
            );
          })}

          <div className="shrink-0" style={{ width: edgeSpacerWidth }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default Works;