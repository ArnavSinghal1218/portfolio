# Arnav Singhal — AI & Data Science Portfolio

A cutting-edge, high-interaction portfolio website designed specifically for **Arnav Singhal** (Data Scientist & Deep Learning Engineer), featuring an interactive neural network simulation, live ML model playgrounds, and academic thesis spotlights.

---

## 🚀 Quick Start / How to Run Locally

You can preview the website immediately in two ways:

### Option 1: Direct File Preview
Simply double-click [`index.html`](file:///C:/Users/arnav/.gemini/antigravity/scratch/portfolio/index.html) to open it in Chrome, Edge, Brave, or Firefox.

### Option 2: Local HTTP Server (Recommended)
Double-click [`start-preview.bat`](file:///C:/Users/arnav/.gemini/antigravity/scratch/portfolio/start-preview.bat) or run the following command in PowerShell:
```powershell
cd C:\Users\arnav\.gemini\antigravity\scratch\portfolio
py -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🌟 Interactive Features Included

1. **Interactive Neural Synapse Canvas (`neural-canvas.js`)**:
   - Real-time physics particle network with nodes, axons, and dendrites.
   - Mouse proximity connections and cursor gravity.
   - Click-to-pulse radial tensor shockwaves across synapses.
   - Periodic action potential electrical signals traveling between connected nodes.

2. **Live Model Playgrounds (`interactive-demos.js`)**:
   - **Simulated Dynamic Pricing Engine**: Interactive sliders for Distance (km), Demand Multiplier, Weather Condition, and Vehicle Class, computing real-time fares and breakdown alongside Random Forest regression metrics (RMSE 2.08, MAE 1.67, R² 0.49).
   - **PubMedQA Semantic Search & DistilBERT QA**: Biomedical literature query interface with simulated `txtai` dense vector retrieval (PubMedBERT) and direct answer extraction over 9,999 PubMed abstracts.
   - **Explainable AI Inspector (B-Cos vs. Standard CNN)**: Interactive toggle comparing standard CNN diffuse heatmaps vs. B-cos CNN localized facial attention (eyes, mouth) on FER2013 benchmark.

3. **Master's Thesis Spotlight**:
   - Dedicated presentation of graduate research at Universität Heidelberg: *Evaluating Fourier Layers in DeepPET Architecture — A Comparative Study for Forward Modelling of the 2D Helmholtz Equation*.
   - Key quantitative results: **-34% Mean Relative Error**, **-62% Validation Loss**.

4. **Curated Projects Showcase (`main.js`)**:
   - Dynamic domain filters (*Medical AI & Imaging*, *Scientific ML*, *Biomedical NLP & RAG*, *ML Deployment*).
   - Interactive deep-dive modal displaying architecture summaries, quantitative benchmarks, and PyTorch implementation snippets.

5. **Experience & Education Timelines**:
   - Dual-column trajectory tracking Universität Heidelberg (M.Sc.), Galgotias University (B.Tech.), Toluna Corporate (Data Analyst & 100% CSAT), and E2E Research Services.
   - Honors & awards badges: Toluna Employee of the Month, Above and Beyond Award, and Procter & Gamble 0-error delivery recognition.

6. **Core Competencies Matrix**:
   - Categorized badges covering Deep Learning, NLP & LLMs, Cloud & MLOps, Data Engineering, and Languages (English fluent, German A2).

7. **One-Click Contact Integration**:
   - One-click copy for email (`arnavsinghal637@gmail.com`) with toast feedback.
   - Direct mailto composer and direct LinkedIn link.

---

## 🌐 Free One-Click Deployment to GitHub Pages

To publish this portfolio live to the web under your personal URL (`https://<username>.github.io`):

1. Create a new repository on GitHub named `portfolio` (or `<your-username>.github.io`).
2. Run these commands inside this folder:
```powershell
cd C:\Users\arnav\.gemini\antigravity\scratch\portfolio
git init
git add .
git commit -m "Launch Arnav Singhal AI & Data Science Portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
3. In your GitHub repository settings, go to **Settings > Pages > Branch: main / root > Save**. Your portfolio will be live in 60 seconds!
