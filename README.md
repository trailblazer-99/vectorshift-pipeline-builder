# VectorShift Pipeline Builder Assessment

A modular, interactive workflow pipeline builder built with **React Flow** (Frontend) and **FastAPI** (Backend). Features an elegant brand styling supporting light and dark themes, dynamic handle generation, auto-resizing text boxes, and topological Directed Acyclic Graph (DAG) validation.

---

## 🚀 Key Features

* **Modular Node Wrapper (`BaseNode.js`)**: Reduces code duplication across React Flow components by abstracting node headers, close buttons, deletion handlers, and dynamic connection ports.
* **9 Pre-configured Nodes**:
  * *General*: Input, Output, LLM, Text
  * *Logic*: Conditional Router
  * *Integrations*: REST API, Database (PostgreSQL/MySQL/MongoDB), Auth Key Manager, Prompt Template
* **Reactive Handles & Auto-sizing (`TextNode`)**:
  * Parses JavaScript variable syntax (e.g. `{{variable}}`) inside text areas and generates matching connection handles dynamically.
  * Dynamically scales the height and width of text areas on input to prevent overlapping labels.
* **Warm Editorial Brand Theme & Dark Mode**:
  * *Light Mode*: Cream canvas background (`#FFFEFB`), paper cards, serif headings (`Newsreader`), and gold active states.
  * *Dark Mode*: Sleek high-contrast slate layout with radial neon-gold ambient glows.
* **Canvas Auto-Fitting**: Drops new nodes and automatically scales/centers the canvas viewport smoothly using React Flow's `fitView` animation.
* **FastAPI DAG Validation**: An optimized Depth-First Search (DFS) back-edge checking algorithm that evaluates if a pipeline contains loops before execution, rendering results in a dashboard modal.

---

## 📂 Repository Structure

```text
├── backend/
│   ├── main.py            # FastAPI server & DFS cycle-checking algorithm
│   └── requirements.txt   # Python deployment dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/         # Core React Flow node components
│   │   │   ├── BaseNode.js # Main OOP-style abstract node layout
│   │   │   └── ...        # Input, Output, LLM, Text, Custom Nodes
│   │   ├── submit.js      # Submit button & pipeline validation status modal
│   │   ├── index.css      # CSS styling & Light/Dark variables
│   │   └── ...            # Store, Toolbar, and Canvas entry-points
│   └── package.json       # React dependencies
└── README.md              # Global repository guide
```

---

## 🛠️ Local Installation & Setup

### 1. Run the Python Backend
From your terminal, navigate to the `backend` folder and run:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
*The server launches at `http://localhost:8000`.*

### 2. Run the React Frontend
Open a separate terminal, navigate to the `frontend` folder and run:
```bash
cd frontend
npm install
npm start
```
*The web interface will compile and open at `http://localhost:3000`.*

---

## ☁️ Cloud Deployment

### Backend (Render)
1. Register on [Render](https://render.com/) and create a **Web Service**.
2. Connect this repository.
3. Configure settings:
   * **Root Directory**: `backend`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Copy the live API URL generated (e.g. `https://my-backend.onrender.com`).

### Frontend (Vercel)
1. Register on [Vercel](https://vercel.com/) and create a **New Project**.
2. Configure settings:
   * **Root Directory**: `frontend`
   * **Framework Preset**: `Create React App`
3. Add **Environment Variables**:
   * Set `REACT_APP_BACKEND_URL` to your Render backend URL (e.g., `https://my-backend.onrender.com`).
4. Click **Deploy**.
