const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a question
exports.createQuestion = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

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
    res.status(500).json({ error: 'Failed to get question' });
  }
};

// Update question (optional)
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const question = await prisma.question.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        updatedAt: new Date(),
      },
    });

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update question' });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.question.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};
