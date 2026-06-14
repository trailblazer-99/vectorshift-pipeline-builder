# VectorShift Flow

This is a visual workflow editor for building and validating pipeline graphs. I built the frontend using **React Flow** with a custom component abstraction layer, and the backend using **FastAPI** to handle graph validation and topological cycle checks.

---

## 🛠️ Architecture & Features

* **BaseNode Component (`BaseNode.js`)**: Instead of writing duplicate boilerplate for every React Flow card, I designed a reusable node wrapper that manages title splitting, deletion logic (cleaning up nodes and connected edges), and handle layouts.
* **9 Custom Nodes**:
  * *General*: Input, Output, LLM, Text
  * *Logic*: Conditional Router
  * *Integrations*: REST API, Database Query, Auth Key, Prompt Template
* **Variable Parsing & Dynamic Ports**:
  * The `Text` and `Prompt` nodes look for variables declared in double curly brackets `{{var_name}}` and automatically mount corresponding target handles on the left.
  * Node heights scale dynamically based on the number of active variables to prevent overlapping connections.
* **Visual Theme & Dark Mode**:
  * Designed a warm, editorial layout (cream canvas background `#FFFEFB`, beige card panels, serif typography, and gold active states).
  * Added a 3-way toggle button cycling through **Auto (System Theme)**, **Light**, and **Dark** modes.
  * Integrated a frosted glass backdrop blur (`backdrop-filter`) to blend node cards with the Mica-style ambient canvas backgrounds.
* **Auto-Resizing Viewport**: Instantly focuses and scales the canvas viewport (`fitView`) as nodes are dropped.
* **DAG validation**: An optimized DFS topological sort on the backend to detect cycles and output node/edge stats in a dashboard modal.

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
│   │   │   ├── BaseNode.js # Modular abstract node wrapper
│   │   │   └── ...        # Sub-node components
│   │   ├── submit.js      # Submit button & validation stats modal
│   │   ├── index.css      # Style system & custom HSL colors
│   │   └── ...            # Canvas, Toolbar, and Store setup
│   └── package.json       # React dependencies
└── README.md
```

---

## 💻 Local Setup

### 1. Start the Backend (FastAPI)
Open a terminal in the `backend` folder and run:
```bash
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
*The API runs at `http://localhost:8000`.*

### 2. Start the Frontend (React)
Open a separate terminal in the `frontend` folder and run:
```bash
npm install
npm start
```
*The app will automatically open in the browser at `http://localhost:3000`.*

---

## ☁️ Deployment Guide

Here is how I set up the cloud hosting configuration for both services:

### 🐍 FastAPI Backend (Render)
1. Set up a new **Web Service** pointing to the repository.
2. Select **Root Directory**: `backend`
3. Select **Language**: `Python 3`
4. Set **Build Command**: `pip install -r requirements.txt`
5. Set **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Set the **Environment Variable** `PYTHON_VERSION` to `3.11.8`.

### ⚛️ React Frontend (Vercel)
1. Import the project on Vercel.
2. Set **Root Directory**: `frontend`
3. Set **Framework Preset**: `Create React App`
4. Add the following **Environment Variable**:
   * `REACT_APP_BACKEND_URL`: *[Link to your Render backend web service]* (e.g. `https://my-backend.onrender.com` without a trailing slash).
5. Click **Deploy**.
