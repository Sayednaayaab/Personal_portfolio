import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { LoadingFallback } from "@/components/ui/LoadingFallback";
import { PageTransition } from "@/components/ui/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";

// Code-split route components for better performance
const Index = lazy(() => import("./pages/Index"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { Preloader } from "@/components/ui/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { useState, useEffect, useCallback } from "react";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          }
        />
        <Route
          path="/project/:slug"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Routes mount when the preloader starts revealing, so page intro animations play in view
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealStart = useCallback(() => setIsRevealed(true), []);
  const handleComplete = useCallback(() => {
    setIsRevealed(true);
    setIsLoading(false);
  }, []);

  // Fetch the home page chunk during the splash so it's ready at reveal time
  useEffect(() => {
    import('./pages/Index');
  }, []);

  // Safety net in case the preloader never reports completion
  useEffect(() => {
    const timer = setTimeout(handleComplete, 6000);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <SmoothScroll />
            <Toaster />
            <Sonner />
            <AnimatePresence>
              {isLoading && <Preloader key="app-preloader" onRevealStart={handleRevealStart} onComplete={handleComplete} />}
            </AnimatePresence>
            <BrowserRouter>
              <SkipToContent />
              <Layout>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
                    // transitionEnd clears transform/filter so fixed-position children (e.g. lightbox) work normally
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none', transform: 'none' } }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: '50% 30vh' }}
                  >
                    <Suspense fallback={<LoadingFallback />}>
                      <AnimatedRoutes />
                    </Suspense>
                  </motion.div>
                )}
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
