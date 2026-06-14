# VectorShift Flow

A visual workflow editor for building and validating pipeline graphs. Built using **React Flow** (Frontend) and **FastAPI** (Backend) to handle graph validation and topological cycle checks.

---

## 🛠️ Features & Architecture

* **BaseNode Component (`BaseNode.js`)**: A reusable wrapper component that abstracts node headers, titles, status tags, deletion handlers, and connection port mapping across all node types.
* **9 Pre-configured Nodes**:
  * *General*: Input, Output, LLM, Text
  * *Logic*: Conditional Router
  * *Integrations*: REST API, Database Query, Auth Key, Prompt Template
* **Variable Parsing & Dynamic Ports**:
  * Parses variable syntax (enclosed in `{{variable}}` brackets) inside the `Text` and `Prompt` node content fields to dynamically spawn target connection handles on the left.
  * Node heights adjust dynamically based on the number of active ports to prevent overlaps.
* **Theme System**:
  * Supports light (editorial warm paper) and dark (slate glow) themes with a 3-way toggle button cycling through **Auto (System Theme)**, **Light**, and **Dark** modes.
  * Employs frosted glass backdrop blurs (`backdrop-filter`) for node panels and toolbars over a Mica-style ambient background layout.
* **Auto-Resizing Viewport**: Centers and scales the canvas viewport (`fitView`) as nodes are dropped onto the workspace.
* **DAG Validation**: Backend DFS topological check to detect cycles and output node/edge stats in a dashboard modal.

---

## 📂 Project Structure

```text
├── backend/
│   ├── main.py            # FastAPI entry-point & DFS cycle check logic
│   └── requirements.txt   # Python server requirements
├── frontend/
│   ├── public/            # Static assets and site metadata
│   ├── src/
│   │   ├── nodes/         # React Flow custom node files
│   │   │   ├── BaseNode.js # Reusable node wrapper
│   │   │   └── ...        # Sub-node components
│   │   ├── submit.js      # Submit button & validation stats modal
│   │   ├── index.css      # Style system & custom theme variables
│   │   └── ...            # Canvas, Toolbar, and Store setup
│   └── package.json       # React dependencies
└── README.md
```

---

## 💻 Local Setup

### 1. Start the Backend (FastAPI)
Navigate to the `backend` folder and run:
```bash
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
*API location: `http://localhost:8000`.*

### 2. Start the Frontend (React)
Navigate to the `frontend` folder and run:
```bash
npm install
npm start
```
*App location: `http://localhost:3000`.*

---

## ☁️ Deployment Guide

### Backend (Render)
* **Root Directory**: `backend`
* **Language**: `Python 3`
* **Build Command**: `pip install -r requirements.txt`
* **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
* **Environment Variable**: Set `PYTHON_VERSION` to `3.11.8`.

### Frontend (Vercel)
* **Root Directory**: `frontend`
* **Framework Preset**: `Create React App`
* **Environment Variable**: Set `REACT_APP_BACKEND_URL` to the Render backend service URL (omit trailing slash).
