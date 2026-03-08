// Trigger Netlify Redeploy
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAppContext } from './hooks/useAuth';
import useServerWarmup from './hooks/useServerWarmup';
import useScrollReveal from './hooks/useScrollReveal';

// Eager load critical components (visible on initial load)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/common/BackToTop';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import Spinner from './components/common/Spinner';

// Lazy load route components (loaded on demand)
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CreatePostPage = lazy(() => import('./pages/CreatePost'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const PostDetailsPage = lazy(() => import('./pages/PostDetails'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const ExploreBlogsPage = lazy(() => import('./pages/ExploreBlogsPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const GoogleAuthSuccess = lazy(() => import('./pages/GoogleAuthSuccess'));

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const AppContent = () => {
    const { theme } = useAppContext();
    const location = useLocation();

    // Warm up server on initial load (production only)
    useServerWarmup();
    
    // Initialize global scroll reveal animations
    useScrollReveal();

    const isSpecialLayout = location.pathname === '/auth' || location.pathname === '/';

    // Scroll to top on route change, defeating CSS smooth-scroll to prevent interrupted scroll animations
    useEffect(() => {
        // Temporarily disable global CSS smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Force instant jump to top
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        
        // Re-enable smooth scrolling after the browser paints the instant jump
        const timeoutId = setTimeout(() => {
            document.documentElement.style.scrollBehavior = ''; // Reverts to CSS stylesheet value
        }, 100);

        return () => clearTimeout(timeoutId);
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
                    <Suspense fallback={
                        <div className="flex justify-center items-center min-h-screen">
                            <Spinner />
                        </div>
                    }>
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
                    </Suspense>
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