const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create an answer
exports.createAnswer = async (req, res) => {
  try {
    const { content, questionId } = req.body;
    const userId = req.user.id;

    const answer = await prisma.answer.create({
      data: {
        content,
        questionId: parseInt(questionId),
        userId,
      },
    });

    res.status(201).json(answer);
  } catch (err) {
    console.error('Create answer error:', err);
    res.status(500).json({ error: 'Failed to create answer' });
  }
};

// Get all answers for a specific question
exports.getAnswersByQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId: parseInt(questionId) },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { id: true, username: true },
        },
      },
    });

    res.json(answers);
  } catch (err) {
    console.error('Get answers error:', err);
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
};

// Delete an answer (only if it belongs to the user)
exports.deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const answer = await prisma.answer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    if (answer.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this answer' });
    }

    await prisma.answer.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Answer deleted successfully' });
  } catch (err) {
    console.error('Delete answer error:', err);
    res.status(500).json({ error: 'Failed to delete answer' });
  }
};
