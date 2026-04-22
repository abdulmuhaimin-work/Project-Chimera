import { resumeData, fetchWorkExperiencesData } from '../data/resumeData';
import { fetchProjects } from '../services/api';

// Function to fetch projects from API with retry logic
const fetchProjectsData = async (onRetry = null) => {
  try {
    const projects = await fetchProjects(onRetry);
    // Return featured projects first, then others, limited to top 4-6 projects
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

export const generateResumeHTML = async (workExperiences = null, projects = null, onRetry = null) => {
  // Fetch work experiences if not provided
  if (!workExperiences) {
    workExperiences = await fetchWorkExperiencesData(onRetry);
  }

  // Fetch projects if not provided
  if (!projects) {
    projects = await fetchProjectsData(onRetry);
  }

  const { personalInfo, summary, education, certificates, skills, languages, references } = resumeData;

  const contactParts = [
    personalInfo.location ? { label: 'Location', value: personalInfo.location } : null,
    personalInfo.phone ? { label: 'Phone', value: personalInfo.phone } : null,
    personalInfo.email ? { label: 'Email', value: personalInfo.email } : null,
    personalInfo.website ? { label: 'Website', value: personalInfo.website } : null,
    personalInfo.linkedin ? { label: 'LinkedIn', value: personalInfo.linkedin } : null,
    personalInfo.github ? { label: 'GitHub', value: personalInfo.github } : null,
  ].filter(Boolean);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${personalInfo.name} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Calibri', 'Arial', 'Helvetica', sans-serif;
          line-height: 1.4;
          color: #222;
          background: #fff;
          padding: 0.6in 0.7in;
          font-size: 10.5pt;
          max-width: 8.5in;
          margin: 0 auto;
        }

        a { color: inherit; text-decoration: none; }

        .header {
          margin-bottom: 10pt;
          padding-bottom: 6pt;
          border-bottom: 1pt solid #222;
        }
        .header h1 {
          font-size: 20pt;
          font-weight: bold;
          letter-spacing: 0.5pt;
          color: #111;
        }
        .header h2 {
          font-size: 11.5pt;
          font-weight: normal;
          color: #444;
          margin-top: 2pt;
        }
        .contact-info {
          font-size: 9.5pt;
          color: #333;
          margin-top: 4pt;
          line-height: 1.5;
        }
        .contact-info div {
          margin-bottom: 1pt;
        }

        .section { margin-top: 12pt; }
        .section h3 {
          font-size: 11pt;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.75pt;
          color: #111;
          border-bottom: 0.75pt solid #999;
          padding-bottom: 2pt;
          margin-bottom: 6pt;
        }

        .summary {
          font-size: 10.5pt;
          line-height: 1.45;
          text-align: justify;
        }

        .entry { margin-bottom: 12pt; }
        .entry:last-child { margin-bottom: 0; }
        .entry-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8pt;
          margin-bottom: 3pt;
        }
        .entry-title {
          font-size: 10.75pt;
          font-weight: bold;
          color: #111;
        }
        .entry-sub {
          font-size: 10.5pt;
          color: #333;
          margin-bottom: 3pt;
        }
        .entry-date {
          font-size: 9.75pt;
          color: #555;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .entry-body {
          font-size: 10.25pt;
          line-height: 1.45;
        }
        .entry-body p { margin: 2pt 0; }
        .entry-body ul {
          margin: 2pt 0 2pt 16pt;
          padding: 0;
        }
        .entry-body li { margin-bottom: 1.5pt; }

        .meta {
          font-size: 9.75pt;
          color: #444;
          margin-top: 4pt;
        }
        .meta .label {
          font-weight: bold;
          color: #222;
        }

        .links {
          font-size: 9.75pt;
          color: #333;
          margin-top: 4pt;
          word-break: break-all;
        }

        .skill-row {
          font-size: 10.25pt;
          line-height: 1.5;
          margin-bottom: 4pt;
        }
        .skill-row .label {
          font-weight: bold;
          color: #111;
        }

        .inline-list {
          font-size: 10.25pt;
          line-height: 1.5;
        }
        .inline-list .item + .item::before {
          content: " • ";
          color: #888;
        }

        .ref-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10pt 20pt;
          font-size: 10pt;
          line-height: 1.4;
        }
        .ref-item .ref-name { font-weight: bold; color: #111; }
        .ref-item .ref-title { color: #444; }
        .ref-item .ref-contact { color: #555; font-size: 9.75pt; }

        .cert-item {
          font-size: 10.25pt;
          color: #333;
          margin-bottom: 5pt;
          line-height: 1.45;
        }
        .cert-item:last-child { margin-bottom: 0; }

        @media print {
          body {
            padding: 0.4in 0.5in;
            font-size: 10pt;
          }
          .section { page-break-inside: avoid; }
          .entry { page-break-inside: avoid; }
          a { color: inherit; }
        }
      </style>
    </head>
    <body>
      <header class="header">
        <h1>${personalInfo.name}</h1>
        <h2>${personalInfo.title}</h2>
        <div class="contact-info">
          ${contactParts.map(part => `<div><strong>${part.label}:</strong> ${part.value}</div>`).join('')}
        </div>
      </header>

      <section class="section">
        <h3>Summary</h3>
        <p class="summary">${summary}</p>
      </section>

      <section class="section">
        <h3>Experience</h3>
        ${workExperiences.map(job => `
          <div class="entry">
            <div class="entry-head">
              <div class="entry-title">${job.title} — ${job.company}</div>
              <div class="entry-date">${job.period}</div>
            </div>
            <div class="entry-body">${job.description}</div>
            ${job.technologies && job.technologies.length > 0 ? `
              <div class="meta"><span class="label">Tech:</span> ${job.technologies.join(', ')}</div>
            ` : ''}
          </div>
        `).join('')}
      </section>

      ${projects && projects.length > 0 ? `
      <section class="section">
        <h3>Key Projects</h3>
        ${projects.map(project => {
          const subParts = [project.role, project.client].filter(Boolean).join(' • ');
          const linkParts = [
            project.live_url ? `Live: ${project.live_url}` : null,
            project.repo_url ? `Repo: ${project.repo_url}` : null,
          ].filter(Boolean).join('   ');
          return `
            <div class="entry">
              <div class="entry-head">
                <div class="entry-title">${project.title}</div>
                ${project.timeline ? `<div class="entry-date">${project.timeline}</div>` : ''}
              </div>
              ${subParts ? `<div class="entry-sub">${subParts}</div>` : ''}
              <div class="entry-body">${project.description}</div>
              ${project.outcome ? `<div class="entry-body"><strong>Outcome:</strong> ${project.outcome}</div>` : ''}
              ${project.tech_stack && project.tech_stack.length > 0 ? `
                <div class="meta"><span class="label">Tech:</span> ${project.tech_stack.join(', ')}</div>
              ` : ''}
              ${linkParts ? `<div class="links">${linkParts}</div>` : ''}
            </div>
          `;
        }).join('')}
      </section>
      ` : ''}

      <section class="section">
        <h3>Education</h3>
        <div class="entry">
          <div class="entry-head">
            <div class="entry-title">${education.degree}</div>
            <div class="entry-date">${education.period}</div>
          </div>
          <div class="entry-sub">${education.institution}</div>
        </div>
      </section>

      ${certificates && certificates.length > 0 ? `
      <section class="section">
        <h3>Certifications</h3>
        ${certificates.map(cert => `
          <div class="cert-item">
            <strong>${cert.name}</strong> — ${cert.issuer}${cert.url ? ` — <a href="${cert.url}">${cert.url}</a>` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}

      <section class="section">
        <h3>Technical Skills</h3>
        <div class="skill-row"><span class="label">Frontend:</span> ${skills.frontend.join(', ')}</div>
        <div class="skill-row"><span class="label">Backend:</span> ${skills.backend.join(', ')}</div>
        <div class="skill-row"><span class="label">Tools:</span> ${skills.tools.join(', ')}</div>
      </section>

      <section class="section">
        <h3>Languages</h3>
        <div class="inline-list">
          ${languages.map(lang => `<span class="item"><strong>${lang.name}</strong> (${lang.level})</span>`).join('')}
        </div>
      </section>

      ${references && references.length > 0 ? `
      <section class="section">
        <h3>References</h3>
        <div class="ref-grid">
          ${references.map(ref => {
            const contactLine = [
              ref.email ? ref.email : null,
              ref.phone ? ref.phone : null,
            ].filter(Boolean).join(' • ');
            return `
              <div class="ref-item">
                <div class="ref-name">${ref.name}</div>
                <div class="ref-title">${ref.title}</div>
                ${contactLine ? `<div class="ref-contact">${contactLine}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
      ` : ''}
    </body>
    </html>
  `;
};

export const openResumeWindow = async () => {
  const resumeWindow = window.open('', '_blank', 'width=800,height=600');

  // Function to update loading message in the resume window
  const updateLoadingMessage = (message, subMessage = '') => {
    resumeWindow.document.open();
    resumeWindow.document.write(`
      <html>
        <head><title>Generating Resume...</title></head>
        <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center; background-color: #f5f5f5;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="display: inline-block; width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <h2 style="color: #333; margin: 20px 0 10px 0;">${message}</h2>
            ${subMessage ? `<p style="color: #666; font-size: 14px; line-height: 1.6;">${subMessage}</p>` : ''}
          </div>
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </body>
      </html>
    `);
    resumeWindow.document.close();
  };

  // Show initial loading message
  updateLoadingMessage(
    'Generating Resume...',
    'Please wait while we fetch your latest work experience and project data.'
  );

  try {
    // Create retry callback to update the window
    const onRetry = (attempt, maxRetries) => {
      if (attempt === 1) {
        updateLoadingMessage(
          'Server is waking up...',
          'The backend server is starting up. This may take up to 30 seconds. Please be patient.'
        );
      } else {
        updateLoadingMessage(
          'Retrying...',
          `Attempt ${attempt} of ${maxRetries}. The server may need a moment to respond.`
        );
      }
    };

    const resumeHTML = await generateResumeHTML(null, null, onRetry);

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
        <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center; background-color: #f5f5f5;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #e74c3c; margin-bottom: 20px;">❌ Error Generating Resume</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              Sorry, there was an error generating your resume. The server may be temporarily unavailable.
            </p>
            <p style="color: #999; font-size: 14px; background: #f9f9f9; padding: 15px; border-radius: 4px; word-wrap: break-word;">
              Error: ${error.message}
            </p>
            <button 
              onclick="window.location.reload()" 
              style="margin-top: 20px; padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;"
            >
              Try Again
            </button>
          </div>
        </body>
      </html>
    `);
    resumeWindow.document.close();
  }
};
