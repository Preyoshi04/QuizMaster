// Import the Result model (MongoDB collection)
import Result from "../models/resultModel.js";

//  SAVE QUIZ RESULT OF A LOGGED-IN USER
export const saveResults = async (req, res) => {
  const { category, difficulty, score, totalQuestions } = req.body;

  try {
    // ✅ Validate input data
    if (!category || !difficulty || score === undefined || !totalQuestions) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // ✅ Create a new quiz result in MongoDB
    // req.user._id → comes from the 'protect' middleware (decoded JWT)
    const newResult = await Result.create({
      playedBy: req.user._id,
      category,
      difficulty,
      score,
      totalQuestions,
    });

    // ✅ Send success response
    res.status(201).json({
      message: "Result saved successfully!",
      success: true,
      result: newResult,
    });
  } catch (error) {
    // ❌ Handle server-side errors
    console.error("Error saving result:", error.message);
    res.status(500).json({
      message: "Internal server error while saving result",
      success: false,
    });
  }
};

//  GET ALL QUIZ RESULTS OF A LOGGED-IN USER
export const getResults = async (req, res) => {
  try {
    // ✅ Fetch all results for the logged-in user
    // Sorted by 'createdAt' descending → newest first
    const userResults = await Result.find({ playedBy: req.user._id }).sort({
      createdAt: -1,
    });

    // ✅ Send fetched results
    res.status(200).json({
      message: "Fetched results successfully",
      success: true,
      results: userResults,
    });
  } catch (error) {
    // ❌ Handle errors during fetching
    console.error("Error fetching results:", error.message);
    res.status(500).json({
      message: "Internal server error while fetching results",
      success: false,
    });
  }
};
