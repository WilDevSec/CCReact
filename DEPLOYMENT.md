# Deployment Guide

This guide explains how to deploy this application to any server outside of Replit.

## Prerequisites

1. Node.js v18+ installed
2. PostgreSQL database server
3. Nginx (or another web server) for reverse proxy
4. PM2 or similar process manager (optional but recommended)

## Environment Setup

1. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

2. Update the following variables in `.env`:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLIC_KEY`: Your Stripe API keys
   - `CORS_ORIGIN`: Your domain name
   - `NODE_ENV`: Set to "production"
   - `PORT`: The port your application will run on (default: 5000)

## Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE your_database_name;
   ```

2. Push the database schema:
   ```bash
   npm run db:push
   ```

3. Run the database setup script to create initial data:
   ```bash
   node -r tsx server/setupDb.ts
   ```

## Application Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

   Or using PM2:
   ```bash
   pm2 start npm --name "surf-competitions" -- start
   ```

## Nginx Configuration

Add this to your Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Setup (Recommended)

1. Install Certbot
2. Run:
   ```bash
   certbot --nginx -d your-domain.com
   ```

## Monitoring

1. Monitor logs:
   ```bash
   tail -f ~/.pm2/logs/surf-competitions-out.log
   ```

2. Monitor application status with PM2:
   ```bash
   pm2 status
   pm2 monit
   ```

## Common Issues

1. If the application fails to start, check:
   - Environment variables are properly set
   - Database is accessible
   - Port 5000 is not in use
   - Node.js version is 18 or higher

2. If database connections fail:
   - Verify PostgreSQL is running
   - Check DATABASE_URL is correct
   - Ensure database user has proper permissions

3. If Stripe payments fail:
   - Verify Stripe API keys are correct
   - Check CORS_ORIGIN matches your domain

## Backup

Regular database backups are recommended:

```bash
pg_dump -U your_user your_database > backup.sql
```

You can automate this with a cron job.
