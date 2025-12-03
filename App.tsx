import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BookingPage } from './pages/Booking';
import { RoomsPage } from './pages/Rooms';
import { ServicesPage } from './pages/Services';
import { GalleryPage } from './pages/Gallery';
import { ContactPage } from './pages/Contact';
import { AdminPage } from './pages/Admin';
import { DiningPage } from './pages/Dining';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Admin Routes - Isolated from public layout */}
        <Route path="/admin/*" element={<AdminPage />} />
        
        {/* Public Routes - Wrapped in Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/dining" element={<DiningPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;