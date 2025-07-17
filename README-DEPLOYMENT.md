# Deployment Configuration

## Backend API Configuration

The frontend is now configured to automatically use the correct backend URL based on the environment:

- **Development**: `http://localhost:4000`
- **Production**: `https://chimera-cms.fly.dev`

## Files Modified

1. **src/config/api.js** - New API configuration file
2. **src/pages/Blog.jsx** - Updated to use environment-aware API calls

## Environment Variables

The application uses Vite's built-in environment handling:

- `import.meta.env.PROD` - Automatically set by Vite for production builds
- `import.meta.env.VITE_API_URL` - Can be used to override the API URL if needed

## Available API Endpoints

- **Posts**: `/api/posts` - Blog posts
- **Projects**: `/api/projects` - Portfolio projects

## Building for Production

```bash
npm run build
```

This will create a production build that automatically uses `https://chimera-cms.fly.dev` as the backend URL.

## Local Development

```bash
npm run dev
```

This will start the development server and use `http://localhost:4000` for API calls.

## Backend CORS Configuration

Make sure your backend at `https://chimera-cms.fly.dev` has CORS configured to allow requests from your frontend domain. 