import pdfplumber
import google.generativeai as genai
import os
import json
import io
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def extract_text_from_pdf(file_content):
    """Extracts text from a PDF file provided as bytes."""
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(file_content)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error extracting PDF: {e}")
    return text

def screen_resume(resume_text, jd):
    """Screens a resume against a JD using Gemini."""
    prompt = f"""
    Analyze the following resume against the job description provided.
    
    Return ONLY a valid JSON object with the following structure:
    {{
        "name": "Candidate Name (extracted from resume)",
        "score": 0-100 (match score),
        "strengths": ["point1", "point2", "point3"],
        "gaps": ["gap1", "gap2"],
        "summary": "a one-line summary of the candidate's fit"
    }}

    Job Description:
    {jd}

    Resume Text:
    {resume_text}
    """
    
    try:
        response = model.generate_content(prompt)
        # Clean the response to ensure it's valid JSON
        content = response.text.strip()
        if content.startswith("```json"):
            content = content[7:-3].strip()
        elif content.startswith("```"):
            content = content[3:-3].strip()
        
        return json.loads(content)
    except Exception as e:
        print(f"Error screening resume with Gemini: {e}")
        return {
            "name": "Error",
            "score": 0,
            "strengths": [],
            "gaps": ["Analysis failed"],
            "summary": "Could not process resume"
        }

def chat_with_resumes(query, candidate_data):
    """Handles chat queries using the context of screened resumes."""
    context = json.dumps(candidate_data, indent=2)
    prompt = f"""
    You are an AI assistant helping a recruiter. You have analyzed multiple resumes and have the following data about the candidates:
    
    {context}
    
    The recruiter is asking: "{query}"
    
    Provide a helpful, professional, and concise response based ONLY on the data provided above.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in chat: {e}")
        return "I'm sorry, I encountered an error while processing your request."
