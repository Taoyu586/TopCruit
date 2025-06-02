import os
import json
import string
from docx import Document
import requests
from flask import Flask, request, jsonify, render_template, session, url_for, flash, redirect
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import traceback
import secrets

# Add PyMuPDF for PDF text extraction
try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not installed. Install with: pip install pymupdf")
    print("This is needed for PDF text extraction")

# Loading environmental variables
load_dotenv()

app = Flask(__name__)

# Configurations
API_KEY = os.getenv("GEMINI_API_KEY")
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def generate_job_code(job_name, company, origin, filename="codes.json", length=6):
    # generate code
    characters = string.ascii_uppercase + string.digits
    code = ''.join(secrets.choice(characters) for _ in range(length))

    # open json file
    if os.path.exists(filename):
        with open(filename, "r") as file:
            code_data = json.load(file)
    else:
        code_data = {}

    # check for duplicates
    while code in code_data:
        code = ''.join(secrets.choice(characters) for _ in range(length))

    # link code with job details
    code_data[code] = {
        "job_name": job_name,
        "company": company,
        "origin": origin
    }

    # Save json file
    with open(filename, "w") as file:
        json.dump(code_data, file, indent=2)

    print("JSON Saved")
    return code


def get_job_details(code, filename="codes.json"):
    # open json file
    if os.path.exists(filename):
        with open(filename, "r") as file:
            code_data = json.load(file)
        if code in code_data:
            return code_data[code]
        else:
            print(f"code: {code} not found.")
    else:
        print(f"filename: {filename} not found")


def save_result(result, jobCode, filename="results.json"):
    counter = 1

    if os.path.exists(filename):
        with open(filename, "r") as file:
            try:
                all_results = json.load(file)
            except json.JSONDecodeError:
                all_results = {}
    else:
        all_results = {}
        print("File not found")

    existing_keys = [i for i in all_results.keys() if i.startswith(f"{jobCode}-")]
    numbers = [int(k.split('-')[1]) for k in existing_keys]
    if numbers:
        counter = max(numbers) + 1

    result_key = f"{jobCode}-{counter}"

    all_results[result_key] = result

    with open(filename, "w") as file:
        json.dump(all_results, file, indent=2)

    print(f"Results saved with this key {result_key}")
    return result_key  # FIXED: Added return statement


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ADDED: Get specific candidate data by key
def get_candidate_results(job_code_with_counter, filename="results.json"):
    """Get specific candidate data by key"""
    if os.path.exists(filename):
        with open(filename, "r") as file:
            try:
                all_results = json.load(file)
                # Return specific candidate data using the key
                return all_results.get(job_code_with_counter, None)
            except json.JSONDecodeError:
                print("Error reading results.json")
                return None
    else:
        print("Results file not found")
        return None


# ADDED: Get all candidates for a specific job code
def get_all_candidates_for_job(job_code, filename="results.json"):
    """Get all candidates for a specific job code"""
    if os.path.exists(filename):
        with open(filename, "r") as file:
            try:
                all_results = json.load(file)
                # Filter candidates for this job code
                job_candidates = {}
                for key, data in all_results.items():
                    if key.startswith(f"{job_code}-"):
                        job_candidates[key] = data
                return job_candidates
            except json.JSONDecodeError:
                print("Error reading results.json")
                return {}
    else:
        print("Results file not found")
        return {}


