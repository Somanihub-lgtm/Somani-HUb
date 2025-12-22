import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About, Services, Courses, Contact, Blog, Privacy, Terms } from './pages/AllPages';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Layout>
      </Router>
    </ContentProvider>
  );
};

export default App;