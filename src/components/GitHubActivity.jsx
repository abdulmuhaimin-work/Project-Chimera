import { useState, useEffect, useCallback } from 'react';
import { HiCode, HiStar, HiOutlineExclamationCircle } from 'react-icons/hi';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEYS = {
  REPOS: 'github_repos',
  ACTIVITY: 'github_activity'
};

// Cache utility functions
const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Cache read error:', error);
  }
  return null;
};

const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Cache write error:', error);
  }
};

function GitHubActivity({ username, repoLimit = 5 }) {
  const [repos, setRepos] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Memoized fetch function to prevent unnecessary API calls
  const fetchGitHubData = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first unless force refresh
      if (!forceRefresh) {
        const cachedRepos = getFromCache(CACHE_KEYS.REPOS);
        const cachedActivity = getFromCache(CACHE_KEYS.ACTIVITY);

        if (cachedRepos && cachedActivity) {
          setRepos(cachedRepos);
          setActivity(cachedActivity);
          setIsLoading(false);
          return;
        }
      }

      // Fetch with timeout and retry logic
      const fetchWithTimeout = async (url, options = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          return response;
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      };

      // Fetch repositories
      const reposResponse = await fetchWithTimeout(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=${repoLimit}`
      );
      
      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
      }
      
      const reposData = await reposResponse.json();
      
      // Fetch activity
      const eventsResponse = await fetchWithTimeout(
        `https://api.github.com/users/${username}/events?per_page=10`
      );
      
      if (!eventsResponse.ok) {
        throw new Error(`Failed to fetch activity: ${eventsResponse.status}`);
      }
      
      const eventsData = await eventsResponse.json();
      
      // Update state and cache
      setRepos(reposData);
      setActivity(eventsData);
      setCache(CACHE_KEYS.REPOS, reposData);
      setCache(CACHE_KEYS.ACTIVITY, eventsData);
      setRetryCount(0);
      
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      
      // Try to use cached data on error
      const cachedRepos = getFromCache(CACHE_KEYS.REPOS);
      const cachedActivity = getFromCache(CACHE_KEYS.ACTIVITY);
      
      if (cachedRepos && cachedActivity) {
        setRepos(cachedRepos);
        setActivity(cachedActivity);
        setError('Using cached data due to network error');
      } else {
        setError(err.message || 'Failed to fetch GitHub data');
      }
    } finally {
      setIsLoading(false);
    }
  }, [username, repoLimit]);

  useEffect(() => {
    if (username) {
      fetchGitHubData();
    }
  }, [username, fetchGitHubData]);

  // Retry mechanism with exponential backoff
  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        fetchGitHubData(true);
      }, Math.pow(2, retryCount) * 1000); // Exponential backoff
    }
  }, [retryCount, fetchGitHubData]);

  // Optimized date formatting with memoization
  const formatRelativeTime = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }, []);

  // Memoized event description
  const getEventDescription = useCallback((event) => {
    const eventDescriptions = {
      'PushEvent': `Pushed ${event.payload.commits?.length || 0} commit(s) to ${event.repo.name}`,
      'CreateEvent': `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${event.repo.name}`,
      'PullRequestEvent': `${event.payload.action} pull request in ${event.repo.name}`,
      'IssuesEvent': `${event.payload.action} issue in ${event.repo.name}`,
      'IssueCommentEvent': `Commented on issue in ${event.repo.name}`,
      'WatchEvent': `Starred ${event.repo.name}`,
      'ForkEvent': `Forked ${event.repo.name}`,
      'default': `Activity in ${event.repo.name}`
    };
    
    return eventDescriptions[event.type] || eventDescriptions.default;
  }, []);

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex justify-center py-8">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (error && !repos.length && !activity.length) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
        <div className="flex items-center mb-2">
          <HiOutlineExclamationCircle className="mr-2 flex-shrink-0" size={20} />
          <p>Error loading GitHub data: {error}</p>
        </div>
        {retryCount < 3 && (
          <button
            onClick={handleRetry}
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
          >
            Retry ({retryCount + 1}/3)
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            ⚠️ {error}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent repositories */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Repositories</h3>
            <button
              onClick={() => fetchGitHubData(true)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              disabled={isLoading}
            >
              {isLoading ? '⟳' : '↻'}
            </button>
          </div>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {repos.map(repo => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <HiCode className="mr-2 text-primary dark:text-blue-400 flex-shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-4">
                      <HiStar className="mr-1 flex-shrink-0" />
                      {repo.stargazers_count}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-block w-2 h-2 rounded-full mr-1 flex-shrink-0" 
                          style={{ backgroundColor: repo.language ? '#3b82f6' : '#9ca3af' }}></span>
                    <span className="truncate">{repo.language || 'No language detected'}</span>
                    <span className="mx-2">•</span>
                    <span className="whitespace-nowrap">Updated {formatRelativeTime(repo.updated_at)}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* Recent activity */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {activity.slice(0, 6).map(event => (
                <div 
                  key={event.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatRelativeTime(event.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GitHubActivity; 