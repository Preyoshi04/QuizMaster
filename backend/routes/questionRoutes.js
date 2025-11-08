import express from "express";
import axios from "axios";
import he from "he";
import fs from "fs";

const router = express.Router();

// 🔹 Simple in-memory cache (clears every 60 sec)
let cachedQuestions = null;
let lastFetchTime = 0;

/**
 * @desc Fetch quiz questions from Open Trivia DB (with caching + fallback)
 * @route GET /api/questions
 * @access Public
 */
router.get("/", async (req, res) => {
  const { amount = 10, category = "", difficulty = "", type = "multiple" } = req.query;

  try {
    const now = Date.now();

    // Serve from cache if fetched recently
    if (cachedQuestions && now - lastFetchTime < 60000) {
      console.log("📦 Serving questions from cache");
      return res.status(200).json(cachedQuestions);
    }

    // Build OpenTDB URL dynamically
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
    if (category) apiUrl += `&category=${category}`;
    if (difficulty) apiUrl += `&difficulty=${difficulty}`;

    const { data } = await axios.get(apiUrl);

    if (data.response_code !== 0) {
      throw new Error("No questions found or invalid parameters");
    }

    // Decode HTML entities
    const decodeHtml = (str) => he.decode(str);

    const cleanedQuestions = data.results.map((q) => ({
      category: q.category,
      difficulty: q.difficulty,
      question: decodeHtml(q.question),
      correct_answer: decodeHtml(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map((ans) => decodeHtml(ans)),
      type: q.type,
    }));

    const responseData = {
      success: true,
      total: cleanedQuestions.length,
      questions: cleanedQuestions,
    };

    // Cache this response
    cachedQuestions = responseData;
    lastFetchTime = now;

    res.status(200).json(responseData);

  } catch (error) {
    console.error("❌ Error fetching questions:", error.message);

    // Handle 429 or network failures by serving local fallback
    if (error.response && error.response.status === 429) {
      console.warn("⚠️ OpenTDB rate limit hit — using local fallback data");

      try {
        const fallback = JSON.parse(fs.readFileSync("./data/fallbackQuestions.json", "utf-8"));
        return res.status(200).json({
          success: true,
          total: fallback.length,
          questions: fallback,
          source: "local",
        });
      } catch (fsErr) {
        console.error("❌ Fallback file missing or invalid:", fsErr.message);
      }
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching questions",
    });
  }
});

export default router;
