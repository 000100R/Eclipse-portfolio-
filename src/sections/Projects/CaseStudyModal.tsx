import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink, ArrowRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { easing, duration, zIndex } from "../../lib/tokens";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: easing.eclipse } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: easing.eclipseIn } },
};

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.eclipse },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    transition: { duration: duration.fast, ease: easing.eclipseIn },
  },
};

const SECTION_LABELS = ["Overview", "Challenge", "Solution", "Outcome"] as const;
type SectionKey = "overview" | "challenge" | "solution" | "outcome";

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  useLockBodyScroll(isOpen);

  // Escape closes, focus trap
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-eclipse-black/80 backdrop-blur-md"
            style={{ zIndex: zIndex.modal - 1 }}
            variants={OVERLAY_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-4 bottom-4 top-4 mx-auto max-w-3xl flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] shadow-[0_32px_100px_rgba(0,0,0,0.8)] sm:inset-x-6 sm:bottom-6 sm:top-6"
            style={{
              zIndex: zIndex.modal,
              background: "rgba(8,9,11,0.92)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            {/* Accent bar */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)`,
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/[0.06] px-6 py-5 sm:px-8">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="rounded-pill px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                    style={{
                      color: project.color,
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] text-eclipse-faint">{project.year}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-eclipse-white sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-0.5 font-mono text-[12px] uppercase tracking-wider text-eclipse-faint">
                  {project.subtitle}
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="ml-4 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-eclipse-muted transition-colors duration-fast hover:border-white/20 hover:text-eclipse-white focus-ring"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
              {/* Tech badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[12px] text-eclipse-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Case study sections */}
              <div className="space-y-7">
                {(SECTION_LABELS).map((label, i) => {
                  const key = label.toLowerCase() as SectionKey;
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: duration.base,
                        ease: easing.eclipse,
                        delay: 0.1 + i * 0.06,
                      }}
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                          style={{ color: project.color }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[13px] font-semibold uppercase tracking-widest text-eclipse-muted">
                          {label}
                        </h3>
                        <div
                          className="h-px flex-1"
                          style={{ background: `${project.color}20` }}
                        />
                      </div>
                      <p className="text-[14.5px] leading-relaxed text-eclipse-muted">
                        {project.caseStudy[key]}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer actions */}
              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-eclipse-white transition-colors duration-fast hover:bg-white/[0.07] focus-ring"
                  >
                    <Github size={15} aria-hidden />
                    View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium text-eclipse-white transition-all duration-fast focus-ring"
                    style={{
                      background: `${project.color}18`,
                      border: `1px solid ${project.color}35`,
                      color: project.color,
                    }}
                  >
                    <ExternalLink size={15} aria-hidden />
                    Live Demo
                    <ArrowRight size={13} aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