# ADDED: Compare candidates function
def compare_candidates_with_gemini(candidate1_data, candidate2_data, job_details, model_name="gemini-2.5-flash"):
    try:
        print(f"Using model: {model_name}")
        url = f"https://generativelanguage.googleapis.com/v1/models/{model_name}:generateContent"

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
        }

        prompt = f"""
        You are an expert HR professional. Compare the following two candidates for the '{job_details.get('job_name', 'N/A')}' position at '{job_details.get('company', 'N/A')}'.

        Candidate 1 Resume Data:
        {json.dumps(candidate1_data, indent=2)}

        Candidate 2 Resume Data:
        {json.dumps(candidate2_data, indent=2)}

        Provide a detailed comparison focusing on the following aspects.
        In addition to a descriptive sentence, provide a numerical score from 1 to 10 (where 10 is excellent and 1 is very poor) for each candidate on their overall suitability, technical skills, experiences, projects and education.
        Follow these fields strictly.

        Return it as a JSON object with the following fields: 
        - "Overall suitability": a short but detailed paragraph stating who is a stronger candidate overall and why
        - "candidate1 score": integer (1-10) representing candidate 1's overall suitability for the role
        - "candidate2 score": integer (1-10) representing candidate 2's overall suitability for the role
        - "technical skills": a short sentence comparing their relevant technical skills with the job details, highlighting their strengths and weaknesses
        - "candidate1 technical score": integer (1-10) representing candidate 1's technical score for the role
        - "candidate2 technical score": integer (1-10) representing candidate 2's technical score for the role
        - "experience": a short sentence comparing their work experience relevance to the role
        - "candidate1 experience score": integer (1-10) representing candidate 1's experience for the role
        - "candidate2 experience score": integer (1-10) representing candidate 2's experience for the role
        - "projects": a short sentence comparing their project experience and relevance
        - "candidate1 projects score": integer (1-10) representing candidate 1's projects relevance for the role
        - "candidate2 projects score": integer (1-10) representing candidate 2's projects relevance for the role
        - "education": a short sentence comparing their educational background
        - "candidate1 education score": integer (1-10) representing candidate 1's education relevance for the role
        - "candidate2 education score": integer (1-10) representing candidate 2's education relevance for the role
        - "candidate1 strengths": a short but detailed sentence stating the key strengths of candidate 1 for this role
        - "candidate2 strengths": a short but detailed sentence stating the key strengths of candidate 2 for this role
        - "recommendation": a final recommendation on which candidate to consider for the next stage, providing a brief rationale

        Return only valid JSON Objects without additional text, explanation or markup formatting. 
        """

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.1,
                "topP": 0.9,
                "maxOutputTokens": 8192
            }
        }

        print(f"Sending request to {url}...")
        response = requests.post(url, json=payload, headers=headers)
        print(f"Response status code: {response.status_code}")

        if response.status_code == 200:
            response_data = response.json()

            if 'candidates' in response_data and response_data['candidates']:
                text = response_data['candidates'][0]['content']['parts'][0]['text']
                print(f"Received response text of length: {len(text)}")

                # Clean up JSON formatting
                if "```json" in text:
                    print("Found JSON code block with ```json")
                    text = text.split("```json")[1].split("```")[0].strip()
                elif "```" in text:
                    print("Found generic code block")
                    text = text.split("```")[1].strip()

                try:
                    parsed_data = json.loads(text)
                    print(f"Successfully parsed JSON with {len(parsed_data)} fields")
                    return parsed_data
                except json.JSONDecodeError as e:
                    print(f"JSON parsing error: {str(e)}")
                    print(f"Text that couldn't be parsed: {text[:100]}...")
                    return {"error": "Failed to parse JSON from API response", "text": text[:500]}
            else:
                print("No candidates found in API response")
                print(f"Response data: {json.dumps(response_data)[:200]}...")
                return {"error": "No candidates found in API response"}
        else:
            print(f"API request failed with status code: {response.status_code}")
            print(f"Error response: {response.text[:500]}")
            return {"error": f"API request failed with status code {response.status_code}",
                    "details": response.text[:500]}
    except Exception as e:
        print(f"Exception in compare_candidates_with_gemini: {str(e)}")
        traceback.print_exc()
        return {"error": str(e)}


def extract_text_from_docx(path):
    """Extract text from DOCX file"""
    text = ""
    try:
        doc = Document(path)
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        print(f"Error parsing text from docx: {str(e)}")
        traceback.print_exc()
    return None


