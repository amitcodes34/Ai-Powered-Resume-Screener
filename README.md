# AI-Powered Resume Screener 🚀

A modern, full-stack application that helps recruiters automate the resume screening process using Gemini AI.

## ✨ Features
- **Multi-Resume Upload**: Drag and drop multiple PDF resumes.
- **AI Ranking**: Rank candidates based on a Job Description (JD) using Gemini AI.
- **Leaderboard UI**: View match scores, strengths, gaps, and summaries in a premium dashboard.
- **AI Chat Assistant**: Context-aware chat to ask specific questions about the candidate pool.
- **Responsive Design**: Premium dark-mode UI with glassmorphism effects.

## 🛠️ Tech Stack
- **Backend**: FastAPI (Python), `pdfplumber`, `google-generativeai`.
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Lucide React.
- **AI Model**: `gemini-1.5-flash`.

## 🚀 Setup Instructions

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend` folder:
```text
GEMINI_API_KEY=your_actual_key_here
PORT=8000
```
Run the backend:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📝 How it Works
1. **Extraction**: Resumes are parsed using `pdfplumber` to extract raw text.
2. **Screening**: The text + JD is sent to Gemini with a structured prompt to return JSON data (Score, Strengths, Gaps).
3. **Chat**: All candidate data is passed as context to the chat endpoint, allowing for cross-candidate comparisons.

## ⚠️ Known Limitations
- Processes resumes in-memory; scaling to hundreds of resumes may require a database/vector store.
- Limited to PDF format for now.

---
*Created with ❤️ by Antigravity AI*
