import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';

//Pages
import AnnouncementFormPage from './pages/announcement-form-page/AnnouncementFormPage';
import AnnouncementPage from './pages/announcement-page/AnnouncementPage';
import AnnouncementsPage from './pages/announcements-page/AnnouncementsPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes >
          <Route path="/" element={<AnnouncementsPage />} />
          <Route path="/announcement-form" element={<AnnouncementFormPage />} />
          <Route path="/announcement/:id" element={<AnnouncementPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
