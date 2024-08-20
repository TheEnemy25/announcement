import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

//Pages
import AnnouncementFormPage from './pages/announcement-create-form-page/AnnouncementFormPage';
import AnnouncementDetailPage from './pages/announcement-page/AnnouncementDetailPage';
import AnnouncementsPage from './pages/announcements-page/AnnouncementsPage';
import AnnouncementUpdatePage from './pages/announcement-update-form-page/AnnouncementUpdatePage';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes >
          <Route path="/" element={<AnnouncementsPage />} />
          <Route path="/announcement-form" element={<AnnouncementFormPage />} />
          <Route path="/announcement/:id" element={<AnnouncementDetailPage />} />
          <Route path="/announcement/update/:id" element={<AnnouncementUpdatePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
