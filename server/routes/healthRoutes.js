import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Lightweight health check endpoint for keep-alive pings
router.get('/health', (req, res) => {
  // Add no-cache headers to ensure fresh requests
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  // Check database connection status
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'healthy',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Comprehensive warmup endpoint - keeps database connections active
router.get('/warmup', async (req, res) => {
  // Add no-cache headers
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  try {
    // Ping MongoDB to ensure connection is active
    const dbStatus = mongoose.connection.readyState;
    let dbPingResult = 'not_connected';

    if (dbStatus === 1) {
      // Perform a lightweight database operation to warm up the connection
      await mongoose.connection.db.admin().ping();
      dbPingResult = 'active';
    }

    res.status(200).json({
      status: 'warmed',
      database: dbPingResult,
      dbReadyState: dbStatus, // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: 'Server and database connections are warm'
    });
  } catch (error) {
    // Even if DB ping fails, still return 200 to keep server warm
    res.status(200).json({
      status: 'partial',
      database: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: 'Server is warm, but database may be cold'
    });
  }
});

// Detailed status check (optional)
router.get('/status', (req, res) => {
  // Add no-cache headers
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStates[mongoose.connection.readyState] || 'unknown',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'not connected',
      name: mongoose.connection.name || 'not connected'
    },
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

export default router;

