import { API_ENDPOINTS } from '../config/api';
import { fetchJsonWithRetry } from '../utils/fetchWithRetry';

/**
 * Fetch work experiences with automatic retry on failure
 * @param {Function} onRetry - Optional callback for retry notifications
 */
export const fetchWorkExperiences = async (onRetry = null) => {
  try {
    const data = await fetchJsonWithRetry(
      API_ENDPOINTS.workExperiences,
      {},
      {}, // Use default retry options
      onRetry
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    throw error;
  }
};

/**
 * Fetch projects with automatic retry on failure
 * @param {Function} onRetry - Optional callback for retry notifications
 */
export const fetchProjects = async (onRetry = null) => {
  try {
    const data = await fetchJsonWithRetry(
      API_ENDPOINTS.projects,
      {},
      {}, // Use default retry options
      onRetry
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetch blog posts with automatic retry on failure
 * @param {Function} onRetry - Optional callback for retry notifications
 */
export const fetchPosts = async (onRetry = null) => {
  try {
    const data = await fetchJsonWithRetry(
      API_ENDPOINTS.posts,
      {},
      {}, // Use default retry options
      onRetry
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}; 