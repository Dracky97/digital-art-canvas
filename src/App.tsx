import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Accommodation from "./pages/Accommodation";
import Experiences from "./pages/Experiences";
import Dining from "./pages/Dining";
import Wellness from "./pages/Wellness";
import Offers from "./pages/Offers";
import GettingHere from "./pages/GettingHere";
import Contact from "./pages/Contact";
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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/getting-here" element={<GettingHere />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
