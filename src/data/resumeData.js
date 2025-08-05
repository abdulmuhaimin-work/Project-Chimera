import { fetchWorkExperiences } from '../services/api';

// Static data that doesn't change often
export const resumeData = {
  personalInfo: {
    name: "Abdul Muhaimin",
    title: "Full Stack Developer",
    phone: "+60135932043",
    location: "Semenyih, Malaysia",
    email: "abdulmuhaimin.work@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdul-muhaimin-md-shahid/",
    github: "https://github.com/abdulmuhaimin-work",
    gitlab: "https://gitlab.com/abdulmuhaimin-work",
    website: "https://abdulmuhaimin.my/"
  },
  
  summary: "With over 4 years of hands-on experience in  building modern, user-centric web applications, I specialize in  full-stack development with a strong focus on frontend technologies such  as React, Next.js, and Drupal. At Credence and in previous roles, I  have excelled in agile environments—delivering scalable solutions and  intuitive user experiences for clients ranging from startups to  established tech firms. I'm passionate about remote-first work cultures and believe in leveraging technology to connect, collaborate,  and innovate from anywhere in the world. Let's connect if you’re looking for a developer who’s committed to quality, efficiency, and continuous  learning.",
  
  education: {
    degree: "Bachelors Degree in Mechanical Engineering",
    institution: "Universiti Teknologi Petronas, Perak, Malaysia",
    period: "January 2009 – January 2014"
  },

  certificates: [
    {
      name: "Full Stack Web Development Bootcamp",
      issuer: "Malaysian Global Innovation & Creativity Centre (MaGIC)",
      url: null
    },
    {
      name: "Functional Programming in Erlang",
      issuer: "University of Kent",
      url: "https://www.futurelearn.com/certificates/h65gvs1"
    }
  ],
  
  skills: {
    frontend: ["React", "TypeScript", "NextJS", "TailwindCSS", "JavaScript", "HTML5/CSS3"],
    backend: ["NodeJS", "Express", "Firebase", "MongoDB", "Supabase"],
    tools: ["Git", "GitLab CI/CD", "Jenkins", "Figma"]
  },
  
  languages: [
    { name: "Bahasa Melayu", level: "Native" },
    { name: "English", level: "Proficient" }
  ],

  references: [
    {
      name: "Nasrul Muhaimin Mohd Zain",
      title: "Head of Software Engineering, Nematix",
      email: "nasminzain@gmail.com",
      phone: null
    },
    {
      name: "Syarizatul Nadia binti Rosdi", 
      title: "Product Manager, PinC Technology Sdn Bhd",
      email: "nadiarosdie@gmail.com",
      phone: "+60133935959"
    },
    {
      name: "Mohd Syafiq Zainuddin",
      title: "QA Tester, REKA INISIATIF SDN. BHD",
      email: "zainshafiq594@gmail.com",
      phone: "+60129065572"
    }
  ],
  
  // Additional data for website components
  socialLinks: [
    {
      name: "Personal Website",
      url: "https://abdulmuhaimin.my/",
      icon: "FaGlobe"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abdul-muhaimin-md-shahid/",
      icon: "FaLinkedin"
    },
    {
      name: "GitHub",
      url: "https://github.com/abdulmuhaimin-work",
      icon: "FaGithub"
    },
    {
      name: "GitLab",
      url: "https://gitlab.com/abdulmuhaimin-work",
      icon: "FaGitlab"
    }
  ]
};

// Function to fetch work experiences from API
export const fetchWorkExperiencesData = async () => {
  try {
    const workExperiences = await fetchWorkExperiences();
    return workExperiences;
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    // Return fallback data if API fails
    return [
      {
        period: "August 2024 – Present",
        title: "Consultant, Full Stack Developer",
        company: "Bestinet Sdn Bhd, Kuala Lumpur",
        description: "Developed and maintained web applications using NextJS, Typescript and TailwindCSS. Implemented integration with microservices API. Planned and implemented new features and improvements. Automated build, test and deployment of pipelines using Gitlab and Jenkins.",
        technologies: ["NextJS", "TypeScript", "TailwindCSS", "GitLab", "Jenkins"]
      },
      {
        period: "August 2023 – August 2024",
        title: "Mid-level Developer",
        company: "Nematix Sdn Bhd, Seri Kembangan",
        description: "Built responsive web applications using Typescript and React. Collaborated with designers to implement user-friendly interfaces. Developed Interactive Data Visualization dashboards using React Charts and CubeJS. Implemented GIS related features using Google Maps API and Kinetica.",
        technologies: ["React", "TypeScript", "CubeJS", "Google Maps API", "Kinetica", "Supertokens", "Supabase"]
      },
      {
        period: "September 2021 – August 2023",
        title: "Front End Developer",
        company: "REKA Inisiatif Sdn Bhd, Kuala Lumpur",
        description: "Developed and maintained web applications using ReactJS and Bootstrap. Implemented authentication and authorization using Firebase Auth. Developed and maintained RESTful APIs using Firebase Cloud Functions. Developed backend services using NodeJS and Express.",
        technologies: ["React", "Bootstrap", "Firebase", "NodeJS", "Express", "Stripe", "MongoDB"]
      },
      {
        period: "February 2020 – April 2020",
        title: "Software Developer",
        company: "Elm Lab Sdn Bhd, Beranang",
        description: "Heavily involved in the development of the landing page to onboard new users of the system. Developed the front end interface and integrated with RESTful API. Ensured deliverables and tasks were completed on time for project delivery date.",
        technologies: ["HTML", "CSS", "JavaScript", "RESTful API"]
      }
    ];
  }
}; 