import { useState, useEffect } from 'react';
import { HiCode, HiStar, HiOutlineExclamationCircle } from 'react-icons/hi';

function GitHubActivity({ username, repoLimit = 5 }) {
  const [repos, setRepos] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setIsLoading(true);
        
        // Fetch user's repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${repoLimit}`);
        
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const reposData = await reposResponse.json();
        setRepos(reposData);
        
        // Fetch user's recent activity (events)
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
        
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch activity');
        }
        
        const eventsData = await eventsResponse.json();
        setActivity(eventsData);
        
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (username) {
      fetchGitHubData();
    }
  }, [username, repoLimit]);

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
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
  };

  // Get event description based on type
  const getEventDescription = (event) => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.commits?.length || 0} commit(s) to ${event.repo.name}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${event.repo.name}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request in ${event.repo.name}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${event.repo.name}`;
      case 'IssueCommentEvent':
        return `Commented on issue in ${event.repo.name}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name}`;
      default:
        return `Activity in ${event.repo.name}`;
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400 flex items-center">
        <HiOutlineExclamationCircle className="mr-2 flex-shrink-0" size={20} />
        <p>Error loading GitHub data: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent repositories */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Repositories</h3>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
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
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <HiCode className="mr-2 text-primary dark:text-blue-400" />
                        {repo.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <HiStar className="mr-1" />
                      {repo.stargazers_count}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: repo.language ? '#3b82f6' : '#9ca3af' }}></span>
                    {repo.language || 'No language detected'}
                    <span className="mx-2">•</span>
                    Updated {formatRelativeTime(repo.updated_at)}
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
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {activity.slice(0, 6).map(event => (
                <div 
                  key={event.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <p className="text-gray-800 dark:text-gray-200">
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