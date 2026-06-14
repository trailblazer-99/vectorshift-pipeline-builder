# VectorShift Flow

A visual workflow editor for building and validating pipeline graphs. It features a modular node layout framework, dynamic connection ports, automated canvas centering, system-synchronized themes, and an optimized graph cycle detection validator.

---

## 🚀 Core Features

* **Modular Node Layer (`BaseNode.js`)**: Eliminates redundant node boilerplates by abstracting headers, status tags, delete buttons, and handle mapping.
* **9 Out-of-the-Box Nodes**:
  * *General & IO*: Input, Output, LLM Engine, Text Block
  * *Logic*: Conditional Router
  * *Integrations*: REST API, Database Query, Auth Key, Prompt Template
* **Dynamic Handle Generation**:
  * Parses variable syntax (e.g. `{{variable}}`) inside inputs and textboxes, dynamically spawning target connection ports on the left side.
  * Node heights auto-scale based on the number of dynamic ports to prevent overlap.
* **System-Aware Theme Engine**:
  * Features a 3-way toggle: Auto (system preferences), Light (editorial warm paper), and Dark (slate glow).
  * Frosted glass backdrop filters blend node panels smoothly with the background layer.
* **Auto-Resizing Viewport**: Instantly focuses and scales the canvas viewport (`fitView`) as nodes are dropped.
* **Cycle Detection Validator**: Checks pipelines against a FastAPI DFS topological search to identify loops and back-edges, rendering graph validation statistics in an interactive dashboard modal.

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
