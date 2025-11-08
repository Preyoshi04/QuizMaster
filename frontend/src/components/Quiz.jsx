import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, BarChart3, Home } from "lucide-react";
import BASE_URL from "../config.js";

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const category = state?.category || "1";
  const difficulty = state?.difficulty || "easy";
  const amount = state?.amount || "5";

  const [questions, setQuestions] = useState([]);
  const [currentQues, setCurrentQues] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  // ✅ hook must be before any conditional return
  const question = questions[currentQues];
  const answers = useMemo(() => {
    if (!question) return [];
    const all = [...question.incorrect_answers, question.correct_answer];
    return all
      .map((a) => a.replace(/&quot;/g, '"').replace(/&#039;/g, "'"))
      .sort(() => Math.random() - 0.5);
  }, [question]);

  // Fetch questions
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/questions`, {
          params: { amount, category, difficulty, type: "multiple" },
        });
        setQuestions(res.data.questions);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [amount, category, difficulty]);

  const handleAnswerClick = (answer) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);

    const currentQuestion = questions[currentQues];

    const correctAnswer = currentQuestion.correct_answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .trim()
      .toLowerCase();

    const selected = answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .trim()
      .toLowerCase();

    if (selected === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQues < questions.length - 1) {
      setCurrentQues((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      navigate("/result", {
        state: {
          score,
          total: questions.length,
          category,
          difficulty,
        },
      });
    }
  };
  if (loading)
    return (
      <p className="text-center mt-10 text-blue-600">Loading questions...</p>
    );
  if (!questions.length)
    return (
      <p className="text-center mt-10 text-red-500">No questions available!</p>
    );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      {/* ✅ Header Info */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6 bg-blue-100 p-4 rounded-2xl shadow">
        <div className="flex items-center text-blue-700 font-semibold text-lg">
          <BookOpen size={22} />
          Category:{category}
        </div>
        <h2 className="text-lg font-semibold text-blue-800">
          Q:{currentQues + 1} of {questions.length}
        </h2>
        <div className="flex items-center text-blue-700 font-semibold text-lg">
          <BarChart3 />
          Difficulty:{difficulty}
        </div>
      </div>

      {/* ✅ Main Quiz Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <p className="mb-6 text-gray-800 text-lg font-medium leading-relaxed text-center">
          {question.question}
        </p>

        <div className="space-y-4">
          {answers.map((answer, index) => {
            let buttonStyle = "bg-blue-50 hover:bg-blue-100 border-blue-200";
            if (showAnswer) {
              if (answer === question.correct_answer) {
                buttonStyle = "bg-green-500 text-white border-none";
              } else if (answer === selectedAnswer) {
                buttonStyle = "bg-red-500 text-white border-none";
              } else {
                buttonStyle = "bg-blue-50 text-gray-800 border-blue-200";
              }
            } else if (selectedAnswer === answer) {
              buttonStyle = "bg-blue-500 text-white border-none";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={showAnswer}
                className={`w-full text-left p-4 border rounded-xl transition-all duration-200 ${buttonStyle}`}
              >
                {answer}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
            disabled={!showAnswer}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 ${
              showAnswer
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {currentQues === questions.length - 1 ? "Finish Quiz" : "Next →"}
          </button>
        </div>
      </div>
      <div className="mt-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </div>
  );
};

export default Quiz;
