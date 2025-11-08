import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Play } from "lucide-react";

const Home = () => {
  const [category, setCategory] = useState(""); // must be scalar (string)
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Fetch all categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(data.trivia_categories);
        // setLoading(false);
      } catch (err) {
        console.error("Failed to fetch categories:", err.message);
        // setError("Failed to load categories!");
        // setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // if (loading) return <p className="text-center mt-10">Loading categories...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleStartQuiz = async () => {
    if (!category) {
      toast.error("Please select a category!");
      return;
    }
    if (!amount) {
      toast.error("Please select amount of questions you want!");
      return;
    }
    if (!difficulty) {
      toast.error("Please select difficulty!");
      return;
    }
    try {
      // Call your own backend API instead of OpenTDB directly
      const { data } = await axios.get("http://localhost:5100/api/questions", {
        params: {
          amount,
          category,
          difficulty,
          type: "multiple",
        },
      });

      if (data.success && data.questions.length > 0) {
        navigate("/quiz", {
          state: {
            questions: data.questions,
            category,
            difficulty,
          },
        });
      } else {
        toast.error("No questions found! Try different options.");
      }
    } catch (error) {
      toast.error("Failed to load quiz questions. Please try again!");
      // console.log(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-blue-100 flex flex-col">
        {/* 🧠 Main Content */}
        <div className="flex flex-col items-center mt-5 px-4">
          {/* Start Quiz Section */}
          <div className="max-w-md w-full bg-blue-50 shadow-lg rounded-2xl p-8 border border-blue-200 text-center mb-8">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-3">
              Start Your Quiz
            </h2>
            <p className="text-gray-600  text-sm">
              Ready to challenge yourself? <br/>Pick your quiz preferences below and
              begin your journey of knowledge!
            </p>
          </div>

          {/* Category Card */}
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border border-blue-100 mb-6">
            <label className="block mb-2 text-2xl font-semibold text-blue-700">
              Select Category
            </label>
            <select
              className="w-full p-3 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Any Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Card */}
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border border-blue-100 mb-6">
            <label className="block mb-2 text-2xl font-semibold text-blue-700">
              Select Difficulty
            </label>
            <select
              className="w-full p-3 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Number of Questions Card */}
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border border-blue-100 mb-6">
            <label className="block mb-2 text-2xl font-semibold text-blue-700">
              Select Number of Questions
            </label>
            <select
              className="w-full p-3 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            >
              <option value="">Amount of Questions</option>
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            className="flex items-center justify-center gap-2 w-full max-w-md bg-blue-500 text-white py-3 font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200"
          >
            <Play size={30} /> Let's Play
          </button>

          <p className="text-gray-500 text-sm mt-6 text-center max-w-md">
            “Every question takes you closer to mastery. Let’s begin your
            journey!”
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
