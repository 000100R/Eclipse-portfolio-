import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { easing, duration } from "../../lib/tokens";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}

/** Spring config for the tilt */
const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };

export function ProjectCard({ project, index, onOpenCaseStudy }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Perspective tilt driven by mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), SPRING);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), SPRING);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), SPRING);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: duration.slow,
            ease: easing.eclipse,
            delay: index * 0.07,
          },
        },
      }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: project.gradient }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-eclipse-surface will-change-transform"
      >
        {/* ── Glare specular ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-slow group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
            ),
          }}
        />

        {/* ── Poster image area ── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-eclipse-ink">
          {/* Gradient placeholder — replace with <img> once assets exist */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${project.color}22 0%, transparent 65%),
                           radial-gradient(ellipse at 75% 70%, ${project.color}12 0%, transparent 55%),
                           #08090b`,
            }}
          />

          {/* Cinematic letterbox lines */}
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-eclipse-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-eclipse-black/80 to-transparent" />

          {/* Category badge */}
          <div className="absolute left-4 top-4 z-20">
            <span className="rounded-pill border border-white/[0.12] bg-eclipse-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-eclipse-muted backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Year */}
          <div className="absolute right-4 top-4 z-20">
            <span className="font-mono text-[11px] text-eclipse-faint">{project.year}</span>
          </div>

          {/* Hover overlay with action buttons */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: duration.fast, ease: easing.eclipse }}
          >
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} on GitHub`}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-eclipse-black/80 px-4 py-2.5 text-[13px] font-medium text-eclipse-white backdrop-blur-md transition-colors duration-fast hover:border-white/40 focus-ring"
                >
                  <Github size={14} aria-hidden />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} live demo`}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-eclipse-black/80 px-4 py-2.5 text-[13px] font-medium text-eclipse-white backdrop-blur-md transition-colors duration-fast hover:border-white/40 focus-ring"
                >
                  <ExternalLink size={14} aria-hidden />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Card body ── */}
        <div className="relative z-10 flex flex-1 flex-col gap-3 p-5">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold leading-snug text-eclipse-white">
                {project.title}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-eclipse-faint">
                {project.subtitle}
              </p>
            </div>
            {project.featured && (
              <span
                className="mt-0.5 shrink-0 rounded-pill px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  color: project.color,
                  background: `${project.color}18`,
                  border: `1px solid ${project.color}30`,
                }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-[13.5px] leading-relaxed text-eclipse-muted line-clamp-2">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-eclipse-faint"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Case study CTA */}
          <div className="mt-auto pt-2">
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="group/btn flex w-full items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-eclipse-muted transition-all duration-base hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-eclipse-white focus-ring"
            >
              Read Case Study
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-fast group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
