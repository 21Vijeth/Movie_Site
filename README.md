Instructions:

Create a file named README.md at the root of your project.

Copy and paste the entire content below into that file.

Crucially, replace the placeholder values (like the live URL, your GitHub profile link, and the project GIF) with your actual information.

MovieSpot - A Modern Movie Discovery Platform

![alt text](./frontend/public/project.gif)

Live Demo: movie-site-five-mu.vercel.app

About The Project

MovieSpot is a sleek, full-stack web application designed to help users discover movies, track their search interests, and view personalized trending content. It's built with a modern, decoupled architecture, featuring a React frontend and a Node.js backend running in a Docker container. This project showcases a complete development and deployment workflow, from local setup to a live production environment.

What started as a simple frontend project evolved into a robust application with secure user authentication, a dedicated API, and third-party service integrations, demonstrating a wide range of full-stack development skills.

Key Features

Secure User Authentication: Full registration and login system using JWT (JSON Web Tokens) for secure, stateless sessions.

Movie Discovery: Seamless integration with The Movie Database (TMDB) API to search through thousands of movies in real-time.

Personalized Trending Searches: A unique feature that tracks each user's search history privately and displays a personalized "Top Searches" list, powered by Appwrite.

Decoupled Architecture: A professional setup with a React frontend deployed on Vercel and a Node.js/Express backend deployed as a Docker container on Render.

Interactive UI: A responsive and user-friendly interface built with React and styled with Tailwind CSS.

Production-Ready Backend: Includes secure CORS policies, security headers via Helmet, and centralized error handling.

Architecture Overview

This project utilizes a modern, decoupled architecture, which separates the frontend presentation layer from the backend logic and data services. This is the standard for building scalable and maintainable web applications.

Frontend (Client):

A Single-Page Application (SPA) built with React and Vite.

Responsible for all UI rendering and user interaction.

Deployed as a static site on Vercel for optimal performance and scalability.

Backend (Authentication API):

A RESTful API built with Node.js and Express.

Its sole responsibility is to manage user registration, login, and JWT generation.

It is Dockerized and deployed as a web service on Render, demonstrating portability and containerization skills.

Backend (Data Services):

Appwrite Cloud is used as a "Backend-as-a-Service" (BaaS) to handle the user-specific search data. This demonstrates the ability to integrate and leverage third-party managed services.

Uses Appwrite's authentication for data permissions, ensuring each user's search history is private.

<!-- You can create a simple diagram using a tool like diagrams.net and replace this link -->

Tech Stack

A brief overview of the major technologies and libraries used in this project.

Category	Technology
Frontend	React, Vite, React Router, Axios, Tailwind CSS
Backend	Node.js, Express.js, MongoDB, Mongoose, JWT, Docker
Services	Appwrite (Database & Auth), TMDB API
Deployment	Vercel (Frontend), Render (Backend)
Getting Started & Local Setup

To get a local copy up and running, follow these simple steps.

Prerequisites

You must have the following installed on your local machine:

Node.js (v18 or later)

npm (Node Package Manager)

Git

A free MongoDB Atlas account for the database.

A free Appwrite Cloud account for the search data service.

Installation & Setup

Clone the repository:

Generated bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


Install Root Dependencies:

This project uses a monorepo-style package.json at the root. Install all dependencies from here.

Generated bash
npm install
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Set up Backend Environment Variables:

Navigate to the backend folder and create a .env file: touch backend/.env

Add the following variables. These are for your local server.

Generated env
# backend/.env

# Your MongoDB Connection String
MONGO_URI=mongodb+srv://...

# A long, random, secret string for signing JWTs
JWT_SECRET=yoursecretjwtstring

# The URL of your local frontend for CORS
FRONTEND_URL=http://localhost:5173
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Env
IGNORE_WHEN_COPYING_END

Set up Frontend Environment Variables:

Navigate to the frontend folder and create a .env file: touch frontend/.env

Add the following variables. These are for your local frontend.

Generated env
# frontend/.env

# The URL of your local backend API
VITE_API_BASE_URL=http://localhost:5000

# Your TMDB API Key
VITE_TMDB_API_KEY=your_tmdb_api_key

# Your Appwrite Project Credentials
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Env
IGNORE_WHEN_COPYING_END
Running the Application

You will need to run the backend and frontend servers in two separate terminal windows.

Start the Backend Server:

Generated bash
# From the root directory
cd backend
node api/index.js
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Your backend API should now be running on http://localhost:5000.

Start the Frontend Development Server:

Generated bash
# From the root directory
cd frontend
npm run dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Your React application should now be running and accessible at http://localhost:5173.

Contact

Vijeth Fernandes - LinkedIn - GitHub - your.email@example.com

Project Link: https://github.com/21Vijeth/Movie_Site