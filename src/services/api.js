import { API_ENDPOINTS } from '../config/api';

export const fetchWorkExperiences = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.workExperiences);
    if (!response.ok) {
      throw new Error('Failed to fetch work experiences');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.projects);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.posts);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}; 