import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { LoadingFallback } from "@/components/ui/LoadingFallback";
import { PageTransition } from "@/components/ui/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";

// Code-split route components for better performance
const Index = lazy(() => import("./pages/Index"));
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
        {/* Old template pages: everything now lives on the home page */}
        {['/portfolio', '/project/:slug', '/about', '/contact'].map((path) => (
          <Route key={path} path={path} element={<Navigate to="/" replace />} />
        ))}
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
    const timer = setTimeout(handleComplete, 5000);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <SmoothScroll />
            {/* Visitor analytics (enable in Vercel → Project → Analytics) */}
            <Analytics />
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
                    // The site settles in behind the opening doors
                    // Transform + opacity only (no filter) so the entrance stays on the GPU
                    initial={{ opacity: 0.55, scale: 0.94 }}
                    // transitionEnd clears the transform so fixed-position children (e.g. lightbox) work normally
                    animate={{ opacity: 1, scale: 1, transitionEnd: { transform: 'none' } }}
                    // Starts as the blast doors open (after the 0.22s charge + 0.18s seam)
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
