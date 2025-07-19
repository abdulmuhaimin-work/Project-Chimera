// API Configuration
const getApiUrl = () => {
  // Check if we're in production build
  if (import.meta.env.PROD) {
    return 'https://chimera-cms.fly.dev';
  }
  
  // Check for explicit environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:4000';
};

export const API_URL = getApiUrl();
export const API_ENDPOINTS = {
  posts: `${API_URL}/api/posts`,
  projects: `${API_URL}/api/projects`,
  workExperiences: `${API_URL}/api/work-experiences`,
}; 