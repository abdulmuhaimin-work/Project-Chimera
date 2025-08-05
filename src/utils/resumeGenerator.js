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
          font-family: 'Calibri', 'Arial', sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          background: white;
          padding: 0.75in;
          font-size: 11pt;
          max-width: 8.5in;
          margin: 0 auto;
        }
        
        .resume-container {
          background: white;
        }
        
        .header {
          text-align: center;
          margin-bottom: 25pt;
          padding-bottom: 15pt;
          border-bottom: 2pt solid #34495e;
        }
        
        .header h1 {
          font-size: 22pt;
          font-weight: bold;
          margin-bottom: 8pt;
          color: #2c3e50;
          letter-spacing: 1pt;
        }
        
        .header h2 {
          font-size: 14pt;
          margin-bottom: 15pt;
          font-weight: normal;
          color: #34495e;
        }
        
        .contact-info {
          font-size: 10.5pt;
          text-align: center;
          line-height: 1.4;
        }
        
        .contact-info div {
          margin-bottom: 3pt;
        }
        
        .section {
          margin-bottom: 25pt;
        }
        
        .section h3 {
          font-size: 13pt;
          font-weight: bold;
          margin-bottom: 12pt;
          text-transform: uppercase;
          color: #2c3e50;
          border-bottom: 1.5pt solid #bdc3c7;
          padding-bottom: 4pt;
          letter-spacing: 0.5pt;
        }
        
        .summary {
          font-size: 11pt;
          line-height: 1.6;
          text-align: justify;
          margin-bottom: 0;
          padding: 10pt 15pt;
          background-color: #f8f9fa;
          border-left: 3pt solid #3498db;
        }
        
        .job, .project-item {
          margin-bottom: 18pt;
          padding-bottom: 15pt;
          border-bottom: 1pt solid #ecf0f1;
        }
        
        .job:last-child, .project-item:last-child {
          border-bottom: none;
        }
        
        .job-header, .project-header {
          margin-bottom: 8pt;
        }
        
        .job-title, .project-title {
          font-size: 12pt;
          font-weight: bold;
          display: inline;
          color: #2c3e50;
        }
        
        .job-company, .project-role {
          font-size: 11pt;
          font-weight: 600;
          color: #34495e;
          margin-left: 5pt;
        }
        
        .job-period, .project-timeline {
          font-size: 10pt;
          font-style: italic;
          float: right;
          color: #7f8c8d;
          background-color: #f8f9fa;
          padding: 2pt 6pt;
          border-radius: 3pt;
        }
        
        .job-description, .project-description {
          margin: 8pt 0;
          font-size: 11pt;
          line-height: 1.5;
          text-align: justify;
        }
        
        .job-description ul, .project-description ul {
          margin: 8pt 0 8pt 25pt;
          padding: 0;
        }
        
        .job-description li, .project-description li {
          margin-bottom: 4pt;
          line-height: 1.5;
        }
        
        .technologies, .project-technologies {
          font-size: 10pt;
          margin-top: 8pt;
          padding: 6pt 10pt;
          background-color: #f8f9fa;
          border-radius: 4pt;
          border-left: 3pt solid #95a5a6;
        }
        
        .technologies::before, .project-technologies::before {
          content: "Technologies: ";
          font-weight: bold;
          color: #34495e;
        }
        
        .project-links {
          font-size: 10pt;
          margin-top: 8pt;
          padding: 5pt 0;
          border-top: 1pt dotted #bdc3c7;
        }
        
        .project-links a {
          color: #2980b9;
          text-decoration: underline;
          margin-right: 10pt;
        }
        
        .education-item {
          padding: 12pt 15pt;
          background-color: #f8f9fa;
          border-left: 3pt solid #e74c3c;
          border-radius: 4pt;
        }
        
        .education-degree {
          font-size: 12pt;
          font-weight: bold;
          display: inline;
          color: #2c3e50;
        }
        
        .education-institution {
          font-size: 11pt;
          color: #34495e;
          margin-top: 3pt;
        }
        
        .education-period {
          font-size: 10pt;
          font-style: italic;
          float: right;
          color: #7f8c8d;
          background-color: white;
          padding: 2pt 6pt;
          border-radius: 3pt;
        }

        .certificates-container {
          display: block;
        }
        
        .certificate-item {
          margin-bottom: 12pt;
          padding: 12pt 15pt;
          background-color: #f8f9fa;
          border-left: 3pt solid #16a085;
          border-radius: 4pt;
        }
        
        .certificate-item:last-child {
          margin-bottom: 0;
        }
        
        .certificate-name {
          font-size: 11pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 4pt;
        }
        
        .certificate-issuer {
          font-size: 10.5pt;
          color: #34495e;
          margin-bottom: 4pt;
        }
        
        .certificate-url {
          font-size: 10pt;
          color: #2980b9;
        }
        
        .certificate-url a {
          color: #2980b9;
          text-decoration: underline;
        }
        
        .skills-container {
          display: block;
        }
        
        .skill-category {
          margin-bottom: 12pt;
          padding: 10pt 15pt;
          background-color: #f8f9fa;
          border-left: 3pt solid #27ae60;
          border-radius: 4pt;
        }
        
        .skill-category h4 {
          font-size: 11pt;
          font-weight: bold;
          margin-bottom: 6pt;
          color: #2c3e50;
          display: block;
        }
        
        .skill-list {
          font-size: 11pt;
          line-height: 1.5;
        }
        
        .languages-container {
          font-size: 11pt;
          line-height: 1.6;
          padding: 10pt 15pt;
          background-color: #f8f9fa;
          border-left: 3pt solid #f39c12;
          border-radius: 4pt;
        }
        
        .language-item {
          display: inline-block;
          margin-right: 15pt;
          margin-bottom: 5pt;
        }
        
        .language-name {
          font-weight: bold;
          color: #2c3e50;
        }
        
        .language-level {
          font-style: italic;
          color: #7f8c8d;
        }
        
        .references-container {
          display: block;
        }
        
        .reference-item {
          margin-bottom: 10pt;
          padding: 8pt 15pt;
          background-color: #f8f9fa;
          border-left: 3pt solid #9b59b6;
          border-radius: 4pt;
        }
        
        .reference-item:last-child {
          margin-bottom: 0;
        }
        
        .reference-name {
          font-size: 12pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 4pt;
        }
        
        .reference-title {
          font-size: 10.5pt;
          color: #34495e;
          margin-bottom: 4pt;
          font-style: italic;
        }
        
        .reference-contact {
          font-size: 10pt;
          color: #7f8c8d;
        }
        
        /* Clear floats */
        .clearfix::after {
          content: "";
          display: table;
          clear: both;
        }
        
        @media print {
          body {
            padding: 0.5in;
            font-size: 10.5pt;
          }
          
          .header {
            margin-bottom: 20pt;
            padding-bottom: 12pt;
          }
          
          .section {
            page-break-inside: avoid;
            margin-bottom: 20pt;
          }
          
          .job, .project-item {
            page-break-inside: avoid;
            margin-bottom: 15pt;
            padding-bottom: 12pt;
          }
          
          .summary, .skill-category, .languages-container, .education-item, .certificate-item, .reference-item {
            background-color: #f8f9fa !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .job-period, .project-timeline, .education-period {
            background-color: #f0f0f0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
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
            <div>${resumeData.personalInfo.location}</div>
            <div>Phone: ${resumeData.personalInfo.phone}</div>
            <div>Email: ${resumeData.personalInfo.email}</div>
            <div>Website: ${resumeData.personalInfo.website}</div>
            <div>LinkedIn: ${resumeData.personalInfo.linkedin}</div>
            <div>GitHub: ${resumeData.personalInfo.github}</div>
          </div>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>Professional Summary</h3>
            <p class="summary">${resumeData.summary}</p>
          </div>
          
          <div class="section">
            <h3>Professional Experience</h3>
            ${workExperiences.map(job => `
              <div class="job">
                <div class="job-header clearfix">
                  <span class="job-title">${job.title}</span>, <span class="job-company">${job.company}</span>
                  <span class="job-period">${job.period}</span>
                </div>
                <div class="job-description">${job.description}</div>
                ${job.technologies && job.technologies.length > 0 ? `
                <div class="technologies">${job.technologies.join(', ')}</div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          ${projects && projects.length > 0 ? `
          <div class="section">
            <h3>Key Projects</h3>
            ${projects.map(project => `
              <div class="project-item">
                <div class="project-header clearfix">
                  <span class="project-title">${project.title}</span>
                  ${project.role ? ` - <span class="project-role">${project.role}</span>` : ''}
                  ${project.client ? ` (${project.client})` : ''}
                  ${project.timeline ? `<span class="project-timeline">${project.timeline}</span>` : ''}
                </div>
                <div class="project-description">${project.description}</div>
                ${project.outcome ? `<div class="project-description"><strong>Outcome:</strong> ${project.outcome}</div>` : ''}
                ${project.tech_stack && project.tech_stack.length > 0 ? `
                <div class="project-technologies">${project.tech_stack.join(', ')}</div>
                ` : ''}
                ${(project.repo_url || project.live_url) ? `
                <div class="project-links">
                  ${project.live_url ? `Live Demo: ${project.live_url}` : ''}
                  ${project.live_url && project.repo_url ? ' | ' : ''}
                  ${project.repo_url ? `Source Code: ${project.repo_url}` : ''}
                </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <div class="section">
            <h3>Education</h3>
            <div class="education-item clearfix">
              <span class="education-degree">${resumeData.education.degree}</span>
              <span class="education-period">${resumeData.education.period}</span>
              <div class="education-institution">${resumeData.education.institution}</div>
            </div>
          </div>
          
          <div class="section">
            <h3>Certificates</h3>
            <div class="certificates-container">
              ${resumeData.certificates.map(certificate => `
                <div class="certificate-item">
                  <div class="certificate-name">${certificate.name}</div>
                  <div class="certificate-issuer">${certificate.issuer}</div>
                  ${certificate.url ? `<div class="certificate-url"><a href="${certificate.url}">View Certificate</a></div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="section">
            <h3>Technical Skills</h3>
            <div class="skills-container">
              <div class="skill-category">
                <h4>Frontend Development:</h4>
                <span class="skill-list">${resumeData.skills.frontend.join(', ')}</span>
              </div>
              <div class="skill-category">
                <h4>Backend Development:</h4>
                <span class="skill-list">${resumeData.skills.backend.join(', ')}</span>
              </div>
              <div class="skill-category">
                <h4>Tools & Technologies:</h4>
                <span class="skill-list">${resumeData.skills.tools.join(', ')}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>Languages</h3>
            <div class="languages-container">
              ${resumeData.languages.map(language => `
                <span class="language-item">
                  <span class="language-name">${language.name}</span> 
                  (<span class="language-level">${language.level}</span>)
                </span>
              `).join('')}
            </div>
          </div>
          
          <div class="section">
            <h3>References</h3>
            <div class="references-container">
              ${resumeData.references.map(reference => `
                <div class="reference-item">
                  <div class="reference-name">${reference.name}</div>
                  <div class="reference-title">${reference.title}</div>
                  <div class="reference-contact">
                    ${reference.phone ? `Phone: ${reference.phone}` : ''}
                    ${reference.phone && reference.email ? ' | ' : ''}
                    ${reference.email ? `Email: ${reference.email}` : ''}
                  </div>
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