// Trigger Netlify Redeploy
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAppContext } from './hooks/useAuth';
import useServerWarmup from './hooks/useServerWarmup';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/common/BackToTop';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import DashboardPage from './pages/DashboardPage';
import CreatePostPage from './pages/CreatePost';
import UserProfilePage from './pages/UserProfilePage';
import PostDetailsPage from './pages/PostDetails';

import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import HelpCenterPage from './pages/HelpCenterPage';
import CommunityPage from './pages/CommunityPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ExploreBlogsPage from './pages/ExploreBlogsPage';
import CategoriesPage from './pages/CategoriesPage';
import SearchPage from './pages/SearchPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const AppContent = () => {
    const { theme } = useAppContext();
    const location = useLocation();

    // Warm up server on initial load (production only)
    useServerWarmup();

    const isSpecialLayout = location.pathname === '/auth' || location.pathname === '/';

    // Smooth scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = theme === 'dark'
                ? '/darkmode logo hashnode.png'
                : '/lightmode logo hashnode.png';
        }
    }, [theme]);

    return (
        <div className={theme}>
            <div className="min-h-screen font-sans transition-colors duration-500 bg-background text-text-primary scroll-snap-container">
                <Navbar />
                <BackToTop />
                <main className="page-transition">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
                        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

                        {/* Private Routes */}
                        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                        <Route path="/profile/:userId" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
                        <Route path="/create-post" element={<PrivateRoute><CreatePostPage /></PrivateRoute>} />

                        {/* Public Routes */}
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/explore-blogs" element={<ExploreBlogsPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/help-center" element={<HelpCenterPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsAndConditionsPage />} />
                        <Route path="/disclaimer" element={<DisclaimerPage />} />
                        <Route path="/post/:id" element={<PostDetailsPage />} />
                        {/* Fallback Route */}
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </main>
                {!isSpecialLayout && <Footer />}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        >
            <AppContent />
        </Router>
    );
}

export default App;