const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Kuala Lumpur",
    description: "Develop UI components and user-facing features using modern JavaScript frameworks.",
    requirements: "HTML, CSS, JavaScript\nReact or Vue experience\nGit and version control\nResponsive design skills",
    qualifications: "Bachelor's degree in Computer Science or related field\n1+ year experience in frontend development",
    appliedCount: 25,
    applicants: [
      {
        name: "Alice Tan",
        skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
        education: "BSc Computer Science, University of Malaya",
        pastExperience: [
          { title: "Frontend Developer", company: "StartupX", location: "Kuala Lumpur", startDate: "Jan 2023", endDate: "Dec 2023" },
          { title: "Web Intern", company: "Innovatech", location: "Petaling Jaya", startDate: "May 2022", endDate: "Aug 2022" },
          { title: "Junior UI Developer", company: "PixelSoft", location: "Cyberjaya", startDate: "Feb 2021", endDate: "Dec 2021" }
        ],
        fitPercentage: 92
      },
      {
        name: "Daniel Wong",
        skills: ["Vue", "JavaScript", "CSS", "Responsive Design"],
        education: "Diploma in Information Technology, UTAR",
        pastExperience: [
          { title: "Frontend Intern", company: "TechSolutions", location: "Shah Alam", startDate: "Mar 2023", endDate: "Aug 2023" },
          { title: "Web Developer Trainee", company: "Buildify", location: "Puchong", startDate: "Sep 2022", endDate: "Feb 2023" },
          { title: "Assistant Web Designer", company: "MediaHub", location: "Klang", startDate: "Jan 2022", endDate: "Jul 2022" }
        ],
        fitPercentage: 80
      },
      {
        name: "Jason Tan",
        skills: ["Angular", "TypeScript", "SCSS", "Figma"],
        education: "BSc in Computer Science, Sunway University",
        pastExperience: [
          { title: "Frontend Developer", company: "AppInnovate", location: "Kuala Lumpur", startDate: "Mar 2023", endDate: "Mar 2024" },
          { title: "Software Intern", company: "NetSoft", location: "Subang Jaya", startDate: "Jun 2022", endDate: "Nov 2022" },
          { title: "UI/UX Assistant", company: "FlowTech", location: "Petaling Jaya", startDate: "Feb 2021", endDate: "May 2022" }
        ],
        fitPercentage: 75
      }
    ]
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "CloudNet",
    location: "Penang",
    description: "Design and maintain server-side logic and APIs.",
    requirements: "Node.js or Python\nDatabase knowledge (SQL, MongoDB)\nRESTful API design\nDocker basics",
    qualifications: "Bachelor’s in Software Engineering or related field\nExperience with server-side development",
    appliedCount: 18,
    applicants: [
      {
        name: "Siti Nur",
        skills: ["Node.js", "Python", "SQL", "Docker"],
        education: "BSc Software Engineering, USM",
        pastExperience: [
          { title: "Backend Developer", company: "CloudWare", location: "Penang", startDate: "Feb 2022", endDate: "Feb 2024" },
          { title: "Software Engineer Intern", company: "BlueSky Tech", location: "George Town", startDate: "Jun 2021", endDate: "Dec 2021" },
          { title: "System Analyst Assistant", company: "InfoSys Malaysia", location: "Penang", startDate: "Jan 2020", endDate: "May 2021" }
        ],
        fitPercentage: 90
      },
      {
        name: "Raymond Chia",
        skills: ["Node.js", "Express", "MongoDB", "Git"],
        education: "BSc Information Technology, Wawasan Open University",
        pastExperience: [
          { title: "Backend Intern", company: "DevCore", location: "Penang", startDate: "Jul 2022", endDate: "Jan 2023" },
          { title: "Junior Software Engineer", company: "DataFlex", location: "Butterworth", startDate: "Feb 2023", endDate: "Dec 2023" },
          { title: "Technical Assistant", company: "TechAid", location: "Penang", startDate: "Aug 2021", endDate: "Jun 2022" }
        ],
        fitPercentage: 83
      },
      {
        name: "Nur Amira Zain",
        skills: ["Python", "Django", "SQL", "Docker"],
        education: "Bachelor's in Computer Science, UiTM",
        pastExperience: [
          { title: "Backend Developer", company: "CodeBuild", location: "Penang", startDate: "Jan 2023", endDate: "Present" },
          { title: "Intern Software Engineer", company: "GreenTech", location: "Bayan Lepas", startDate: "Jul 2021", endDate: "Dec 2021" },
          { title: "Support Developer", company: "SoftLink", location: "Ipoh", startDate: "Jan 2022", endDate: "Dec 2022" }
        ],
        fitPercentage: 87
      }
    ]
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Designify",
    location: "Remote",
    description: "Design intuitive interfaces and improve user flows.",
    requirements: "Figma or Adobe XD\nWireframing & prototyping\nUX research skills\nPortfolio of past work",
    qualifications: "Diploma or Bachelor's in Design or related\nProven experience with UI/UX projects",
    appliedCount: 33,
    applicants: [
      {
        name: "Rachel Lim",
        skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
        education: "Diploma in Graphic Design, Taylor’s University",
        pastExperience: [
          { title: "UI/UX Designer", company: "Creativa Studio", location: "Remote", startDate: "Jan 2023", endDate: "Present" },
          { title: "Graphic Designer", company: "Artistic Edge", location: "Kuala Lumpur", startDate: "Jun 2021", endDate: "Dec 2022" },
          { title: "Design Intern", company: "VisualLabs", location: "Remote", startDate: "Mar 2020", endDate: "May 2021" }
        ],
        fitPercentage: 88
      },
      {
        name: "Hannah Chong",
        skills: ["Sketch", "UX Research", "Adobe XD", "Figma"],
        education: "Bachelor's in Interactive Design, MMU",
        pastExperience: [
          { title: "Product Designer", company: "UXFoundry", location: "Remote", startDate: "Feb 2023", endDate: "Present" },
          { title: "UX Intern", company: "ThinkSoft", location: "KL", startDate: "Aug 2022", endDate: "Jan 2023" },
          { title: "Junior Visual Designer", company: "Zenspace", location: "Cyberjaya", startDate: "Jan 2021", endDate: "Jul 2022" }
        ],
        fitPercentage: 85
      },
      {
        name: "Lee Jia Wei",
        skills: ["Figma", "User Flows", "Prototyping", "Usability Testing"],
        education: "BDes in Communication Design, The One Academy",
        pastExperience: [
          { title: "UI Designer", company: "FreshIdeas", location: "KL", startDate: "Jan 2023", endDate: "Present" },
          { title: "Graphic Designer", company: "CreativeMerge", location: "Remote", startDate: "Jul 2021", endDate: "Dec 2022" },
          { title: "Design Intern", company: "StudioBold", location: "PJ", startDate: "Jan 2021", endDate: "Jun 2021" }
        ],
        fitPercentage: 86
      }
    ]
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "DataVision",
    location: "Selangor",
    description: "Analyze business data to provide actionable insights.",
    requirements: "Excel and Google Sheets\nSQL\nPower BI or Tableau\nStrong analytical skills",
    qualifications: "Bachelor's in Data Science, Statistics, or related field\nStrong numerical background",
    appliedCount: 12,
    applicants: [
      {
        name: "Lim Wei Jin",
        skills: ["Excel", "SQL", "Power BI", "Data Visualization"],
        education: "BSc Statistics, UKM",
        pastExperience: [
          { title: "Data Analyst", company: "RetailCorp", location: "Petaling Jaya", startDate: "Jan 2021", endDate: "Dec 2023" },
          { title: "Junior Analyst", company: "Analytica", location: "Subang Jaya", startDate: "Mar 2020", endDate: "Dec 2020" },
          { title: "Research Assistant", company: "UKM Statistics Dept", location: "Bangi", startDate: "Jan 2019", endDate: "Feb 2020" }
        ],
        fitPercentage: 93
      },
      {
        name: "Chong Mei Lin",
        skills: ["SQL", "Excel", "Tableau", "Google Sheets"],
        education: "Bachelor's in Data Science, Monash University Malaysia",
        pastExperience: [
          { title: "Data Analyst", company: "FinanceAnalytics", location: "KL", startDate: "Feb 2022", endDate: "Present" },
          { title: "Intern Data Analyst", company: "SmartRetail", location: "KL", startDate: "Aug 2021", endDate: "Jan 2022" },
          { title: "Research Intern", company: "MyStatsLab", location: "PJ", startDate: "Jan 2021", endDate: "Jul 2021" }
        ],
        fitPercentage: 88
      },
      {
        name: "Rajiv Menon",
        skills: ["Power BI", "SQL", "Data Cleaning", "Excel"],
        education: "BSc in Applied Statistics, UiTM",
        pastExperience: [
          { title: "Data Associate", company: "Insightify", location: "Shah Alam", startDate: "Jan 2023", endDate: "Present" },
          { title: "Junior Data Analyst", company: "QuantX", location: "KL", startDate: "Mar 2022", endDate: "Dec 2022" },
          { title: "Reporting Intern", company: "TrendLogic", location: "Subang", startDate: "Jul 2021", endDate: "Feb 2022" }
        ],
        fitPercentage: 84
      }
    ]
  },
  {
    id: "5",
    title: "Marketing Executive",
    company: "MarketLeap",
    location: "Kota Kinabalu",
    description: "Plan and execute digital marketing campaigns.",
    requirements: "SEO & SEM knowledge\nSocial media advertising\nContent creation\nAnalytics tools (Google Analytics, Meta)",
    qualifications: "Degree in Marketing or Business\nAt least 1 year of digital marketing experience",
    appliedCount: 20,
    applicants: [
      {
        name: "Zara Ibrahim",
        skills: ["SEO", "SEM", "Content Creation", "Google Analytics"],
        education: "BBA Marketing, UPM",
        pastExperience: [
          { title: "Digital Marketer", company: "AdWave Agency", location: "Kota Kinabalu", startDate: "Feb 2022", endDate: "Feb 2024" },
          { title: "Marketing Assistant", company: "EcomPro", location: "KK", startDate: "Jul 2020", endDate: "Jan 2022" },
          { title: "Content Writer", company: "DigitalSpark", location: "Remote", startDate: "Jan 2019", endDate: "Jun 2020" }
        ],
        fitPercentage: 90
      },
      {
        name: "Tan Wei Ning",
        skills: ["Social Media", "SEO", "Google Ads", "Meta Suite"],
        education: "Bachelor's in Business Marketing, Taylor’s University",
        pastExperience: [
          { title: "Marketing Executive", company: "BrandHive", location: "KK", startDate: "Feb 2023", endDate: "Present" },
          { title: "Intern Digital Marketer", company: "GoPromo", location: "KK", startDate: "Jul 2022", endDate: "Jan 2023" },
          { title: "Marketing Assistant", company: "NextReach", location: "Remote", startDate: "Feb 2021", endDate: "Jun 2022" }
        ],
        fitPercentage: 86
      },
      {
        name: "Aiman Azmi",
        skills: ["SEM", "Facebook Ads", "Analytics", "Content Creation"],
        education: "Degree in Mass Communication, USM",
        pastExperience: [
          { title: "Digital Campaign Lead", company: "Engage360", location: "Kota Kinabalu", startDate: "Mar 2022", endDate: "Present" },
          { title: "Content Marketer", company: "BuzzAsia", location: "Remote", startDate: "Jun 2021", endDate: "Feb 2022" },
          { title: "SEO Intern", company: "ClickMaven", location: "KL", startDate: "Jan 2020", endDate: "May 2021" }
        ],
        fitPercentage: 84
      }
    ]
  },
  {
  id: "6",
  title: "Mobile App Developer",
  company: "AppWorks",
  location: "Johor Bahru",
  description: "Develop and maintain Android and iOS applications.",
  requirements: "Flutter or React Native\nRESTful APIs\nMobile UI design\nGit",
  qualifications: "Bachelor's in Computer Science or related field\n1+ year mobile development experience",
  appliedCount: 16,
  applicants: [
    {
      name: "Farah Zulkifli",
      skills: ["Flutter", "Dart", "Firebase", "Git"],
      education: "BSc Computer Science, UTM",
      pastExperience: [
        { title: "Mobile App Developer", company: "QuickApp", location: "JB", startDate: "Mar 2022", endDate: "Present" },
        { title: "Software Intern", company: "TechnoJet", location: "Johor Bahru", startDate: "Jul 2021", endDate: "Dec 2021" },
        { title: "Junior Mobile Developer", company: "MobilityOne", location: "JB", startDate: "Jan 2021", endDate: "Jun 2021" }
      ],
      fitPercentage: 89
    },
    {
      name: "Lim Khai Jun",
      skills: ["React Native", "JavaScript", "REST API", "Redux"],
      education: "Diploma in IT, Politeknik Ibrahim Sultan",
      pastExperience: [
        { title: "Mobile Developer", company: "CodeBeez", location: "Johor Bahru", startDate: "Jan 2023", endDate: "Present" },
        { title: "App Developer Intern", company: "GoApp", location: "JB", startDate: "Aug 2022", endDate: "Dec 2022" },
        { title: "Software Trainee", company: "SmartNet", location: "Skudai", startDate: "Jan 2022", endDate: "Jul 2022" }
      ],
      fitPercentage: 81
    },
    {
      name: "Nurul Afiqah",
      skills: ["Flutter", "Mobile UI", "Dart", "REST APIs"],
      education: "BSc Software Engineering, UTHM",
      pastExperience: [
        { title: "Mobile Developer", company: "ByteFlow", location: "Batu Pahat", startDate: "Feb 2022", endDate: "Feb 2024" },
        { title: "Intern App Developer", company: "Appify", location: "JB", startDate: "Jun 2021", endDate: "Jan 2022" },
        { title: "Junior Frontend Developer", company: "CodeHouse", location: "Muar", startDate: "Jan 2020", endDate: "May 2021" }
      ],
      fitPercentage: 85
    }
  ]
},
{
  id: "7",
  title: "Project Manager",
  company: "BuildRight",
  location: "Kuala Lumpur",
  description: "Manage project timelines, teams, and deliverables.",
  requirements: "Project planning tools (Jira, Trello)\nTeam management\nClient communication\nRisk management",
  qualifications: "Degree in Business, IT, or related\nExperience managing technical projects",
  appliedCount: 14,
  applicants: [
    {
      name: "Mohd Hafiz",
      skills: ["Jira", "Agile", "Scrum", "Risk Management"],
      education: "BBA in Management, UM",
      pastExperience: [
        { title: "Project Manager", company: "DevBridge", location: "KL", startDate: "Jan 2022", endDate: "Present" },
        { title: "Team Lead", company: "MegaTech", location: "KL", startDate: "Mar 2020", endDate: "Dec 2021" },
        { title: "Project Coordinator", company: "SwiftSolutions", location: "Putrajaya", startDate: "Jan 2019", endDate: "Feb 2020" }
      ],
      fitPercentage: 88
    },
    {
      name: "Carmen Low",
      skills: ["Trello", "Leadership", "Scrum", "Team Communication"],
      education: "Bachelor in IT Management, MMU",
      pastExperience: [
        { title: "Assistant Project Manager", company: "FutureSoft", location: "KL", startDate: "Feb 2023", endDate: "Present" },
        { title: "Project Intern", company: "SoftLink", location: "Cyberjaya", startDate: "Aug 2022", endDate: "Jan 2023" },
        { title: "Technical Coordinator", company: "NetFusion", location: "KL", startDate: "Jun 2021", endDate: "Jul 2022" }
      ],
      fitPercentage: 80
    },
    {
      name: "Tan Sri Yee",
      skills: ["Gantt Charts", "Agile", "MS Project", "Communication"],
      education: "Degree in Business Technology, UUM",
      pastExperience: [
        { title: "Project Planner", company: "PlanScope", location: "KL", startDate: "Jan 2022", endDate: "Present" },
        { title: "Junior Project Coordinator", company: "BlueSphere", location: "KL", startDate: "May 2020", endDate: "Dec 2021" },
        { title: "Intern", company: "Workflowz", location: "KL", startDate: "Jul 2019", endDate: "Apr 2020" }
      ],
      fitPercentage: 84
    }
  ]
},
{
  id: "8",
  title: "Cybersecurity Analyst",
  company: "SecureNet",
  location: "Cyberjaya",
  description: "Monitor and secure network infrastructure.",
  requirements: "Firewall and network monitoring\nSIEM tools\nPenetration testing\nIncident response",
  qualifications: "Bachelor’s in Cybersecurity, IT, or equivalent\nRelevant certifications (e.g., CompTIA Security+)",
  appliedCount: 10,
  applicants: [
    {
      name: "Muhammad Azrul",
      skills: ["Firewalls", "SIEM", "PenTesting", "Incident Response"],
      education: "BSc Cybersecurity, UNITEN",
      pastExperience: [
        { title: "Cybersecurity Analyst", company: "GuardTech", location: "Cyberjaya", startDate: "Mar 2022", endDate: "Present" },
        { title: "Security Intern", company: "DataSafe", location: "Putrajaya", startDate: "Jul 2021", endDate: "Feb 2022" },
        { title: "Network Assistant", company: "CyberShield", location: "KL", startDate: "Jan 2020", endDate: "Jun 2021" }
      ],
      fitPercentage: 91
    },
    {
      name: "Chong Yong Li",
      skills: ["SIEM", "Snort", "Ethical Hacking", "Nmap"],
      education: "BSc Network Security, APU",
      pastExperience: [
        { title: "Security Analyst", company: "NetSec", location: "Cyberjaya", startDate: "Feb 2023", endDate: "Present" },
        { title: "Cybersecurity Intern", company: "Defensia", location: "KL", startDate: "Aug 2022", endDate: "Jan 2023" },
        { title: "PenTest Assistant", company: "HackLab", location: "Cyberjaya", startDate: "Feb 2021", endDate: "Jul 2022" }
      ],
      fitPercentage: 86
    },
    {
      name: "Amirah Bakar",
      skills: ["Firewall", "Incident Response", "Security Audits", "Linux"],
      education: "BSc Computer Security, UiTM",
      pastExperience: [
        { title: "Security Associate", company: "InfoSecPlus", location: "KL", startDate: "Jan 2023", endDate: "Present" },
        { title: "IT Security Intern", company: "ProSecure", location: "Cyberjaya", startDate: "May 2022", endDate: "Dec 2022" },
        { title: "Helpdesk Support", company: "NetTrack", location: "Seri Kembangan", startDate: "Jan 2021", endDate: "Apr 2022" }
      ],
      fitPercentage: 84
    }
  ]
},
{
  id: "9",
  title: "Cloud Engineer",
  company: "SkySystems",
  location: "Putrajaya",
  description: "Manage and optimize cloud infrastructure services.",
  requirements: "AWS or Azure experience\nLinux systems\nDevOps tools (Terraform, Ansible)\nCloud security",
  qualifications: "Bachelor's in Computer Engineering or IT\n1+ year cloud experience",
  appliedCount: 11,
  applicants: [
    {
      name: "Haziq Rahman",
      skills: ["AWS", "Terraform", "Linux", "DevOps"],
      education: "BEng Computer Engineering, UKM",
      pastExperience: [
        { title: "Cloud Engineer", company: "CloudNova", location: "Putrajaya", startDate: "Jan 2022", endDate: "Present" },
        { title: "System Administrator", company: "InfraX", location: "Putrajaya", startDate: "Jul 2020", endDate: "Dec 2021" },
        { title: "DevOps Intern", company: "CloudSmart", location: "KL", startDate: "Jan 2020", endDate: "Jun 2020" }
      ],
      fitPercentage: 87
    },
    {
      name: "Evelyn Toh",
      skills: ["Azure", "Kubernetes", "CI/CD", "Shell Scripting"],
      education: "Bachelor of IT, MMU",
      pastExperience: [
        { title: "Cloud Support Engineer", company: "SkyNet Malaysia", location: "Putrajaya", startDate: "Feb 2023", endDate: "Present" },
        { title: "Intern Cloud Engineer", company: "MS Cloud Tech", location: "Cyberjaya", startDate: "Jul 2022", endDate: "Jan 2023" },
        { title: "Linux Admin Intern", company: "OpsFusion", location: "Serdang", startDate: "Jan 2022", endDate: "Jun 2022" }
      ],
      fitPercentage: 82
    },
    {
      name: "Tan Jia Yi",
      skills: ["AWS", "DevOps", "Ansible", "Monitoring"],
      education: "BSc Computer Science, UPM",
      pastExperience: [
        { title: "Junior Cloud Engineer", company: "ComputeX", location: "Putrajaya", startDate: "Jan 2023", endDate: "Present" },
        { title: "Intern Infrastructure Engineer", company: "CloudEdge", location: "KL", startDate: "Aug 2021", endDate: "Dec 2022" },
        { title: "DevOps Assistant", company: "ServerLane", location: "KL", startDate: "Jan 2020", endDate: "Jul 2021" }
      ],
      fitPercentage: 85
    }
  ]
},
{
  id: "10",
  title: "DevOps Engineer",
  company: "OpsGenix",
  location: "Kuala Lumpur",
  description: "Automate CI/CD pipelines and manage infrastructure as code.",
  requirements: "CI/CD (Jenkins, GitHub Actions)\nDocker & Kubernetes\nInfrastructure as code\nMonitoring tools",
  qualifications: "Bachelor’s in Computer Science or related\n2+ years DevOps experience preferred",
  appliedCount: 13,
  applicants: [
    {
      name: "Arif Zain",
      skills: ["Docker", "Kubernetes", "Jenkins", "Terraform"],
      education: "BSc Computer Science, UTM",
      pastExperience: [
        { title: "DevOps Engineer", company: "Infrabot", location: "KL", startDate: "Feb 2022", endDate: "Present" },
        { title: "Build Engineer", company: "SysAdminPro", location: "KL", startDate: "Jun 2020", endDate: "Jan 2022" },
        { title: "DevOps Intern", company: "CloudBase", location: "Cyberjaya", startDate: "Jan 2020", endDate: "May 2020" }
      ],
      fitPercentage: 92
    },
    {
      name: "Yee Mei Shan",
      skills: ["CI/CD", "GitHub Actions", "Prometheus", "Docker"],
      education: "Bachelor of Information Systems, MMU",
      pastExperience: [
        { title: "DevOps Support", company: "DeployHub", location: "KL", startDate: "Mar 2022", endDate: "Present" },
        { title: "Automation Intern", company: "AutoScale", location: "Cyberjaya", startDate: "Jul 2021", endDate: "Feb 2022" },
        { title: "System Monitoring Assistant", company: "InfraLite", location: "KL", startDate: "Jan 2020", endDate: "Jun 2021" }
      ],
      fitPercentage: 86
    },
    {
      name: "Ravi Kumar",
      skills: ["Ansible", "Jenkins", "Monitoring", "Cloud Deployment"],
      education: "BSc in Network & Security, INTI",
      pastExperience: [
        { title: "DevOps Specialist", company: "RapidDeploy", location: "KL", startDate: "Jan 2023", endDate: "Present" },
        { title: "Infrastructure Intern", company: "CodeOps", location: "KL", startDate: "Jul 2021", endDate: "Dec 2022" },
        { title: "Junior Cloud Admin", company: "SystemTrail", location: "KL", startDate: "Jan 2020", endDate: "Jun 2021" }
      ],
      fitPercentage: 84
    }
  ]
}
];

