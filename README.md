<h1 align="center">🎯 QuizMaster - Dynamic Quiz Platform</h1>

<p align="center">
  <b>A dynamic quiz platform built with React, Node.js, and OpenTriviaDB API.</b><br>
  <i>Fetches live questions from the OpenTriviaDB API and allows users to register, login, and play quizzes in real time!</i>
</p>

<hr>

<h2>🚀 Live Demo</h2>
<ul>
  <li><b>Frontend:</b> <a href="https://quizmaster-frontend-uxch.onrender.com/login" target="_blank">quizmaster-frontend.onrender.com</a></li>
  <li><b>Backend:</b> <a href="https://quizmaster-backend-x9yn.onrender.com/" target="_blank">quizmaster-backend.onrender.com</a></li>
</ul>

<hr>

<h2>🧠 Features</h2>
<ul>
  <li>Dynamic question fetching from <a href="https://opentdb.com/api_config.php" target="_blank">OpenTriviaDB API</a></li>
  <li>User Registration & Login with secure authentication</li>
  <li>Interactive quiz interface with score tracking</li>
  <li>Responsive UI built using React and Vite</li>
  <li>Backend hosted on Render with Express.js and MongoDB</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><b>Frontend:</b> React (Vite), Axios, React Router</li>
  <li><b>Backend:</b> Node.js, Express.js, MongoDB, Mongoose</li>
  <li><b>Deployment:</b> Render (Frontend + Backend)</li>
  <li><b>API:</b> OpenTriviaDB</li>
</ul>

<hr>

<h2>⚙️ Project Setup</h2>

<h3>Frontend</h3>

```bash
cd frontend
npm install
npm run dev
```
<h3>Backend</h3>

```bash
cd backend
npm install
npm start
````
<h3>Environment Variables</h3>

````bash
# Frontend (.env)
VITE_API_URL=https://quizmaster-backend-x9yn.onrender.com/
````

# Backend (.env)

````bash
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
