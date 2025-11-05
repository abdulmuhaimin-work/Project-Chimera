/**
 * Fetch wrapper with retry logic and exponential backoff
 * Designed to handle backend servers that sleep after inactivity
 */

const DEFAULT_OPTIONS = {
  maxRetries: 3,
  initialTimeout: 30000, // 30 seconds for first attempt (allows server wake-up time)
  retryTimeout: 10000,   // 10 seconds for subsequent attempts
  backoffMultiplier: 1.5,
  retryableStatuses: [408, 429, 500, 502, 503, 504], // HTTP status codes that should trigger a retry
};

/**
 * Custom error class for fetch failures
 */
export class FetchError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.response = response;
  }
}

/**
 * Sleep utility for delays between retries
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with timeout support
 */
const fetchWithTimeout = async (url, options = {}, timeoutMs) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new FetchError('Request timeout - server may be waking up', 408, null);
    }
    throw error;
  }
};

/**
 * Main fetch wrapper with retry logic
 * 
 * @param {string} url - The URL to fetch
 * @param {Object} fetchOptions - Standard fetch options (method, headers, body, etc.)
 * @param {Object} retryOptions - Retry configuration options
 * @param {Function} onRetry - Callback function called before each retry attempt
 * @returns {Promise<Response>} - The fetch response
 */
export const fetchWithRetry = async (
  url,
  fetchOptions = {},
  retryOptions = {},
  onRetry = null
) => {
  const options = { ...DEFAULT_OPTIONS, ...retryOptions };
  let lastError = null;
  
  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      // Use longer timeout for first attempt to allow server wake-up
      const timeout = attempt === 0 ? options.initialTimeout : options.retryTimeout;
      
      // Notify caller about retry attempt
      if (onRetry && attempt > 0) {
        onRetry(attempt, options.maxRetries);
      }
      
      const response = await fetchWithTimeout(url, fetchOptions, timeout);
      
      // Check if response status indicates we should retry
      if (!response.ok && options.retryableStatuses.includes(response.status)) {
        throw new FetchError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response
        );
      }
      
      // Success! Return the response
      return response;
      
    } catch (error) {
      lastError = error;
      
      // Don't retry if we've exhausted all attempts
      if (attempt >= options.maxRetries) {
        break;
      }
      
      // Check if error is retryable
      const isRetryable = 
        error instanceof FetchError ||
        error.name === 'TypeError' || // Network errors
        error.message.includes('fetch') ||
        error.message.includes('network');
      
      if (!isRetryable) {
        throw error;
      }
      
      // Calculate backoff delay (exponential backoff)
      const baseDelay = 1000; // 1 second base
      const delay = baseDelay * Math.pow(options.backoffMultiplier, attempt);
      
      console.log(
        `Fetch attempt ${attempt + 1} failed. Retrying in ${delay}ms...`,
        error.message
      );
      
      // Wait before retrying
      await sleep(delay);
    }
  }
  
  // All retries exhausted
  console.error(`All ${options.maxRetries + 1} fetch attempts failed for ${url}`);
  throw lastError || new Error('Request failed after multiple retries');
};

/**
 * Convenience wrapper for JSON API calls
 * 
 * @param {string} url - The URL to fetch
 * @param {Object} fetchOptions - Standard fetch options
 * @param {Object} retryOptions - Retry configuration options
 * @param {Function} onRetry - Callback function called before each retry attempt
 * @returns {Promise<any>} - Parsed JSON response
 */
export const fetchJsonWithRetry = async (
  url,
  fetchOptions = {},
  retryOptions = {},
  onRetry = null
) => {
  const response = await fetchWithRetry(url, fetchOptions, retryOptions, onRetry);
  
  if (!response.ok) {
    throw new FetchError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response
    );
  }
  
  return await response.json();
};