// Load candidates for a specific job
function loadCandidates(jobCode) {
    fetch(`/api/get_candidates/${jobCode}`)
        .then(response => response.json())
        .then(candidates => {
            const dropdown = document.getElementById(`candidates-${jobCode}`);
            dropdown.innerHTML = '<option value="">Select a candidate to view</option>';

            candidates.forEach(candidate => {
                const option = document.createElement('option');
                option.value = candidate.key;
                option.textContent = candidate.display;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading candidates:', error);
            alert('Error loading candidates');
        });
}

// View candidate details
function viewCandidate(jobCode, candidateKey) {
    if (!candidateKey) {
        document.getElementById(`candidate-details-${jobCode}`).style.display = 'none';
        return;
    }

    fetch(`/api/get_candidate_details/${candidateKey}`)
        .then(response => response.json())
        .then(candidate => {
            const detailsDiv = document.getElementById(`candidate-details-${jobCode}`);

            detailsDiv.innerHTML = `
                <h4>${candidate.name || 'Unknown'}</h4>
                <p><strong>Email:</strong> ${candidate.email || 'N/A'}</p>
                <p><strong>Phone:</strong> ${candidate.phone || 'N/A'}</p>
                <p><strong>Location:</strong> ${candidate.location || 'N/A'}</p>
                <p><strong>Skills:</strong> ${candidate.skills || 'N/A'}</p>
                <p><strong>Education:</strong> ${candidate.education || 'N/A'}</p>
                <p><strong>Experience:</strong> ${candidate.experience || 'N/A'}</p>
                <p><strong>Summary:</strong> ${candidate['quick summary'] || 'N/A'}</p>
                <p><strong>Rating:</strong> ${candidate.rating || 'N/A'}</p>

                ${candidate['Rejection or Acceptance Letter'] ?
                    `<div class="letter-section">
                        <h5>Assessment Letter:</h5>
                        <p>${candidate['Rejection or Acceptance Letter']}</p>
                    </div>` : ''}
            `;

            detailsDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error loading candidate details:', error);
            alert('Error loading candidate details');
        });
}

// Show/hide add job form
document.addEventListener('DOMContentLoaded', function() {
    const showFormBtn = document.getElementById('showFormBtn');
    const addJobForm = document.getElementById('addJobForm');

    if (showFormBtn && addJobForm) {
        showFormBtn.addEventListener('click', function() {
            addJobForm.style.display = addJobForm.style.display === 'none' ? 'block' : 'none';
        });
    }
});
