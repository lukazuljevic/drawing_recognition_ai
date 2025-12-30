# Drawing Recognition AI

A  machine learning web application. Users can draw directly in the browser, and the system attempts to recognize the drawing in real-time using a trained neural network.

## Overview

This project combines a **React + TypeScript** frontend with a **TensorFlow + Keras** AI model trained on the **Quick Draw dataset**. It demonstrates real-time AI inference, containerization, and continuous deployment.

### ✨ Features

- 🧠Drawing recognition with a custom-trained model (25 drawing categories)
- 🖍️ Interactive canvas-based drawing UI (React + TypeScript)
- 📦Containerized with Docker
- ☁️ Deployed on AWS EC2
- 🔁CI/CD with CircleCI
- 🔁Used Ansible to automate instance configuration
- 🔧(Planned) Infrastructure-as-Code with Terraform

Check out the live app here: https://draw.zulja.org

## 🛠️ Local Development Setup

Follow these steps to run the application locally.

### Prerequisites

- **Node.js** (v18+ recommended) & **Yarn**
- **Python** (v3.8+)
- **PostgreSQL** (running locally or via Docker)

### 1. Database Setup

Ensure you have a PostgreSQL database running. Create a database (e.g., `drawing_app`).

### 2. Backend Setup

Create and activate a Python virtual environment in the root directory:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install the dependencies:

```bash
cd model
pip install -r requirements.txt
cd ..
```

Create a `.env` file in the `model` directory with your database connection string:

```bash
# model/.env
DATABASE_URL=postgresql://user:password@localhost/drawing_app
```

> Replace `user`, `password`, and `drawing_app` with your actual Postgres credentials.

### 3. Install Dependencies

Install all project dependencies (frontend & tooling):

```bash
yarn install
```

### 4. Run the Application

You can run both the frontend and backend with a single command from the root.

**First, ensure your Python virtual environment is active:**

```bash
source venv/bin/activate
```

**Then start the development server:**

```bash
yarn dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:8000](http://localhost:8000) (The frontend proxies API requests here)

