import { useEffect } from 'react';

/**
 * useScrollReveal
 * 
 * Global hook that listens for all elements with the 'reveal-on-scroll' class.
 * It uses a MutationObserver to automatically detect dynamically (lazy) loaded
 * pages and attaches to them to ensure they animate properly.
 */
const useScrollReveal = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const observeNewElements = () => {
            // Find all unrevealed elements
            const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
            elements.forEach(el => intersectionObserver.observe(el));
        };

        // 1. Observe any elements already in the DOM
        observeNewElements();

        // 2. Setup MutationObserver to catch elements loaded via React.lazy/Suspense updates
        const mutationObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    observeNewElements();
                }
            }
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            mutationObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, []); // Only setup once! Mutation observer handles dynamic route switches
};

export default useScrollReveal;
