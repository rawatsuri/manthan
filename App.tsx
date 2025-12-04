import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ScrollToTop } from './components/ScrollToTop';

// Public Pages
import { Home } from './pages/Home';
import { AboutPage } from './pages/About';
import { RoomsPage } from './pages/Rooms';
import { DiningPage } from './pages/Dining';
import { ServicesPage } from './pages/Services';
import { GalleryPage } from './pages/Gallery';
import { ContactPage } from './pages/Contact';
import { BookingPage } from './pages/Booking';

// Admin Pages
import {
  AdminDashboard,
  RoomsManager,
  BookingsManager,
  MenuManager,
  ServicesManager,
  PromosManager,
  CustomersManager
} from './pages/Admin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="dining" element={<DiningPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="booking" element={<BookingPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<RoomsManager />} />
          <Route path="bookings" element={<BookingsManager />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="promos" element={<PromosManager />} />
          <Route path="customers" element={<CustomersManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
