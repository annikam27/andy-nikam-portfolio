import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductManagement from "./pages/ProductManagement";
import Portfolio from "./pages/Portfolio";
import BuildWithAndy from "./pages/BuildWithAndy";
import Cycling from "./pages/Cycling";
import Soccer from "./pages/Soccer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/build-with-andy" element={<BuildWithAndy />} />
          <Route path="/cycling" element={<Cycling />} />
          <Route path="/soccer" element={<Soccer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
