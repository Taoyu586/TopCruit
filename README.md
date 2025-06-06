
# TopCruit

TopCruit is a resume parsing web application designed to help recruiters streamline hiring.  
It features a job code system that ensures only relevant candidates can apply, reducing application spam.  
Recruiters can post and manage jobs through a dedicated dashboard, view applicant details, and compare candidates side-by-side using AI-generated ratings and insights.

---

## How to Deploy

### Step 1 – Download the Repository

Clone or download the repository to your local machine.

---

### Step 2 – Configure the Environment

1. Open the `.env` file in the project root.  
2. Replace the placeholder `"Your_API_Key"` with your actual Gemini API key provided by Google.

---

### Step 3 – Install Dependencies

1. Open **Command Prompt** or terminal.  
2. Navigate to the project directory:

   ```bash
   cd path/to/TopCruit-main
   ```

3. Install the required Python packages with:

   ```bash
   python -m pip install -r requirements.txt
   ```

> **Note:** Using `python -m pip` ensures the packages install to the Python version you will run.

---

### Step 4 – Run the Application

You can run the app either via the command line or your preferred IDE.

> **Important:** Double-clicking the Python file will **not** start the server.

#### Option 1: Run via Command Line

1. In the terminal, navigate to the project directory (if not already there).  
2. Run:

   ```bash
   python parser.py
   ```

3. Open your web browser and go to:

   ```
   http://127.0.0.1:5000/dashboard
   ```

#### Option 2: Run via IDE

1. Open your IDE and load the TopCruit project.  
2. Open the `parser.py` file.  
3. Run the script using the IDE’s run/debug function.  
4. Open your browser to:

   ```
   http://127.0.0.1:5000/dashboard
   ```

---

## Troubleshooting

- If you get a `ModuleNotFoundError`, make sure you installed dependencies in the correct Python environment.  
- Use `python --version` to verify the Python interpreter used.  
- Use `python -m pip install -r requirements.txt` to ensure packages install properly.  
- Make sure your `.env` file is configured and saved before running.

---
