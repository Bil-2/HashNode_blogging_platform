import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAuth';
import { LogoIcon, SearchIcon, SunIcon, MoonIcon } from '../common/Icons';

const Navbar = () => {
    const { isAuthenticated, logout, theme, toggleTheme, user } = useAppContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const isAtTop = !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
        closeMobileMenu();
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        const query = searchQuery.trim();
        if (query) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery('');
            closeMobileMenu();
        }
    };

    return (
        <>
            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isAtTop ? 'py-6' : 'py-3 bg-background/80 backdrop-blur-xl shadow-lg'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center space-x-3 h-16">
                            {/* Logo */}
                            <Link to="/" className="group text-text-primary font-bold text-xl tracking-wider bg-glass backdrop-blur-xl border border-glass rounded-full px-5 py-2.5 flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-500/50">
                                <LogoIcon />
                                <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap">
                                    HashNode
                                </span>
                            </Link>

                            {/* Search Bar */}
                            <form onSubmit={handleSearchSubmit}>
                                <div className="group flex items-center bg-glass backdrop-blur-xl border border-glass rounded-full transition-all duration-300 hover:bg-white/20 hover:border-indigo-500/50 hover:shadow-md">
                                    <span className="pl-4 text-text-primary transition-colors group-hover:text-indigo-400"> 
                                        <SearchIcon /> 
                                    </span>
                                    <input 
                                        type="text" 
                                        placeholder="Search posts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent text-text-primary placeholder-text-secondary border-none focus:outline-none focus:ring-0 max-w-0 group-hover:max-w-[220px] focus:max-w-[220px] transition-all duration-300 ease-in-out cursor-pointer group-hover:cursor-text pl-2 pr-4 py-3"
                                    />
                                </div>
                            </form>

                            {/* Navigation Links */}
                            <div className="bg-glass backdrop-blur-xl rounded-full px-2 py-2 flex items-center space-x-1 border border-glass shadow-sm">
                                <Link to="/" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105">
                                    Home
                                </Link>
                                <Link to="/explore-blogs" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105">
                                    Explore
                                </Link>
                                <Link to="/categories" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105">
                                    Categories
                                </Link>
                                <Link to="/about" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105">
                                    About
                                </Link>
                                <button 
                                    onClick={toggleTheme} 
                                    className="text-text-secondary hover:bg-white/20 hover:text-text-primary p-2 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-12"
                                >
                                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                                </button>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-3">
                                {isAuthenticated ? (
                                    <>
                                        <Link 
                                            to="/dashboard" 
                                            className="bg-glass backdrop-blur-xl border border-glass text-text-secondary hover:bg-white/20 hover:text-text-primary px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                                        >
                                            Dashboard
                                        </Link>
                                        <button 
                                            onClick={handleLogout} 
                                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            to="/auth" 
                                            state={{ show: 'login' }} 
                                            className="bg-glass backdrop-blur-xl border border-glass text-text-secondary hover:bg-white/20 hover:text-text-primary px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/auth" 
                                            state={{ show: 'register' }} 
                                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            
            {/* Mobile Navbar */}
            <div className="md:hidden">
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isAtTop ? 'py-6' : 'py-3 bg-background/80 backdrop-blur-xl shadow-lg'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link to="/" onClick={closeMobileMenu} className="group text-text-primary font-bold text-xl tracking-wider bg-glass backdrop-blur-xl border border-glass rounded-full px-4 py-2 flex items-center space-x-2 transition-all duration-300 hover:scale-105 z-50">
                                <LogoIcon /><span>HashNode</span>
                            </Link>
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-full text-text-primary bg-glass backdrop-blur-xl border border-glass hover:bg-white/20 hover:scale-105 focus:outline-none z-50 transition-all duration-200"
                                aria-label="Open main menu"
                            >
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                <div 
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                ></div>

                {/* Mobile Menu Sidebar */}
                <div 
                    className={`fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 p-6 flex flex-col space-y-6 overflow-y-auto bg-glass backdrop-blur-xl border-l border-glass transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-text-primary font-bold text-lg">Menu</span>
                        <button 
                            onClick={closeMobileMenu} 
                            className="text-text-secondary hover:bg-white/20 hover:text-text-primary p-2 rounded-full transition-all duration-200 hover:scale-110"
                            aria-label="Close menu"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSearchSubmit}>
                        <div className="group flex items-center bg-white/10 rounded-full border border-glass hover:border-indigo-500/50 transition-all duration-200">
                            <span className="pl-3 text-text-primary"><SearchIcon /></span>
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-text-primary placeholder-text-secondary border-none focus:outline-none focus:ring-0 pl-2 pr-3 py-3"
                            />
                        </div>
                    </form>

                    <nav className="flex flex-col space-y-2">
                        <Link to="/" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-200" onClick={closeMobileMenu}>Home</Link>
                        <Link to="/explore-blogs" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-200" onClick={closeMobileMenu}>Explore</Link>
                        <Link to="/categories" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-200" onClick={closeMobileMenu}>Categories</Link>
                        <Link to="/about" className="text-text-secondary hover:bg-white/20 hover:text-text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-200" onClick={closeMobileMenu}>About</Link>
                    </nav>

                    <div className="flex flex-col space-y-3 pt-4 border-t border-glass">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="bg-glass backdrop-blur-xl border border-glass text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-center" onClick={closeMobileMenu}>Dashboard</Link>
                                <Link to={`/profile/${user._id}`} className="bg-glass backdrop-blur-xl border border-glass text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-center" onClick={closeMobileMenu}>Profile</Link>
                                <button onClick={handleLogout} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth" state={{ show: 'login' }} className="bg-glass backdrop-blur-xl border border-glass text-text-secondary hover:bg-white/20 hover:text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-center" onClick={closeMobileMenu}>Login</Link>
                                <Link to="/auth" state={{ show: 'register' }} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-center" onClick={closeMobileMenu}>Sign Up</Link>
                            </>
                        )}
                    </div>

                    <div className="flex justify-center pt-4 border-t border-glass">
                        <button onClick={toggleTheme} className="text-text-secondary hover:bg-white/20 hover:text-text-primary p-2 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-12">
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
