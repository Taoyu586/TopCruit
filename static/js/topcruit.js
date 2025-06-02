// Helper
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


//Mobile Menu Toggle
  const toggleMenu = () => {
    document.getElementById("mobileMenu").classList.toggle("show");
  };

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
const jobList = document.getElementById("job-list");
if (jobList) {
  jobList.classList.add("job_list"); 

  jobs.forEach(job => {
    const jobLink = document.createElement("a");
    jobLink.href = `job_detail.html?id=${job.id}`;
    jobLink.style.textDecoration = "none";
    jobLink.style.color = "black";

    const jobCard = document.createElement("div");
    jobCard.className = "job_listing";

    const jobDesc = document.createElement("div");
    jobDesc.className = "job_description";
    jobDesc.innerHTML = `
      <h2>${job.title}</h2>
      <h4>Requirement:</h4>
      <ul>
        ${job.requirements
          .split('\n') 
          .map(req => `<li>${req}</li>`)
          .join('')}
      </ul>
    `;

    const jobApplied = document.createElement("div");
    jobApplied.className = "job_applied";
    const appliedCount = job.appliedCount || Math.floor(Math.random() * 30 + 1); 
    jobApplied.innerHTML = `
      <h1>${appliedCount}</h1>
      <h2>applied</h2>
    `;

    jobCard.appendChild(jobDesc);
    jobCard.appendChild(jobApplied);
    jobLink.appendChild(jobCard);
    jobList.appendChild(jobLink);
  });
}

  //Display Job Details in Job Details
