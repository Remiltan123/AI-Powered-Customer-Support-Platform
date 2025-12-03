import mongoose from 'mongoose';

export const healthCheck = async (req, res) => {
  try {
    // Check MongoDB connection status
    const dbStatus = mongoose.connection.readyState;
    const status = dbStatus === 1 ? 'healthy' : 'unhealthy';

    res.status(200).json({
      status,
      database: {
        connected: dbStatus === 1,
        readyState: dbStatus
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error.message
    });
  }
};