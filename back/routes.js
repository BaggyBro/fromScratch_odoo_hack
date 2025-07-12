const express = require('express');
const router = express.Router();

const authenticate = require('./middleware/auth');
const questionController = require('./controllers/questionsController');
const answersController = require('./controllers/answersController');
const { signup, login } = require('./controllers/auth');

// === AUTH ROUTES ===
router.post('/signup', signup);
router.post('/login', login);

// === PUBLIC QUESTION ROUTES ===
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);

// === PROTECTED QUESTION ROUTES ===
router.post('/questions', authenticate, questionController.createQuestion);
router.delete('/questions/:id', authenticate, questionController.deleteQuestion);

// === ANSWER ROUTES ===
// Create answer (protected)
router.post('/answers', authenticate, answersController.createAnswer);

// Get all answers for a question (public)
router.get('/questions/:questionId/answers', answersController.getAnswersByQuestion);



// Delete answer (protected)
router.delete('/answers/:id', authenticate, answersController.deleteAnswer);
router.patch("/questions/:id/upvote", authenticate, questionController.upvoteQuestion)
router.patch('/questions/:id/downvote', authenticate, questionController.downvoteQuestion);





module.exports = router;
