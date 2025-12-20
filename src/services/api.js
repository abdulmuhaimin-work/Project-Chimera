import { API_ENDPOINTS } from '../config/api';
import { fetchJsonWithRetry } from '../utils/fetchWithRetry';

/**
 * Validates that work experiences response contains actual data
 * This handles the case where the backend server is still initializing
 * and returns empty arrays even though it responds with 200 OK
 */
const validateWorkExperiences = (data) => {
  // Check if data exists and has a data property with at least one item
  // We expect work experiences to always have data in production
  return data && data.data && Array.isArray(data.data) && data.data.length > 0;
};

/**
 * Validates that projects response contains actual data
 */
const validateProjects = (data) => {
  // For projects, we also expect at least one project to be present
  return data && data.data && Array.isArray(data.data) && data.data.length > 0;
};

/**
 * Validates that posts response is valid
 * Posts can be empty (no published posts yet), so we just check structure
 */
const validatePosts = (data) => {
  // For blog posts, we accept empty arrays as valid (no posts yet is okay)
  return data && data.data && Array.isArray(data.data);
};

/**
 * Fetch work experiences with automatic retry on failure
 * Includes validation to detect when server is still initializing
 * @param {Function} onRetry - Optional callback for retry notifications
 */
export const fetchWorkExperiences = async (onRetry = null) => {
  try {
    const data = await fetchJsonWithRetry(
      API_ENDPOINTS.workExperiences,
      {},
      {}, // Use default retry options
      onRetry,
      validateWorkExperiences // Validate that data is actually loaded
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    throw error;
  }
};

/**
 * Fetch projects with automatic retry on failure
 * Includes validation to detect when server is still initializing
 * @param {Function} onRetry - Optional callback for retry notifications
 */
export const fetchProjects = async (onRetry = null) => {
  try {
    const data = await fetchJsonWithRetry(
      API_ENDPOINTS.projects,
      {},
      {}, // Use default retry options
      onRetry,
      validateProjects // Validate that data is actually loaded
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetch blog posts with automatic retry on failure
 * Posts can be empty, so validation is lenient
 * @param {Function} onRetry - Optional callback for retry notifications
 */
export const fetchPosts = async (onRetry = null) => {
  try {
    const data = await fetchJsonWithRetry(
      API_ENDPOINTS.posts,
      {},
      {}, // Use default retry options
      onRetry,
      validatePosts // Validate response structure
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}; 