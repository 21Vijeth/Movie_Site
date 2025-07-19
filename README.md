# 🎬 MovieSpot - A Modern Movie Discovery Platform

![MovieSpot Demo](./frontend/public/project.gif)

🔗 **Live Demo**: [movie-site-five-mu.vercel.app](https://movie-site-five-mu.vercel.app)  
📂 **Project Repository**: [GitHub - 21Vijeth/Movie_Site](https://github.com/21Vijeth/Movie_Site)

---

## 🚀 About The Project

**MovieSpot** is a sleek, full-stack movie discovery application designed to help users explore, search, and track trending movies. It features secure user authentication, personalized trending data, and an intuitive UI. The project demonstrates real-world full-stack development skills, including secure API design, third-party service integration, Docker deployment, and CI/CD.

---

## 🧩 Key Features

- 🔐 **JWT Authentication** – Secure registration and login.
- 🎥 **TMDB Integration** – Real-time movie search using The Movie Database API.
- 📈 **Personalized Trending** – Private search history and custom trending lists (powered by Appwrite).
- 🖼️ **Modern UI** – Responsive SPA using React + Tailwind CSS.
- 📦 **Decoupled Architecture** – React frontend on Vercel, Node.js backend in Docker on Render.
- 🛡️ **Production-Ready Backend** – Includes CORS, Helmet, error handling.

---

## 🏗️ Architecture Overview

```

React (Vite) ─────────┐
│
(Frontend)      ├─▶ Vercel (Static Hosting)
│
Backend (Auth API) ───┤
Node.js + Express     └─▶ Render (Dockerized API)
│
Appwrite Cloud ──────────▶ BaaS for Auth + Search History
TMDB API ────────────────▶ 3rd Party Movie Data

````

---

## 🔧 Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | React, Vite, Tailwind CSS, React Router, Axios |
| **Backend**  | Node.js, Express, MongoDB, Mongoose, JWT, Docker |
| **Services** | Appwrite (Auth & DB), TMDB API |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🛠️ Getting Started

Follow these instructions to run the project locally.

### 📋 Prerequisites

- Node.js v18+
- npm
- Git
- MongoDB Atlas account
- Appwrite Cloud account

---

## 🧱 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/21Vijeth/Movie_Site.git
cd Movie_Site
npm install
````

---

### 2️⃣ Setup Environment Variables

#### 📂 Backend

Create `.env` inside the `backend` folder:

```env
# backend/.env

MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

#### 📂 Frontend

Create `.env` inside the `frontend` folder:

```env
# frontend/.env

VITE_API_BASE_URL=http://localhost:5000
VITE_TMDB_API_KEY=your_tmdb_api_key

# Appwrite Credentials
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

---

### 3️⃣ Running the Application

Open two terminals:

#### ➤ Backend

```bash
cd backend
node api/index.js
```

> Runs at: [http://localhost:5000](http://localhost:5000)

#### ➤ Frontend

```bash
cd frontend
npm run dev
```

> Runs at: [http://localhost:5173](http://localhost:5173)

---

## 📦 Deployment

* **Frontend**: Deployed on [Vercel](https://vercel.com)
* **Backend**: Dockerized and deployed to [Render](https://render.com)
* **Appwrite**: Used as a BaaS for user-specific data like search history.

---

## 📬 Contact

**Vijeth Fernandes**
🔗 [LinkedIn](https://www.linkedin.com/in/21vijeth-fernandes)
💻 [GitHub](https://github.com/21Vijeth)
✉️ [vijufernandes63@gmail.com](mailto:vijufernandes63@gmail.com)

---

## ⭐️ Acknowledgements

* [The Movie Database (TMDB)](https://www.themoviedb.org/) for their API
* [Appwrite](https://appwrite.io/) for backend services
* [Render](https://render.com) & [Vercel](https://vercel.com) for deployment platforms

---

> Feel free to fork this repo and customize it for your own movie app! Contributions welcome 🚀

```


