import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * 
 * Global hook that listens for all elements with the 'reveal-on-scroll' class.
 * When they enter the viewport, it adds the 'revealed' class to trigger CSS animations.
 * It re-triggers scanning on every route change to ensure newly mounted pages also animate.
 */
const useScrollReveal = () => {
    const location = useLocation();

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed to prevent re-animating on scroll up
                    // (Optional: remove this if you want elements to hide/reveal repeatedly)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Find all elements that should be animated
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => observer.observe(el));

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, [location.pathname]); // Re-run whenever the route changes
};

export default useScrollReveal;
