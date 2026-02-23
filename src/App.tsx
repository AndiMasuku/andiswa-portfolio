import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PersonSchema from "./components/PersonSchema";
import SiteSchema from "./components/SiteSchema";
import Index from "./pages/Index";

const Projects = lazy(() => import("./pages/Projects"));
const ThesisDetail = lazy(() => import("./pages/ThesisDetail"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ResearchMap = lazy(() => import("./pages/ResearchMap"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <BrowserRouter>
    <SiteSchema />
    <PersonSchema />
    <ScrollToTop />
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/thesis" element={<ThesisDetail />} />
        <Route path="/projects/projects-map" element={<ResearchMap />} />
        <Route path="/projects/articles/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
