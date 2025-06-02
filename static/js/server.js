const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from /public

// Mock login database
const users = [
  { email: 'candidate@example.com', password: '123456', role: 'candidate' },
  { email: 'recruiter@example.com', password: 'abcdef', role: 'recruiter' }
];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return res.json({
      success: true,
      redirect: user.role === 'candidate' ? '/job_code.html' : '/recruiter_home.html'
    });
  }
  res.json({ success: false });
});

// Path to jobs JSON file
const jobsFile = path.join(__dirname, 'data', 'jobs.json');

// Add a new job
app.post('/add-job', (req, res) => {
  const { title, company, requirements } = req.body;

  fs.readFile(jobsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ success: false });

    let jobs;
    try {
      jobs = JSON.parse(data);
    } catch {
      return res.status(500).json({ success: false });
    }

    const newJob = {
      id: `J${Date.now()}`,
      title,
      company,
      requirements,
      applicants: 0
    };

    jobs.push(newJob);

    fs.writeFile(jobsFile, JSON.stringify(jobs, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ success: false });
      res.json({ success: true, job: newJob });
    });
  });
});

// Serve jobs.json for frontend
app.get('/data/jobs.json', (req, res) => {
  res.sendFile(jobsFile);
});

// Serve homepage explicitly if needed (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});