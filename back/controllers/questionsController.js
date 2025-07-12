const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a question
exports.createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // from the JWT token

    const question = await prisma.question.create({
      data: {
        title,
        description,
        userId,
      },
    });

    res.status(201).json(question);
  } catch (err) {
    console.error('Create question error:', err);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, username: true },
        },
        tags: true,
        answers: true,
      },
    });

    res.json(questions);
  } catch (err) {
    console.error('Get questions error:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// Get one question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { id: true, username: true } },
        answers: {
          include: {
            user: { select: { id: true, username: true } },
          },
        },
        tags: true,
      },
    });

    if (!question) return res.status(404).json({ error: 'Question not found' });

    res.json(question);
  } catch (err) {
    console.error('Get question by ID error:', err);
    res.status(500).json({ error: 'Failed to get question' });
  }
};

// Delete question (only by owner)
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id) },
    });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    if (question.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this question' });
    }

    await prisma.question.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Delete question error:', err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};
