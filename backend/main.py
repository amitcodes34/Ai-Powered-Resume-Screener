from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
import os
from dotenv import load_dotenv
from utils import extract_text_from_pdf, screen_resume, chat_with_resumes

load_dotenv()

app = FastAPI(title="AI Resume Screener API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_resumes(
    files: List[UploadFile] = File(...),
    jd: str = Form(...)
):
    """
    Endpoint to upload multiple resumes and screen them against a JD.
    """
    if not jd:
        raise HTTPException(status_code=400, detail="Job description is required")
    
    results = []
    
    for file in files:
        if not file.filename.endswith(".pdf"):
            continue
            
        try:
            content = await file.read()
            resume_text = extract_text_from_pdf(content)
            
            if not resume_text.strip():
                continue
                
            screening_result = screen_resume(resume_text, jd)
            screening_result["filename"] = file.filename
            results.append(screening_result)
        except Exception as e:
            print(f"Error processing {file.filename}: {e}")
            continue

    # Sort by score descending
    results.sort(key=lambda x: x.get("score", 0), reverse=True)
    return results

@app.post("/chat")
async def chat(data: dict):
    """
    Endpoint for context-aware chat with resumes.
    """
    query = data.get("query")
    context = data.get("context")
    
    if not query:
        raise HTTPException(status_code=400, detail="Query is required")
        
    response = chat_with_resumes(query, context)
    return {"response": response}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
