import { resumeData, fetchWorkExperiencesData } from '../data/resumeData';
import { API_ENDPOINTS } from '../config/api';

// Function to fetch projects from API
const fetchProjectsData = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.projects);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    // Return featured projects first, then others, limited to top 4-6 projects
    const projects = data.data || [];
    return projects
      .sort((a, b) => {
        // Featured projects first, then by sort_order
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.sort_order - b.sort_order;
      })
      .slice(0, 5); // Limit to 5 projects for resume
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const generateResumeHTML = async (workExperiences = null, projects = null) => {
  // Fetch work experiences if not provided
  if (!workExperiences) {
    workExperiences = await fetchWorkExperiencesData();
  }
  
  // Fetch projects if not provided
  if (!projects) {
    projects = await fetchProjectsData();
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${resumeData.personalInfo.name} - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
          padding: 20px;
          font-size: 12px;
        }
        
        .resume-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
          font-weight: 300;
        }
        
        .header h2 {
          font-size: 1.3em;
          margin-bottom: 20px;
          opacity: 0.9;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 20px;
        }
        
        .contact-info span {
          font-size: 0.9em;
          opacity: 0.9;
        }
        
        .content {
          padding: 40px;
        }
        
        .section {
          margin-bottom: 40px;
        }
        
        .section h3 {
          color: #667eea;
          font-size: 1.3em;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #667eea;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .summary {
          font-size: 1.1em;
          line-height: 1.8;
          color: #555;
          text-align: justify;
        }
        
        .job, .project-item {
          margin-bottom: 25px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        
        .job-header, .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        
        .job-title, .project-title {
          font-size: 1.2em;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .job-company, .project-role {
          font-size: 1em;
          color: #667eea;
          margin-bottom: 5px;
        }
        
        .job-period, .project-timeline {
          font-size: 0.9em;
          color: #666;
          font-style: italic;
        }
        
        .job-description, .project-description {
          margin-bottom: 15px;
          color: #555;
          text-align: justify;
        }
        
        .technologies, .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-tag {
          background: #667eea;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
        }
        
        .project-links {
          margin-top: 10px;
          font-size: 0.9em;
        }
        
        .project-links a {
          color: #667eea;
          text-decoration: none;
          margin-right: 15px;
        }
        
        .project-featured {
          position: relative;
        }
        
        .project-featured::before {
          content: "★";
          position: absolute;
          top: 15px;
          right: 15px;
          color: #ffd700;
          font-size: 1.2em;
        }
        
        .education-item {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        
        .education-degree {
          font-size: 1.2em;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .education-institution {
          color: #667eea;
          margin-bottom: 5px;
        }
        
        .education-period {
          color: #666;
          font-style: italic;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .skill-category {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        
        .skill-category h4 {
          color: #333;
          margin-bottom: 10px;
          font-size: 1.1em;
        }
        
        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .skill-item {
          background: white;
          color: #667eea;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.9em;
          border: 1px solid #e0e0e0;
        }
        
        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .language-item {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          border-left: 4px solid #667eea;
        }
        
        .language-name {
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .language-level {
          color: #667eea;
          font-style: italic;
        }
        
        @media print {
          body {
            padding: 0;
            font-size: 11px;
          }
          
          .resume-container {
            box-shadow: none;
            margin: 0;
            max-width: none;
          }
          
          .header {
            padding: 20px;
          }
          
          .content {
            padding: 20px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .job, .project-item {
            margin-bottom: 20px;
            padding: 15px;
          }
          
          .skill-category {
            padding: 15px;
          }
          
          .education-item {
            padding: 15px;
          }
          
          .project-links a {
            color: #333 !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        <div class="header">
          <h1>${resumeData.personalInfo.name}</h1>
          <h2>${resumeData.personalInfo.title}</h2>
          <div class="contact-info">
            <span>📍 ${resumeData.personalInfo.location}</span>
            <span>📞 ${resumeData.personalInfo.phone}</span>
            <span>📧 ${resumeData.personalInfo.email}</span>
            <span>🌐 ${resumeData.personalInfo.website}</span>
            <span>💼 LinkedIn: ${resumeData.personalInfo.linkedin}</span>
            <span>💻 GitHub: ${resumeData.personalInfo.github}</span>
          </div>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>Professional Summary</h3>
            <p class="summary">${resumeData.summary}</p>
          </div>
          
          <div class="section">
            <h3>Work Experience</h3>
            ${workExperiences.map(job => `
              <div class="job">
                <div class="job-header">
                  <div>
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                  </div>
                  <div class="job-period">${job.period}</div>
                </div>
                <div class="job-description">${job.description}</div>
                <div class="technologies">
                  ${job.technologies && job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') || ''}
                </div>
              </div>
            `).join('')}
          </div>

          ${projects && projects.length > 0 ? `
          <div class="section">
            <h3>Key Projects</h3>
            ${projects.map(project => `
              <div class="project-item ${project.featured ? 'project-featured' : ''}">
                <div class="project-header">
                  <div>
                    <div class="project-title">${project.title}</div>
                    <div class="project-role">${project.role || 'Developer'} ${project.client ? '• ' + project.client : ''}</div>
                  </div>
                  <div class="project-timeline">${project.timeline || ''}</div>
                </div>
                <div class="project-description">${project.description}</div>
                ${project.outcome ? `<div class="project-description"><strong>Outcome:</strong> ${project.outcome}</div>` : ''}
                <div class="project-technologies">
                  ${project.tech_stack && project.tech_stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('') || ''}
                </div>
                ${(project.repo_url || project.live_url) ? `
                <div class="project-links">
                  ${project.live_url ? `<a href="${project.live_url}">🌐 Live Demo</a>` : ''}
                  ${project.repo_url ? `<a href="${project.repo_url}">💻 Source Code</a>` : ''}
                </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <div class="section">
            <h3>Education</h3>
            <div class="education-item">
              <div class="education-degree">${resumeData.education.degree}</div>
              <div class="education-institution">${resumeData.education.institution}</div>
              <div class="education-period">${resumeData.education.period}</div>
            </div>
          </div>
          
          <div class="section">
            <h3>Technical Skills</h3>
            <div class="skills-grid">
              <div class="skill-category">
                <h4>Frontend Development</h4>
                <div class="skill-list">
                  ${resumeData.skills.frontend.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
              </div>
              <div class="skill-category">
                <h4>Backend Development</h4>
                <div class="skill-list">
                  ${resumeData.skills.backend.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
              </div>
              <div class="skill-category">
                <h4>Tools & Technologies</h4>
                <div class="skill-list">
                  ${resumeData.skills.tools.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>Languages</h3>
            <div class="languages-grid">
              ${resumeData.languages.map(language => `
                <div class="language-item">
                  <div class="language-name">${language.name}</div>
                  <div class="language-level">${language.level}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const openResumeWindow = async () => {
  const resumeWindow = window.open('', '_blank', 'width=800,height=600');
  
  // Show loading message
  resumeWindow.document.write(`
    <html>
      <head><title>Generating Resume...</title></head>
      <body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
        <h2>Generating Resume...</h2>
        <p>Please wait while we fetch your latest work experience and project data.</p>
      </body>
    </html>
  `);
  
  try {
    const resumeHTML = await generateResumeHTML();
    
    // Replace with actual resume content
    resumeWindow.document.open();
    resumeWindow.document.write(resumeHTML);
    resumeWindow.document.close();
    
    // Add a small delay to ensure content is rendered before printing
    setTimeout(() => {
      resumeWindow.print();
    }, 500);
  } catch (error) {
    console.error('Error generating resume:', error);
    resumeWindow.document.open();
    resumeWindow.document.write(`
      <html>
        <head><title>Resume Generation Error</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>Error Generating Resume</h2>
          <p>Sorry, there was an error generating your resume. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </body>
      </html>
    `);
    resumeWindow.document.close();
  }
}; 