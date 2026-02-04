/**
 * In-Memory Cache Middleware
 * Caches API responses to reduce database load and improve response times
 * Especially helpful during backend cold starts
 */

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Simple in-memory cache middleware
 * @param {number} duration - Cache duration in milliseconds (default: 5 minutes)
 */
const cacheMiddleware = (duration = CACHE_DURATION) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      const { data, timestamp } = cachedResponse;
      const age = Date.now() - timestamp;

      // Return cached response if still valid
      if (age < duration) {
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('X-Cache-Age', Math.floor(age / 1000));
        return res.json(data);
      } else {
        // Remove expired cache
        cache.delete(key);
      }
    }

    // Store original res.json function
    const originalJson = res.json.bind(res);

    // Override res.json to cache the response
    res.json = (data) => {
      cache.set(key, {
        data,
        timestamp: Date.now()
      });
      res.setHeader('X-Cache', 'MISS');
      return originalJson(data);
    };

    next();
  };
};

/**
 * Clear cache for a specific route pattern
 * @param {string} pattern - Route pattern to clear (e.g., '/api/posts')
 */
const clearCache = (pattern) => {
  const keys = Array.from(cache.keys());
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  });
};

/**
 * Clear all cache
 */
const clearAllCache = () => {
  cache.clear();
};

/**
 * Get cache statistics
 */
const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  };
};

export { cacheMiddleware, clearCache, clearAllCache, getCacheStats };
export default cacheMiddleware;
