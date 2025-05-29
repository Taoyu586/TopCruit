import os
import json
import requests
import traceback
from flask import Flask, Blueprint, request, session, render_template, flash, redirect, url_for
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
API_KEY = os.getenv('API_KEY')

compare_candidates_bp = Blueprint('compare_candidates_bp', __name__)

def get_job_details(code, filename="codes.json"):
    if os.path.exists(filename):
        with open(filename, "r") as file:
            try:
                code_data = json.load(file)
            except json.JSONDecodeError:
                print(f"Error: {{filename}} is not a valid JSON file.")
                return None
        if code in code_data:
            return code_data[code]
        else:
            print(f"code: {code} not found.")
            return None
    else:
        print(f"filename: {filename} not found")
        return None

def get_candidate_results(filename="results.json"):
    if os.path.exists(filename):
        with open(filename, "r") as file:
            try:
                all_results = json.load(file)
            except json.JSONDecodeError:
                print(f"Errpr: {filename} is not a valid JSON file or is empty. Returning empty dict")
                return {}
                # all_results = {}
    else:
        # all_results = {}
        print("File not found")
        return {}

    return all_results

#comparing
def compare_candidates_with_gemini(candidate1_data, candidate2_data, job_details, model_name="gemini-1.5-flash"):
    try:
        print(f"Using model: {model_name}")
        url = f"https://generativelanguage.googleapis.com/v1/models/{model_name}:generateContent"

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
        }

        prompt = f"""
        You are an expert HR professional. Compare the following two candidates for the'{job_details.get('job_name')}' position at '{job_details.get('company')}'.

        Candidate 1 Resume Data:
        {json.dumps(candidate1_data, indent=2)}

        Candidate 2 Resume Data:
        {json.dumps(candidate2_data, indent=2)}

        Provide a detailed comparison focusing on the following aspects.
        In addition to a  descriptive sentence, provide a numerical score from 1 to 10 (where 10 is excellent and 1 is very poor) for each candidate on their overall suitability, technical skills, experiences, projects and education.
        Follow these fields strictly.
        
        Return it as a JSON object with the following fields: 
        - Overall suitability: a short but detailed paragraph stating who is a stronger candidate overall and why
        - candidate1 score: integer (1-10) representing candidate 1's overall suitability for the role
        - candidate2 score: integer (1-10) representing candidate 2's overall suitability for the role
        - technical skills: a short sentence comparing their relevant technical skills with the job details, highlighting their strengths and weaknesses
        - candidate1 technical score: integer (1-10) representing candidate 1's technical score for the role
        - candidate2 technical score: integer (1-10) representing candidate 2's technical score for the role
        - experience: 
        - candidate1 technical score: integer (1-10) representing candidate 1's experience for the role
        - candidate2 technical score: integer (1-10) representing candidate 2's experience for the role
        - projects:
        - candidate1 technical score: integer (1-10) representing candidate 1's projects relevance for the role
        - candidate2 technical score: integer (1-10) representing candidate 2's projects relevance for the role
        - education:
        - candidate1 technical score: integer (1-10) representing candidate 1's education relevance for the role
        - candidate2 technical score: integer (1-10) representing candidate 2's education relevance for the role
        - candidate1 strengths: a short but detail sentence stating the key strengths of candidate 1 for this role
        - candidate2 strengths: a short but detail sentence stating the key strengths of candidate 2 for this role
        - recommendation: a final recommendation on which candidate to consider for the next stage, providing a brief rationale

        Return only valid JSON Objects without additional text, explaination or markup formatting. 
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
        print(f"Exception in parse_with_gemini_text: {str(e)}")
        traceback.print_exc()
        return {"error": str(e)}

app.secret_key = "topcruit"

@app.route('/compare_candidates', methods=['GET', 'POST'])
def compare_candidates_route():
    job_code = session.get("jobCode")
    if not job_code:
        flash("No job context. Please select a job first.", "warning")
        # return redirect(url_for("share_code"))

    company = session.get("company")
    jobName = session.get("jobName")
    job_details = get_job_details(job_code)
    full_results_dict = get_candidate_results()

    # Initialize variables
    candidate1_data = None
    candidate2_data = None
    comparison_result = None
    error = None
    candidate1_name = ""
    candidate2_name = ""

    if request.method == 'POST':
        candidate1_key = request.form.get('candidate1')
        candidate2_key = request.form.get('candidate2')

        if not candidate1_key or not candidate2_key:
            error = "Please select 2 candidates to compare"
            flash(error, "danger")
        elif candidate1_key == candidate2_key:
            error = "Please select 2 different candidates to compare"
            flash(error, "danger")
        else:
            candidate1_data = full_results_dict.get(candidate1_key)
            candidate2_data = full_results_dict.get(candidate2_key)

            if not candidate1_data:
                error = f"Candidate data not found for {candidate1_key}. Please ensure the resume was parsed correctly"
                flash(error, "danger")
            elif not candidate2_data:
                error = f"Candidate data not found for {candidate1_key}. Please ensure the resume was parsed correctly"
                flash(error, "danger")
            else:
                # FIXED: Get all results first, then extract specific candidates
                # all_results = get_candidate_results(candidate1_key)  # This function name is misleading - it gets ALL results
                
                if not job_details:
                        error = "Job details not found for this code. Cannot perform comparison. Try again."
                        flash(error, "danger")
                else:
                    print(f"Comparing {candidate1_key} and {candidate2_key} for job {job_code}")
                    comparison_result = compare_candidates_with_gemini(candidate1_data, candidate2_data, job_details)

                candidate1_data = all_results.get(candidate1_key)
                candidate2_data = all_results.get(candidate2_key)

                if not candidate1_data:
                    error = f"Candidate data not found for {candidate1_key}. Please ensure the resume was parsed correctly"
                    flash(error, "danger")
                elif not candidate2_data:
                    error = f"Candidate data not found for {candidate2_key}. Please ensure the resume was parsed correctly"
                    flash(error, "danger")
                else:
                    job_details = get_job_details(job_code)
                    if not job_details:
                        error = "Job details not found for this code. Cannot perform comparison. Try again."
                        flash(error, "danger")
                    else:
                        print(f"Comparing {candidate1_key} and {candidate2_key} for job {job_code}")
                        # FIXED: Remove extra API_KEY parameter
                        comparison_result = compare_candidates_with_gemini(candidate1_data, candidate2_data, job_details)

                        if isinstance(comparison_result, dict) and "error" in comparison_result:
                            error = f"Comparison failed: {comparison_result['error']}"
                            if 'details' in comparison_result:
                                error += f"\nDetails: {comparison_result['details'][:200]}..."
                            flash(f"Error during comparison: {error}", "danger")
                            comparison_result = None
                        else:
                            flash("Candidates compared successfully!", "success")

    # FIXED: Set candidate names safely
    if candidate1_data:
        candidate1_name = candidate1_data.get('name', 'Unknown Candidate 1')
    elif request.method == 'POST' and request.form.get('candidate1'):
        candidate1_name = f"Selected: {request.form.get('candidate1')}"
    
    if candidate2_data:
        candidate2_name = candidate2_data.get('name', 'Unknown Candidate 2')
    elif request.method == 'POST' and request.form.get('candidate2'):
        candidate2_name = f"Selected: {request.form.get('candidate2')}"
    # Get all candidates for this job to populate the selection dropdowns
    job_candidates = {}
    all_results = get_candidate_results("")  # Get all results
    if job_code and isinstance(full_results_dict, dict):
        job_candidates = {k: v for k, v in all_results.items() if k.startswith(f"{job_code}-")}

    return render_template(
        'compare.html',
        job_code=job_code,
        company=company,
        job_name=jobName,
        candidate1_name=candidate1_name,
        candidate2_name=candidate2_name,
        comparison_result=comparison_result,
        error=error,
        candidates=job_candidates  # Pass all candidates for selection
    )
    
if __name__ == '__main__':
    print("\n===== RESUME PARSER STARTED =====")
    print("Models available: gemini-1.5-flash, gemini-1.5-pro")
    print("Open http://127.0.0.1:5000 in your browser to use the interface")
    app.run(debug=True)