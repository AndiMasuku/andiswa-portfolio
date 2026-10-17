import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import { prefetchCoreRoutesOnIdle } from "./lib/prefetch";

const Research = lazy(() => import("./pages/Research"));
const Projects = lazy(() => import("./pages/Projects"));
const ThesisDetail = lazy(() => import("./pages/ThesisDetail"));
const MscDetail = lazy(() => import("./pages/MscDetail"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ResearchMap = lazy(() => import("./pages/ResearchMap"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  useEffect(() => {
    prefetchCoreRoutesOnIdle();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/research" element={<Research />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/msc" element={<MscDetail />} />
        <Route path="/research/msc" element={<MscDetail />} />
        <Route path="/msc" element={<MscDetail />} />
        <Route path="/projects/mountain-spiders" element={<MscDetail />} />
        <Route path="/projects/thesis" element={<ThesisDetail />} />
        <Route path="/research/thesis" element={<ThesisDetail />} />
        <Route path="/projects/projects-map" element={<ResearchMap />} />
        <Route path="/projects/research-map" element={<ResearchMap />} />
        <Route path="/projects/laduma-map" element={<ResearchMap />} />
        <Route path="/projects/articles/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
