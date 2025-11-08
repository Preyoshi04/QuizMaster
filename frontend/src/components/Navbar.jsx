import React from "react";
import { Link } from "react-router-dom";
import { Gem, LogIn, LogOut, UserCircle, UserPlus } from "lucide-react";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide flex items-center justify-center gap-2"
      >
        <Gem size={28} />
        QuizMaster
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              <LogIn size={16} />
              Login
            </Link>

            {/* Register Button */}
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
            >
              <UserPlus size={16} />
              Register
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
