<h1 align="center">
  <br>
  ResumeIQ
  <br>
</h1>

<h4 align="center">An AI-powered, brutally honest ATS Resume Analyzer built with FastAPI, React, and Groq's Llama 3.</h4>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation--local-setup">Installation</a> •
  <a href="#-tech-stack-breakdown">Tech Stack</a>
</p>

---

## 🌟 The Ultimate ATS Reality Check

In today's highly competitive tech industry, having an "okay" resume is no longer enough. **ResumeIQ** acts as your personal, brutally honest Senior Technical Recruiter. 

Powered by **Groq's lightning-fast Llama-3.3-70B model**, this application analyzes your resume exactly like a modern Applicant Tracking System (ATS), delivering a rigorous, unvarnished reality check on your skills, impact, and keyword optimization. 

No fluff. No inflated scores. Just actionable insights to get you hired at top-tier companies.

## ✨ Key Features

* **⚡ Lightning Fast Inference** — Powered by Groq's LPUs, receive your full resume analysis in under 3 seconds.
* **🎯 Brutally Honest Scoring** — Evaluates resumes on a strict 0-100 scale. Expect a 40-60 unless your resume is truly exceptional.
* **🔍 Deep Skill Gap Analysis** — Automatically compares your resume against an optional Job Description to find missing keywords and weak bullet points.
* **🌊 Real-time Streaming Response** — Watch the AI "type" out its analysis in real-time, built natively with Server-Sent Events (SSE).
* **🎨 Premium Dark Mode UI** — A modern, visually stunning React/Vite interface featuring animated SVG score rings and glassmorphic elements.

## 🏗 Architecture

ResumeIQ is built using a decoupled microservices architecture designed for extreme performance and scalability:

* **Presentation Layer (React + Vite):** A completely custom CSS variable-driven frontend (no bulky UI frameworks). Uses the browser's native `ReadableStream` API to process AI text chunks as they arrive.
* **Application Layer (FastAPI):** An asynchronous Python backend. Uses `PyMuPDF` to extract clean text from raw PDF uploads with unparalleled speed and accuracy. 
* **Intelligence Layer (Groq API):** Executes the strict ATS prompt against the extracted text, strictly enforcing JSON schema outputs for the frontend to render beautifully.

## 🚀 Installation & Local Setup

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- A free API key from [Groq Console](https://console.groq.com/)

### 1. Clone the repository
```bash
git clone https://github.com/naitik2004/ResumeIQ.git
cd ResumeIQ
```

### 2. Configure Environment
Create a `.env` file in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and add your Groq API key:
```env
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### 3. Run with Docker Compose
```bash
docker-compose up --build
```

### 4. Access the Application
- **Frontend App**: `http://localhost:3000`
- **Backend API Docs**: `http://localhost:8000/docs`

## 💻 Tech Stack Breakdown

**Backend:**
* `Python 3.11+`
* `FastAPI` (Async API routing)
* `PyMuPDF` (PDF parsing)
* `httpx` (Async HTTP requests)
* `Pydantic v2` (Validation)

**Frontend:**
* `React 18`
* `Vite 5` (Build tool)
* `Vanilla CSS` (Design Tokens & Animations)
* `Google Fonts` (Syne & DM Sans)

## 🤝 Contributing
Contributions are always welcome! If you have an idea to make the ATS parsing even stricter or the UI even sleeker, feel free to submit a pull request.

---
> *Built for developers who want to stop guessing and start getting interviews.*
