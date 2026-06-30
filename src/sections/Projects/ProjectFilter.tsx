import { motion } from "framer-motion";
import type { ProjectCategory } from "../../data/projects";
import { CATEGORIES } from "../../data/projects";
import { easing, duration } from "../../lib/tokens";

type Filter = "All" | ProjectCategory;

interface ProjectFilterProps {
  active: Filter;
  onChange: (filter: Filter) => void;
  counts: Record<string, number>;
}

const ALL_FILTERS: Filter[] = ["All", ...CATEGORIES];

export function ProjectFilter({ active, onChange, counts }: ProjectFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-2"
    >
      {ALL_FILTERS.map((filter) => {
        const isActive = active === filter;
        const count = filter === "All"
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : counts[filter] ?? 0;

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className="relative rounded-pill px-4 py-2 text-[13px] font-medium transition-colors duration-base focus-ring"
            style={{
              color: isActive ? "#ffffff" : "#8a8f98",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-pill"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                transition={{ duration: duration.base, ease: easing.eclipse }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {filter}
              <span
                className="rounded-full px-1.5 py-0.5 font-mono text-[10px]"
                style={{
                  background: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#ffffff" : "#6f6a60",
                }}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
