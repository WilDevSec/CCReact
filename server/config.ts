import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default values for development, override in production
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublicKey: process.env.VITE_STRIPE_PUBLIC_KEY,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  sessionSecret: process.env.SESSION_SECRET || 'your-secret-key',
  // Add static file serving configuration
  staticPath: path.resolve(__dirname, '../dist/public'),
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'STRIPE_SECRET_KEY', 'VITE_STRIPE_PUBLIC_KEY'];

if (process.env.NODE_ENV === 'production') {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}