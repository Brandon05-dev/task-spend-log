# Expense Tracker - Netlify Deployment Guide

## Frontend Deployment to Netlify

This React frontend is configured for deployment to Netlify with the following files:

### Configuration Files

1. **`public/_redirects`** - Handles client-side routing
2. **`netlify.toml`** - Netlify build configuration
3. **Updated `package.json`** - Build script with OpenSSL legacy provider

### Deployment Steps

1. **Build the project locally (optional test):**
   ```bash
   cd expense-tracker-frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy from the `expense-tracker-frontend` folder

### Environment Variables

If you need to connect to a live backend API, add these environment variables in Netlify:

- `REACT_APP_API_BASE` - Your backend API URL (e.g., `https://your-backend.herokuapp.com/api`)

### Important Notes

- The `_redirects` file ensures all routes redirect to `index.html` for proper SPA routing
- The build script includes `--openssl-legacy-provider` for Node.js 18+ compatibility
- All static assets will be properly cached with the configuration in `netlify.toml`

### Backend Considerations

The current frontend is configured to connect to `http://127.0.0.1:8001/api` for local development. For production deployment, you'll need to:

1. Deploy the Django backend to a service like Heroku, Railway, or DigitalOcean
2. Update the `REACT_APP_API_BASE` environment variable in Netlify to point to your deployed backend
3. Configure CORS in your Django backend to allow requests from your Netlify domain