def extract_text_from_pdf(path):
    """Extract text from PDF file"""
    text = ""
    try:
        with fitz.open(path) as doc:
            for page in doc:
                text += page.get_text()
        return text
    except Exception as e:
        print(f"Error parsing text from PDF: {str(e)}")
        traceback.print_exc()
    return None


def parse_with_gemini_text(text, model_name="gemini-2.5-flash"):
    """Process text with Gemini API"""
    try:
        print(f"Using model: {model_name}")
        url = f"https://generativelanguage.googleapis.com/v1/models/{model_name}:generateContent"

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
        }

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": f"""Extract, parse and summarise this resume along with a overall rating decide whether you would reject or not and leave either a customised acceptance or rejection letter based on the rationale.
                            be more specific on whether you accept or reject while being as polite as possible. 
                             Follow these fields strictly.
                             Return it as a JSON object with the following fields: 

                            -name: Full name of the person
                            -email: The Person Email
                            -phone: Phone Number
                            -location: Location of the person 
                            -skills: Skills of the person
                            -education: Education of the person 
                            -experience: Where else has the person worked for or what experiences does the person have
                            -quick summary: Summarise important parts of the resume
                            -rating: Overall rating of the hireability of the person applying to a normal company as a cybersecurity professional
                            -Rejection or Acceptance Letter

                            Here is the resume text:
                            {text}

                            Return only valid JSON Objects without additional text, explaination or markup formatting. 
                            """
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.1,
                "topP": 0.9,
                "maxOutputTokens": 8192
            }
        }

        print(f"Sending request to {url}...")
        response = requests.post(url, json=payload, headers=headers)
        print(f"Response status code: {response.status_code}")

        if response.status_code == 200:
            response_data = response.json()

            if 'candidates' in response_data and response_data['candidates']:
                text = response_data['candidates'][0]['content']['parts'][0]['text']
                print(f"Received response text of length: {len(text)}")

                # Clean up JSON formatting
                if "```json" in text:
                    print("Found JSON code block with ```json")
                    text = text.split("```json")[1].split("```")[0].strip()
                elif "```" in text:
                    print("Found generic code block")
                    text = text.split("```")[1].strip()

                try:
                    parsed_data = json.loads(text)
                    print(f"Successfully parsed JSON with {len(parsed_data)} fields")
                    return parsed_data
                except json.JSONDecodeError as e:
                    print(f"JSON parsing error: {str(e)}")
                    print(f"Text that couldn't be parsed: {text[:100]}...")
                    return {"error": "Failed to parse JSON from API response", "text": text[:500]}
            else:
                print("No candidates found in API response")
                print(f"Response data: {json.dumps(response_data)[:200]}...")
                return {"error": "No candidates found in API response"}
        else:
            print(f"API request failed with status code: {response.status_code}")
            print(f"Error response: {response.text[:500]}")
            return {"error": f"API request failed with status code {response.status_code}",
                    "details": response.text[:500]}
    except Exception as e:
        print(f"Exception in parse_with_gemini_text: {str(e)}")
        traceback.print_exc()
        return {"error": str(e)}


def parse_resume(filepath):
    """Parse resume using text extraction for all file types"""
    print(f"\n===== PARSING RESUME: {filepath} =====")

    # Get file extension
    file_extension = os.path.splitext(filepath)[1].lower()
    print(f"File extension: {file_extension}")

    # Extract text from file
    if file_extension == '.pdf':
        print("Extracting text from PDF")
        text = extract_text_from_pdf(filepath)
    elif file_extension in ['.docx', '.doc']:
        print("Extracting text from DOCX")
        text = extract_text_from_docx(filepath)
    else:
        print(f"Unsupported file extension: {file_extension}")
        return {"error": "Unsupported file format"}

    # Check if text extraction was successful
    if not text or len(text.strip()) < 100:
        print(f"Text extraction failed or insufficient text: {len(text) if text else 0} chars")
        return {"error": f"Failed to extract sufficient text from {file_extension} file"}

    print(f"Successfully extracted {len(text)} characters of text")

    # Try models in order of preference
    models_to_try = ["gemini-2.5-flash", "gemini-2.5-pro"]

    for model in models_to_try:
        print(f"Trying model: {model}")
        result = parse_with_gemini_text(text, model)

        # Check if parsing was successful
        if not isinstance(result, dict) or "error" not in result:
            print(f"Successfully parsed resume with model: {model}")
            return result

        print(f"Model {model} failed: {result.get('error', 'Unknown error')}")

    # If all models failed, return the last error
    print("All models failed to parse the resume")
    return result


# Add a secret key for session
app.secret_key = os.getenv("SECRET_KEY", secrets.token_hex(16))


# ADDED: Root route
@app.route('/')
def index():
    """Root route - redirects to share_code"""
    return redirect(url_for('share_code'))


# ADDED: Create test code route
@app.route('/create-test-code')
def create_test_code():
    """Create a test job code for development"""
    test_code = generate_job_code(
        job_name="Cybersecurity Analyst",
        company="Test Company",
        origin="development"
    )
    return f"""
    <h1>Test Job Code Created</h1>
    <p><strong>Job Code:</strong> {test_code}</p>
    <p><strong>Job:</strong> Cybersecurity Analyst</p>
    <p><strong>Company:</strong> Test Company</p>
    <p><a href="{url_for('share_code')}">Go to Share Code Page</a></p>
    """


@app.route('/share_code', methods=['GET'])
def share_code():
    return render_template('shareCode.html')


@app.route('/upload_resume', methods=['GET', 'POST'])
def upload_file():
    if 'jobCode' not in session:
        flash("Please enter a valid code!")
        return redirect(url_for("share_code"))

    job_code = session.get("jobCode")
    company = session.get("company")
    jobName = session.get("jobName")

    result = None
    error = None
    result_key = None
    debug_info = {}

    if request.method == 'POST':
        print("Processing POST request...")
        if 'file' not in request.files:
            error = "No file part in the request"
        else:
            file = request.files['file']
            print(f"File received: {file.filename}")

            if file.filename == '':
                error = "No file selected"
            elif file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                print(f"File saved at: {filepath}")

                parsing_result = parse_resume(filepath)
                print(f"Parsing complete, result type: {type(parsing_result)}")
                debug_info['parsing_result_type'] = str(type(parsing_result))

                # Check for parsing errors
                if isinstance(parsing_result, dict) and "error" in parsing_result:
                    error = parsing_result["error"]
                    debug_info['error_details'] = parsing_result.get('details', 'No details')
                    print(f"Error found: {error}")
                else:
                    # Save the result to JSON file
                    result_key = save_result(parsing_result, job_code)
                    session["success"] = True

                    return redirect(url_for('success_page'))
            else:
                error = "File type not allowed. Please upload a PDF or DOCX file."

    # Add debug info to template context
    return render_template(
        'upload_resume.html',
        job_code=job_code,
        company=company,
        job_name=jobName,
        result=result,
        error=error,
        debug_info=debug_info
    )


# ADDED: Complete compare candidates route
@app.route('/compare_candidates', methods=['GET', 'POST'])
def compare_candidates_route():
    job_code = session.get("jobCode")
    if not job_code:
        flash("No job content. Please select a job from dashboard.", "warning")
        return redirect(url_for("share_code"))

    company = session.get("company")
    jobName = session.get("jobName")

    # Get all candidates for this job
    all_candidates = get_all_candidates_for_job(job_code)

    if request.method == 'GET':
        # Show the selection form
        return render_template(
            'compare.html',
            job_code=job_code,
            company=company,
            job_name=jobName,
            all_candidates=all_candidates,
            show_form=True
        )

    # POST request - process comparison
    candidate1_key = request.form.get('candidate1')
    candidate2_key = request.form.get('candidate2')

    comparison_result = None
    error = None

    if not candidate1_key or not candidate2_key:
        error = "Please select 2 candidates to compare"
        flash(error, "danger")
        return render_template(
            'compare.html',
            job_code=job_code,
            company=company,
            job_name=jobName,
            all_candidates=all_candidates,
            show_form=True,
            error=error
        )

    if candidate1_key == candidate2_key:
        error = "Please select 2 different candidates to compare"
        flash(error, "danger")
        return render_template(
            'compare.html',
            job_code=job_code,
            company=company,
            job_name=jobName,
            all_candidates=all_candidates,
            show_form=True,
            error=error
        )

    # Validate candidates belong to this job
    if not (candidate1_key.startswith(f"{job_code}-") and candidate2_key.startswith(f"{job_code}-")):
        error = "Invalid selection: candidates must be from the same job application"
        flash(error, "danger")
        return redirect(url_for('share_code'))

    # Get candidate data
    candidate1_data = get_candidate_results(candidate1_key)
    candidate2_data = get_candidate_results(candidate2_key)

    if not candidate1_data:
        error = f"Candidate data not found for {candidate1_key}. Please ensure the resume was parsed correctly"
        flash(error, "danger")
        return redirect(url_for('upload_file'))

    if not candidate2_data:
        error = f"Candidate data not found for {candidate2_key}. Please ensure the resume was parsed correctly"
        flash(error, "danger")
        return redirect(url_for('upload_file'))

    # Get job details
    job_details = get_job_details(job_code)
    if not job_details:
        error = "Job details not found for this code. Cannot perform comparison. Try again."
        flash(error, "danger")
        return redirect(url_for('share_code'))

    # Perform comparison
    print(f"Comparing {candidate1_key} and {candidate2_key} for job {job_code}")
    comparison_result = compare_candidates_with_gemini(candidate1_data, candidate2_data, job_details)

    if isinstance(comparison_result, dict) and "error" in comparison_result:
        error = f"Comparison failed: {comparison_result['error']}"
        if 'details' in comparison_result:
            error += f"\nDetails: {comparison_result['details'][:200]}..."
        flash(f"Error during comparison: {error}", "danger")
        return redirect(url_for('upload_file'))

    flash("Candidates compared successfully!", "success")

    return render_template(
        'compare.html',
        job_code=job_code,
        company=company,
        job_name=jobName,
        candidate1_name=candidate1_data.get('name', candidate1_key),
        candidate2_name=candidate2_data.get('name', candidate2_key),
        candidate1_data=candidate1_data,
        candidate2_data=candidate2_data,
        comparison_result=comparison_result,
        show_form=False
    )

@app.route('/resume_success')
def success_page():
    success = session.get('success')
    company = session.get('company')
    job_name = session.get('jobName')
    if success:
        return render_template(
            "upload_Success.html",
            company = company,
            job_name = job_name,
        )
    else:
        flash("Please submit a proper resume!")
        return redirect(url_for("upload_file"))


@app.route('/verify_code', methods=['POST'])
def verify_codes():
    # Get the code
    code = request.form.get('code')

    # Look up details
    job_details = get_job_details(code)

    if not job_details:
        return jsonify({
            "success": False
        })

    # Set session variables
    session["jobCode"] = code
    session["company"] = job_details.get("company")
    session["jobName"] = job_details.get("job_name")

    return jsonify({
        "success": True,
        "company": job_details.get("company"),
        "job_name": job_details.get("job_name")
    })


@app.route('/clear-session')
def clear_session():
    session.clear()
    return redirect(url_for("share_code"))


@app.route('/api/parse', methods=['POST'])
def api_parse():
    """API endpoint for resume parsing"""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        result = parse_resume(filepath)
        return jsonify(result)
    else:
        return jsonify({"error": "File type not allowed. Please upload a PDF or DOCX file."}), 400


if __name__ == '__main__':
    print("\n===== RESUME PARSER STARTED =====")
    print(f"API Key (first 5 chars): {API_KEY[:5]}... (length: {len(API_KEY)})")
    print("Models available: gemini-2.5-flash, gemini-2.5-pro")
    print("Open http://127.0.0.1:5000 in your browser to use the interface")
    app.run(debug=True)