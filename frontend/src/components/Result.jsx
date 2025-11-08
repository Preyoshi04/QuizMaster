import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, Home, RefreshCcw, Medal } from "lucide-react";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If user directly opens /result without playing
  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          ⚠️ No quiz data found!
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { score, total } = state;
  const percentage = ((score / total) * 100).toFixed(1);

  return (
    <>
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-6">
      <div className="bg-blue-50 shadow-xl rounded-2xl p-10 text-center w-full max-w-md border border-blue-200">
        <div className="flex justify-center mb-4">
          <Trophy className="text-gray-900 w-16 h-16" />
        </div>

        <h1 className="text-3xl font-extrabold mb-3 text-blue-900">
          Congratulations!
        </h1>
        <p className="text-lg font-semibold mb-2 text-gray-800 flex items-center justify-center gap-2">
         <Medal size={25} color="blue"/> Your Score:<span className="text-blue-600">{score}/{total}</span>
        </p>
        <p className="text-gray-600 mb-6">
          That’s <span className="font-medium text-blue-700">{percentage}%</span> correct!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => navigate("/quiz") }
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200"
          >
            <RefreshCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          “Well done! Keep challenging yourself and aim for 100% next time 🚀”
        </p>
      </div>
    </div>
    </>
  );
};

export default Result;
