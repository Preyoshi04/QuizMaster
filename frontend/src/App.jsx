import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  // 🔹 Check for token in localStorage on first load (persistence)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // You can fetch or decode user info here if needed
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <div>
        <Routes>
          {/* Protected Route for Home */}
          <Route
            path="/"
            element={
              user ? <Home setUser={setUser} /> : <Navigate to="/login" />
            }
          />

          {/* Login + Register Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/" /> : <Register setUser={setUser} />
            }
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
    <Footer />
    </>
  );
}

export default App;
