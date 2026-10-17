/**
 * Route Prefetcher
 * Anticipates user navigation on hover, touch, focus, or idle to eliminate
 * chunk-loading delays and make transitions feel instantaneous.
 */

const prefetched = new Set<string>();

export const prefetchRoute = (to: string) => {
  if (typeof window === "undefined" || !to) return;
  const path = to.split("?")[0].split("#")[0];
  if (!path || prefetched.has(path)) return;
  prefetched.add(path);

  try {
    if (path === "/research") {
      import("@/pages/Research");
    } else if (path === "/projects") {
      import("@/pages/Projects");
    } else if (
      path === "/projects/msc" ||
      path === "/research/msc" ||
      path === "/msc" ||
      path === "/projects/mountain-spiders"
    ) {
      import("@/pages/MscDetail");
    } else if (path === "/projects/thesis" || path === "/research/thesis") {
      import("@/pages/ThesisDetail");
    } else if (
      path === "/projects/projects-map" ||
      path === "/projects/research-map" ||
      path === "/projects/laduma-map"
    ) {
      import("@/pages/ResearchMap");
    } else if (path.startsWith("/projects/articles/")) {
      import("@/pages/ArticlePage");
    }
  } catch {
    // Silently continue if offline
  }
};

/**
 * Preload primary destination routes during idle browser time
 * while respecting Data Saver and slow mobile connections.
 */
export const prefetchCoreRoutesOnIdle = () => {
  if (typeof window === "undefined") return;

  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;

  if (conn?.saveData || conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") {
    return;
  }

  const run = () => {
    prefetchRoute("/research");
    prefetchRoute("/projects");
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 1500);
  }
};
