import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { ProjectFilter } from "./ProjectFilter";
import { PROJECTS, CATEGORIES } from "../../data/projects";
import type { Project, ProjectCategory } from "../../data/projects";
import { easing, duration } from "../../lib/tokens";

type Filter = "All" | ProjectCategory;

const SECTION_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      c[cat] = PROJECTS.filter((p) => p.category === cat).length;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative w-full py-[var(--section-padding)]"
    >
      <div className="mx-auto max-w-wide px-[var(--gutter)]">

        {/* ── Section header ── */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: duration.slow, ease: easing.eclipse }}
          >
            <p className="eyebrow mb-3">Selected Work</p>
            <h2
              id="projects-heading"
              className="font-display text-4xl font-semibold leading-tight tracking-tighter text-eclipse-white sm:text-5xl"
            >
              Projects &{" "}
              <em className="text-gradient-gold not-italic">Case Studies</em>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-sm text-[14px] leading-relaxed text-eclipse-muted sm:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: duration.slow, ease: easing.eclipse, delay: 0.15 }}
          >
            A curated selection spanning web engineering, AI tooling, and creative direction.
          </motion.p>
        </div>

        {/* ── Filter ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.base, ease: easing.eclipse, delay: 0.2 }}
        >
          <ProjectFilter
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          key={activeFilter}
          variants={SECTION_VARIANTS}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: duration.fast, ease: easing.eclipseIn },
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenCaseStudy={setActiveProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-3 py-24 text-eclipse-faint"
          >
            <span className="font-mono text-5xl">∅</span>
            <p className="text-[14px]">No projects in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* ── Case study modal ── */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

export default Projects;
