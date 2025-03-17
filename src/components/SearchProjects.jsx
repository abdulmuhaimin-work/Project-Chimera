import { useState, useEffect, useRef } from 'react';
import { HiSearch, HiX, HiTag } from 'react-icons/hi';

function SearchProjects({ projects, onProjectSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const searchRef = useRef(null);

  // Extract all unique tags from projects
  useEffect(() => {
    if (projects && projects.length > 0) {
      const tags = new Set();
      projects.forEach(project => {
        if (project.tags && Array.isArray(project.tags)) {
          project.tags.forEach(tag => tags.add(tag));
        }
      });
      setAllTags(Array.from(tags));
    }
  }, [projects]);

  // Filter projects based on search term and selected tags
  useEffect(() => {
    if (!projects) return;
    
    let results = [...projects];
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(term) || 
        (project.description && project.description.toLowerCase().includes(term))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      results = results.filter(project => 
        project.tags && selectedTags.every(tag => project.tags.includes(tag))
      );
    }
    
    setFilteredProjects(results);
  }, [searchTerm, selectedTags, projects]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setIsOpen(false);
  };

  const handleSelectProject = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative" ref={searchRef}>
      <div className="relative">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50"
          />
          <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <HiX size={20} />
            </button>
          )}
        </div>
        
        {/* Tags filter */}
        <div className="mt-3 flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <HiTag className="mr-1" size={14} />
              {tag}
            </button>
          ))}
        </div>
        
        {/* Search results dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
            {filteredProjects.length > 0 ? (
              <ul className="py-2">
                {filteredProjects.map(project => (
                  <li key={project.id}>
                    <button
                      onClick={() => handleSelectProject(project)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                      {project.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1 mt-1">
                          {project.description}
                        </p>
                      )}
                      {project.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="inline-block px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                No projects found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add a spacer div to create room for the dropdown when it's open */}
      {isOpen && filteredProjects.length > 0 && (
        <div className="h-96 w-full" />
      )}
    </div>
  );
}

export default SearchProjects; 