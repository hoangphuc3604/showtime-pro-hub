import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Showtimes from "./pages/Showtimes";
import MovieDetail from "./pages/MovieDetail";
import Booking from "./pages/Booking";
import Promotions from "./pages/Promotions";
import PromotionDetail from "./pages/PromotionDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyTickets from "./pages/MyTickets";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AccountManagement from "./pages/AccountManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/account" element={<AccountManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