const jobDetails = document.getElementById("job_details");
if (jobDetails) {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get("id");

  if (jobId && Array.isArray(jobs)) {
    const job = jobs.find(j => j.id === jobId);

    if (job) {
      jobDetails.innerHTML = `
<div class="jobDetail"> 
  <div class="jobDetail_content">
    <div class="jobDetail_title">
      <h1>${job.title}</h1>
    </div>
    <div class="jobDetail_info">
      <div class="job-section">
        <h3>Company:</h3>
        <p>${job.company}</p>
      </div>

      <div class="job-section">
        <h3>Description:</h3>
        <p>${job.description}</p>
      </div>

      <div class="job-section">
        <h3>Requirements:</h3>
        <ul>
          ${job.requirements.split('\n').map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div class="job-section">
        <h3>Qualifications:</h3>
        <ul>
          ${job.qualifications.split('\n').map(q => `<li>${q}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  <div class="jobDetail_panel">
    <div class="jobDetail_header">
      <p class="applied_display">
        <strong><span class="applied_count">${job.appliedCount}</span></strong>
        <span class="applied_label">applied</span>
      </p>
      <div class="jobDetail_buttons">
        <a href="analytics.html"><button class="btn_secondary">Analytics</button></a>
        <button class="btn_primary">Report</button>
        <button class="btn_primary">Send Replies</button>
      </div>
    </div>

    <div class="jobDetail_applicant">
      <h2>Applicants:</h2>
      <div class="applicant_list">
        ${job.applicants.map((applicant, index) => `
          <div class="applicant_card" data-job-id="${job.id}" data-applicant-index="${index}">
            <div class="applicant_fit">
              <h2 class="applicant_name">${applicant.name}</h2>
              <h1>${applicant.fitPercentage ?? 'N/A'}%</h1>
            </div>
            <ul class="applicant_details">
              <li><strong>Skills:</strong>
                <div class="skills_container">
                  ${applicant.skills.map(skill => `<span class="skill_pill">${skill}</span>`).join('')}
                </div>
              </li>
              <li><strong>Education:</strong> ${applicant.education}</li>
              <li><strong>Past Experience:</strong>
                <ul class="pastExperience_list">
                  ${applicant.pastExperience.map(exp => `
                    <li class="past-experience-item">
                      <strong>${exp.title}</strong> at <em>${exp.company}</em>, ${exp.location} <br/>
                      <small>${exp.startDate} - ${exp.endDate}</small>
                    </li>
                  `).join('')}
                </ul>
              </li>
            </ul>

          </div>
          `).join('')}
        </div>
      </div>

    </div>
  </div>
</div>

      
    `;
    } else {
      jobDetails.innerHTML = "<p>Job not found.</p>";
    }
  } else {
    jobDetails.innerHTML = "<p>Invalid or missing job ID.</p>";
  }
}

//Move to Applicant Page
document.querySelectorAll('.applicant_card').forEach(card => {
  card.addEventListener('click', () => {
    const jobId = card.getAttribute('data-job-id');
    const index = card.getAttribute('data-applicant-index');


    window.location.href = `applicant.html?jobId=${jobId}&applicantIndex=${index}`;
  });
});

const params = new URLSearchParams(window.location.search);
const jobId = params.get('jobId');
const applicantIndex = params.get('applicantIndex');

let job, applicant;

if (typeof jobs !== 'undefined') {
  job = jobs.find(j => j.id === jobId);
  applicant = job?.applicants?.[applicantIndex];
}

// Get container element where to show applicant details
const container = document.getElementById('applicantDetail');

if (container) {
  if (applicant && job) {
    container.innerHTML = `
      <div class="applicantContent">
        <div class="applicantInfo">
          <h1>${applicant.name}</h1>
          <div class="applicant_section">
            <div class="job_section">
              <h3>Skills</h3>
               <div class="skills_container">
                ${applicant.skills.map(skill => `<span class="skill_pill">${skill}</span>`).join('')}
              </div>
            </div>

            <div class="job_section">
              <h3>Education</h3>
              <p>${applicant.education}</p>
            </div>

            <div class="job_section">
              <h3>Past Experience</h3>
              <ul>
                ${applicant.pastExperience.map(exp => `
                <li>
                  <strong>${exp.title}</strong> - ${exp.company}, ${exp.location}
                  <br>
                  <em>${exp.startDate} – ${exp.endDate}</em>
                </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="applicantInfo">
          <div class="applicant_header">
            <h1>${applicant.fitPercentage ?? 'N/A'}%</h1>
            <button class="btn_primary">Report</button>
            <a href="candidate_comparison.html"><button class="btn_primary">Compare with</button></a>
          </div>
          <div class="applicant_letter">
            <h1>Personalised Letter</h1>
            <p>Insert here </p>
            <button class="btn_primary">Send</button>
          </div>
        </div>
      </div>
          
              
    `;
  } else {
    container.innerHTML = "<p>Applicant not found.</p>";
  }
}

//Add Jobs

const showFormBtn = document.getElementById('showFormBtn');
const addJobForm = document.getElementById('addJobForm');
const jobListContainer = document.getElementById('job-list'); 

// Helper: Render one job item into the job list container
function renderJob(job) {
  // Create a job listing element (simplified example)
  const jobElem = document.createElement('div');
  jobElem.className = 'job_listing';
  jobElem.innerHTML = `
    <div class="job_description">
      <h2>${job.title}</h2>
      <h4>Requirements:</h4>
      <ul>
        ${job.requirements.split('\n').map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
    <div class="job_applied">
      <h1>${job.appliedCount || 0}</h1>
      <h2>Applicants</h2>
    </div>
  `;
  jobListContainer.appendChild(jobElem);
}

if (showFormBtn && addJobForm) {
  showFormBtn.addEventListener('click', () => {
    addJobForm.style.display = addJobForm.style.display === 'none' ? 'block' : 'none';
  });

  // Handle new job form submission
  addJobForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const jobTitle = document.getElementById('jobTitle').value.trim();
    const companyName = document.getElementById('companyName').value.trim();
    const requirements = document.getElementById('requirements').value.trim();

    if (!jobTitle || !companyName || !requirements) {
      alert('Please fill in all fields.');
      return;
    }

    // Create new job object
    const newJob = {
      id: (jobs.length + 1).toString(),  
      title: jobTitle,
      company: companyName,
      location: "Not specified",          
      description: "No description yet", 
      requirements: requirements,
      appliedCount: 0
    };

    // Add job to the jobs array
    jobs.push(newJob);

    // Render the new job in the UI
    renderJob(newJob);

    // Reset and hide the form
    addJobForm.reset();
    addJobForm.style.display = 'none';
  });
}

  //Dropzone Logic
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.backgroundColor = "#e0f7ff";
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.backgroundColor = "";
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.backgroundColor = "";
      const files = e.dataTransfer.files;
      fileInput.files = files;
      console.log('Dropped files:', files);
    });
  }

  //Login Logic
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      console.log("Form submit intercepted!");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = result.redirect;
      } else {
        alert("Login failed");
      }
    });
  }

  // Country/State Dropdown 
  const countrySelect = document.getElementById('country');
  const stateSelect = document.getElementById('state');

  const statesByCountry = {
    "Malaysia": ["Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu"],
    "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia"],
  };

  if (countrySelect && stateSelect) {
    countrySelect.addEventListener('change', () => {
      const states = statesByCountry[countrySelect.value];
      stateSelect.innerHTML = '';

      if (states && states.length > 0) {
        stateSelect.disabled = false;
        states.forEach(state => {
          const option = document.createElement('option');
          option.value = state;
          option.textContent = state;
          stateSelect.appendChild(option);
        });
      } else {
        stateSelect.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '-- No States Available --';
        stateSelect.appendChild(option);
      }
    });
  }

  //Job Code Display
  const code = getQueryParam('jobCode');
  const jobDetailsDiv = document.getElementById('jobDetails');
  const jobDatabase = {
    "J123": { name: "Frontend Developer", company: "Google" },
    "J124": { name: "Backend Developer", company: "Meta" },
    "J125": { name: "Data Scientist", company: "DataCorp" },
  };

  if (jobDetailsDiv) {
    if (!code) {
      jobDetailsDiv.textContent = "No job code provided.";
    } else {
      const jobInfo = jobDatabase[code.toUpperCase()];
      if (!jobInfo) {
        jobDetailsDiv.textContent = `Job code "${code}" not found.`;
      } else {
        jobDetailsDiv.innerHTML = `
          <h3>
            <strong>Job Code:</strong> ${code.toUpperCase()} &nbsp;|&nbsp;
            <strong>Job Name:</strong> ${jobInfo.name} &nbsp;|&nbsp;
            <strong>Company:</strong> ${jobInfo.company}
          </h3>
        `;
      }
    }
  }

  console.log("Script loaded!");
  console.log("Full URL:", window.location.href);
  console.log("Parsed code:", code);
});