# AI on FHIR – Take-Home Assessment

This is a project that lets users search healthcare data using natural language queries like “Show me all diabetic patients over 50. The system then simulates a FHIR API request and displays mock results in a simple web interface.

---

## Project Structure

### Part 1 – Backend & NLP (Python)
- Found in `backend-nlp/notebook/backend_nlp.ipynb`.
- Also included is `part1.pdf`, which explains the code and shows outputs for 5 test queries.
- The backend uses a simple Flask API (`backend-nlp/api/app.py`) that parses the input and returns filtered patient data from mock data.

### Part 2 – Frontend UI (React)
- Code is in the `frontend-ui/` folder.
- A search bar lets users type queries with autocomplete suggestions.
- Results are shown in a chart, table, and raw FHIR request format.
- Patient data is mock data (5 sample patients currently), but it can easily be extended.
- Screenshots of the working UI are available in `part2.pdf`.

### Part 3 – Security Plan
- The document `part3.pdf` explains how the system could be made secure and HIPAA-compliant if working with real healthcare data.

---

## How to Run the App

### 1. Run Backend (Flask)
```bash
cd backend-nlp/api
# Optional: activate your virtual environment
# venv\Scripts\activate  (on Windows)

pip install -r ../requirements.txt
python app.py
```

This will start the backend on: http://127.0.0.1:5000

### 2. Run the Frontend (React)
```bash
cd frontend-ui
npm install
npm run dev
```

The frontend will start at: http://localhost:5173
