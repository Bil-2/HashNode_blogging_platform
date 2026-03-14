import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAuth';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useParallax } from '../hooks/useScrollAnimation';
import { postService } from '../api/postService';
import PostCard from '../components/post/PostCard';
import { SkeletonCardGrid } from '../components/common/SkeletonCard';
import Spinner from '../components/common/Spinner';
import Footer from '../components/layout/Footer';
import { EditIcon, HeartIcon, UserIcon, CompassIcon, ImageIcon, CommentIcon } from '../components/common/Icons';

// --- Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef(null);
    const [isVisible] = useIntersectionObserver({ threshold: 0.3 }, counterRef);

    useEffect(() => {
        if (isVisible && !hasAnimated) {
            setHasAnimated(true);
            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(easeOutQuart * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isVisible, hasAnimated, end, duration]);

    return (
        <span ref={counterRef}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

// --- Rotating Testimonials Component ---
const RotatingTestimonials = () => {
    const testimonials = [
        {
            text: "HashNode has transformed my writing experience. The interface is just beautiful and lets me focus on what truly matters: the words.",
            author: "Alex Chen"
        },
        {
            text: "Finally, a blogging platform that values design as much as functionality. My readers love the clean look of my new blog.",
            author: "Jasmine Kaur"
        },
        {
            text: "The community here is amazing! I've connected with so many talented writers and received valuable feedback on my posts.",
            author: "Michael Rodriguez"
        },
        {
            text: "I love how easy it is to publish and share my thoughts. The markdown support and image uploads work flawlessly.",
            author: "Sarah Thompson"
        },
        {
            text: "As a developer, I appreciate the clean code and fast performance. This platform is built with care and attention to detail.",
            author: "David Kim"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out slowly
            setIsVisible(false);

            // Wait for slow fade out, then change testimonial
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                setIsVisible(true);
            }, 1000); // 1s fade out duration
        }, 4000); // 3s display + 1s fade = 4s total

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="mt-10 flex justify-center">
            <div
                className={`bg-glass p-8 rounded-xl border border-glass text-left max-w-2xl w-full transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
            >
                <p className="text-text-secondary text-lg italic">&quot;{testimonials[currentIndex].text}&quot;</p>
                <p className="mt-4 font-bold text-text-primary">- {testimonials[currentIndex].author}</p>

                {/* Progress Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 bg-indigo-500'
                                : 'w-2 bg-text-secondary/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Helper Components for Animations and FAQ ---

const AnimatedSection = ({ children, className }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div ref={ref} className={`transition-all duration-700 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <AnimatedSection>
            <div className="bg-glass p-6 rounded-lg border border-glass cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <summary className="font-semibold text-lg text-text-primary flex justify-between items-center list-none">
                    {question}
                    <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </summary>
                <div
                    ref={contentRef}
                    style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                >
                    <p className="mt-4 text-text-secondary">{answer}</p>
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- The Main HomePage Component ---

const HomePage = () => {
    const { isAuthenticated } = useAppContext();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const parallaxOffset = useParallax(0.3);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const result = await postService.getPosts({ limit: 3 }); // Fetch only 3 for landing page
            setPosts(result.posts || []);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const categories = ["Tech", "Travel", "Lifestyle", "Finance", "Health", "Food"];

    return (
        <>
            {/* Hero Section */}
            <div className="relative h-[100vh] overflow-hidden scroll-snap-section">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
                    style={{ transform: `translateY(${parallaxOffset}px)` }}
                >
                    <source src="https://cdn.pixabay.com/video/2024/03/26/205691-927672681_large.mp4" type="video/mp4" />
                </video>
                <div className="relative z-10 text-center py-10 sm:py-16 md:py-20 px-3 sm:px-4 h-full flex flex-col items-center justify-center">
                    {/* Hero Section */}
                    <section className="text-center space-y-4 sm:space-y-6 md:space-y-8 mt-8 sm:mt-12 lg:mt-24 reveal-on-scroll w-full">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-text-primary leading-tight px-2">Share Your Stories with the World</h1>
                        <p className="mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-text-secondary px-2">Create, edit, and explore blogs with likes, comments, and community support.</p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
                            <button onClick={() => navigate(isAuthenticated ? '/create-post' : '/auth', { state: { show: 'register' } })} className="bg-indigo-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-indigo-600 transition-colors">Create a Blog</button>
                            <button onClick={() => navigate('/explore-blogs')} className="bg-glass border border-glass text-text-primary px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-white/20 transition-colors">Explore Blogs</button>
                        </div>
                    </section>
                </div>
            </div>

            {/* Features Section */}
            <AnimatedSection className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 scroll-snap-section">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                    <div className="flex flex-col items-center"><div className="bg-glass p-3 sm:p-4 rounded-full border border-glass"><EditIcon /></div><h3 className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-text-primary">Rich Text Editor</h3><p className="mt-2 text-xs sm:text-sm text-text-secondary">Create beautiful blogs with an intuitive editor.</p></div>
                    <div className="flex flex-col items-center"><div className="bg-glass p-3 sm:p-4 rounded-full border border-glass"><HeartIcon className="w-5 sm:w-6 h-5 sm:h-6 text-text-primary" /></div><h3 className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-text-primary">Like & Comment</h3><p className="mt-2 text-xs sm:text-sm text-text-secondary">Engage with posts and connect with authors.</p></div>
                    <div className="flex flex-col items-center"><div className="bg-glass p-3 sm:p-4 rounded-full border border-glass"><UserIcon /></div><h3 className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-text-primary">Manage Profile</h3><p className="mt-2 text-xs sm:text-sm text-text-secondary">Customize your profile and manage your posts.</p></div>
                    <div className="flex flex-col items-center"><div className="bg-glass p-3 sm:p-4 rounded-full border border-glass"><CompassIcon /></div><h3 className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-text-primary">Discover Blogs</h3><p className="mt-2 text-xs sm:text-sm text-text-secondary">Explore content from a diverse community of writers.</p></div>
                </div>
            </AnimatedSection>

            {/* Why Choose Us Section */}
            <AnimatedSection className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 scroll-snap-section">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary text-center mb-10 sm:mb-12 md:mb-16">Why Choose HashNode?</h2>

                    <div className="bg-glass backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-glass p-6 sm:p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                            {/* Left side - Features */}
                            <div className="space-y-6 sm:space-y-8">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="bg-glass p-2 sm:p-3 rounded-lg border border-glass flex-shrink-0"><ImageIcon className="w-5 sm:w-6 h-5 sm:h-6 text-text-primary" /></div>
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-1 sm:mb-2">Unmatched Aesthetics</h3>
                                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">Our unique glassmorphism design provides a clean, modern, and visually stunning reading and writing experience.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="bg-glass p-2 sm:p-3 rounded-lg border border-glass flex-shrink-0"><CommentIcon className="w-5 sm:w-6 h-5 sm:h-6 text-text-primary" /></div>
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-1 sm:mb-2">Community Focused</h3>
                                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">We're more than a platform; we're a community. Engage with writers, get feedback, and grow together.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="bg-glass p-2 sm:p-3 rounded-lg border border-glass flex-shrink-0"><EditIcon className="w-5 sm:w-6 h-5 sm:h-6 text-text-primary" /></div>
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-1 sm:mb-2">Powerful Tools</h3>
                                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">Rich text editor, image uploads, categories, and everything you need to create amazing content.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="bg-glass p-2 sm:p-3 rounded-lg border border-glass flex-shrink-0"><HeartIcon className="w-5 sm:w-6 h-5 sm:h-6 text-text-primary" /></div>
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-1 sm:mb-2">Social Engagement</h3>
                                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">Like, comment, follow, and build meaningful connections with readers and fellow writers.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Visual with Stats */}
                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-glass backdrop-blur-sm rounded-xl sm:rounded-2xl border border-glass p-6 sm:p-8 text-center">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-400 mb-1 sm:mb-2">Community</h3>
                                    <p className="text-xs sm:text-sm text-text-secondary">Join thousands of writers</p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-glass backdrop-blur-sm border border-glass rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400 mb-1">5000+</p>
                                        <p className="text-xs sm:text-sm text-text-secondary">Blogs</p>
                                    </div>
                                    <div className="bg-glass backdrop-blur-sm border border-glass rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400 mb-1">1200+</p>
                                        <p className="text-xs sm:text-sm text-text-secondary">Users</p>
                                    </div>
                                    <div className="bg-glass backdrop-blur-sm border border-glass rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400 mb-1">100K+</p>
                                        <p className="text-xs sm:text-sm text-text-secondary">Views</p>
                                    </div>
                                    <div className="bg-glass backdrop-blur-sm border border-glass rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400 mb-1">24/7</p>
                                        <p className="text-xs sm:text-sm text-text-secondary">Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Trending Blogs Section */}
            <AnimatedSection id="blog-section" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 scroll-snap-section bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-10 sm:mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 sm:gap-3 bg-glass backdrop-blur-sm border border-glass px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                            <span className="relative flex h-2 sm:h-3 w-2 sm:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-text-secondary uppercase tracking-wider">Latest Posts</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-2 sm:mb-4 px-2">
                            Featured <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Blogs</span>
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-text-secondary max-w-2xl mx-auto px-2">
                            Discover the most engaging stories from our community of talented writers
                        </p>
                    </div>

                    {/* Blog Cards */}
                    {loading ? (
                        <SkeletonCardGrid count={3} />
                    ) : posts.length > 0 ? (
                        <>
                            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-24 reveal-on-scroll">
                                {posts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className="transform transition-all duration-300 hover:scale-105"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </section>

                            {/* View All Button */}
                            <div className="text-center flex justify-center mt-8 sm:mt-12">
                                <button
                                    onClick={() => navigate('/explore-blogs')}
                                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 sm:px-8 py-2 sm:py-4 rounded-full font-semibold text-sm sm:text-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    <span>Explore All Blogs</span>
                                    <svg
                                        className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 sm:py-16 md:py-20 px-3 sm:px-4">
                            <div className="bg-glass backdrop-blur-sm border border-glass rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 max-w-md mx-auto">
                                <div className="text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4">📝</div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary mb-2">No Blogs Yet</h3>
                                <p className="text-xs sm:text-sm text-text-secondary mb-4 sm:mb-6">Be the first to share your story with the community!</p>
                                <button
                                    onClick={() => navigate(isAuthenticated ? '/create-post' : '/auth')}
                                    className="bg-indigo-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-indigo-600 transition-colors"
                                >
                                    Create First Blog
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </AnimatedSection>

            {/* Popular Categories */}
            <AnimatedSection className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 scroll-snap-section">
                <div className="max-w-5xl mx-auto text-center"><h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">Popular Categories</h2><div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-4">{categories.map(cat => (<button key={cat} onClick={() => navigate('/categories')} className="bg-glass backdrop-blur-sm border border-glass text-text-primary px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/20 transition-colors">{cat}</button>))}</div></div>
            </AnimatedSection>

            {/* Community Stats & Testimonials Section */}
            <AnimatedSection className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 scroll-snap-section">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
                        <div className="transform transition-transform duration-300 hover:scale-105 sm:hover:scale-110 px-2">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400">
                                <AnimatedCounter end={5000} suffix="+" />
                            </p>
                            <p className="text-xs sm:text-sm text-text-secondary mt-2">Blogs Shared</p>
                            <div className="mt-2 sm:mt-3 inline-block">
                                <span className="relative bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-white text-xs font-extrabold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-[0_0_25px_rgba(52,211,153,0.7)] border-2 border-emerald-300/60 backdrop-blur-sm animate-pulse hover:scale-105 transition-transform">
                                    ✨ Every Day
                                </span>
                            </div>
                        </div>
                        <div className="transform transition-transform duration-300 hover:scale-105 sm:hover:scale-110 px-2">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400">
                                <AnimatedCounter end={1200} suffix="+" />
                            </p>
                            <p className="text-xs sm:text-sm text-text-secondary mt-2">Active Users</p>
                            <div className="mt-2 sm:mt-3 inline-block">
                                <span className="relative bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-white text-xs font-extrabold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-[0_0_25px_rgba(52,211,153,0.7)] border-2 border-emerald-300/60 backdrop-blur-sm animate-pulse hover:scale-105 transition-transform">
                                    ✨ Every Day
                                </span>
                            </div>
                        </div>
                        <div className="transform transition-transform duration-300 hover:scale-105 sm:hover:scale-110 px-2">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-400">
                                <AnimatedCounter end={100000} suffix="+" />
                            </p>
                            <p className="text-xs sm:text-sm text-text-secondary mt-2">Monthly Views</p>
                        </div>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-text-primary px-2">Join a growing community of storytellers!</h2>
                    <RotatingTestimonials />
                </div>
            </AnimatedSection>

            {/* FAQ Section */}
            <div className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
                <div className="max-w-3xl mx-auto"><h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary text-center mb-8 sm:mb-12">Frequently Asked Questions</h2><div className="space-y-3 sm:space-y-4"><FaqItem question="Is HashNode free to use?" answer="Yes, HashNode is completely free for both readers and writers. You can sign up and start publishing your stories today without any cost." /><FaqItem question="Can I customize my blog's appearance?" answer="While we maintain a consistent and beautiful design across the platform, you can customize your profile page with a banner, profile picture, and bio to express your personality." /><FaqItem question="How do I get my blog featured?" answer="Our editorial team regularly reviews new content. High-quality, engaging, and original posts have the best chance of being featured on our homepage and in our newsletter." /></div></div>
            </div>

            {/* CTA Section */}
            <AnimatedSection className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
                <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-32 mb-12 sm:mb-16 md:mb-20 reveal-on-scroll">
                    <div className="max-w-4xl mx-auto text-center bg-glass p-6 sm:p-8 md:p-12 rounded-lg sm:rounded-xl border border-glass">
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-text-primary px-2">Ready to share your thoughts?</h2>
                        <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-text-secondary">Start your blog today!</p>
                        <div className="mt-6 sm:mt-8 flex justify-center">
                            <button onClick={() => navigate('/auth', { state: { show: 'register' } })} className="bg-indigo-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-indigo-600 transition-colors">Get Started / Join Now</button>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <Footer />
        </>
    );
};

export default HomePage;