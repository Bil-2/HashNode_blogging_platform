import { useEffect, useRef } from 'react';

/**
 * Custom hook to warm up the server on initial app load
 * Prevents cold starts by pinging the health endpoint when user arrives
 * Only runs once per session and only in production
 */
const useServerWarmup = () => {
  const hasWarmedUp = useRef(false);

  useEffect(() => {
    // Only run once and only in production
    if (hasWarmedUp.current) return;
    if (import.meta.env.DEV) return; // Skip in development

    const warmupServer = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
        const healthUrl = `${apiBaseUrl.replace('/api', '')}/api/health`;

        console.log('🔥 Initiating server warmup...');

        // Fire-and-forget health check ping
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(healthUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Server warmup successful:', data.status);
        } else {
          console.warn('⚠️ Server warmup returned non-200 status:', response.status);
        }

        hasWarmedUp.current = true;
      } catch (error) {
        // Silently fail - don't disrupt user experience
        if (error.name !== 'AbortError') {
          console.log('ℹ️ Server warmup skipped - server may already be warm');
        }
        hasWarmedUp.current = true;
      }
    };

    // Run warmup after a short delay to not block initial render
    const timerId = setTimeout(warmupServer, 500);

    return () => clearTimeout(timerId);
  }, []);
};

export default useServerWarmup;
