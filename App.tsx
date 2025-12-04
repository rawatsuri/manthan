import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BookingPage } from './pages/Booking';
import { RoomsPage } from './pages/Rooms';
import { ServicesPage } from './pages/Services';
import { GalleryPage } from './pages/Gallery';
import { ContactPage } from './pages/Contact';
import { AdminPage } from './pages/Admin';
import { DiningPage } from './pages/Dining';
import { AboutPage } from './pages/About';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes with shared Layout */}
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

        {/* Admin routes - separate layout handled inside AdminPage */}
        <Route path="admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
