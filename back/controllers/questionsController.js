const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CREATE A QUESTION
exports.createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body
    const userId = req.user.id

    const question = await prisma.question.create({
      data: {
        title,
        description,
        userId,
      },
    })

    res.status(201).json(question)
  } catch (err) {
    console.error('Create question error:', err)
    res.status(500).json({ error: 'Failed to create question' })
  }
}

// GET ALL QUESTIONS
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true } },
        tags: true,
        answers: {
          include: {
            user: { select: { id: true, username: true } },
          },
        },
      },
    })
    res.json(questions)
  } catch (err) {
    console.error('Get questions error:', err)
    res.status(500).json({ error: 'Failed to fetch questions' })
  }
}

// GET ONE QUESTION BY ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params
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
    })

    if (!question) return res.status(404).json({ error: 'Question not found' })
    res.json(question)
  } catch (err) {
    console.error('Get question by ID error:', err)
    res.status(500).json({ error: 'Failed to get question' })
  }
}

// DELETE A QUESTION (ONLY OWNER)
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id) },
    })

    if (!question) {
      return res.status(404).json({ error: 'Question not found' })
    }

    if (question.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this question' })
    }

    await prisma.question.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Question deleted successfully' })
  } catch (err) {
    console.error('Delete question error:', err)
    res.status(500).json({ error: 'Failed to delete question' })
  }
}

// ✅ TOGGLE UPVOTE (PATCH /questions/:id/upvote)
exports.upvoteQuestion = async (req, res) => {
  const userId = req.user.id
  const questionId = parseInt(req.params.id)

  try {
    const existingVote = await prisma.questionVote.findUnique({
      where: {
        userId_questionId: { userId, questionId },
      },
    })

    if (existingVote) {
      // Remove upvote
      await prisma.questionVote.delete({
        where: {
          userId_questionId: { userId, questionId },
        },
      })

      await prisma.question.update({
        where: { id: questionId },
        data: { upvotes: { decrement: 1 } },
      })

      return res.json({ message: 'Vote removed' })
    }

    // Add new upvote
    await prisma.questionVote.create({
      data: {
        userId,
        questionId,
        voteType: 'up',
      },
    })

    await prisma.question.update({
      where: { id: questionId },
      data: { upvotes: { increment: 1 } },
    })

    res.json({ message: 'Question upvoted' })
  } catch (err) {
    console.error('Upvote error:', err)
    res.status(500).json({ error: 'Failed to upvote' })
  }
}


// PATCH /questions/:id/downvote
exports.downvoteQuestion = async (req, res) => {
  const questionId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    const existingVote = await prisma.questionVote.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    if (existingVote) {
      if (existingVote.voteType === 'down') {
        // Already downvoted → remove vote
        await prisma.questionVote.delete({
          where: { userId_questionId: { userId, questionId } },
        });

        await prisma.question.update({
          where: { id: questionId },
          data: { upvotes: { increment: 1 } }, // remove -1, so increment
        });

        return res.json({ message: 'Downvote removed' });
      } else {
        // Was upvoted → change to downvote
        await prisma.questionVote.update({
          where: { userId_questionId: { userId, questionId } },
          data: { voteType: 'down' },
        });

        await prisma.question.update({
          where: { id: questionId },
          data: { upvotes: { decrement: 2 } }, // remove +1 and apply -1
        });

        return res.json({ message: 'Changed vote to downvote' });
      }
    }

    // No vote yet → add downvote
    await prisma.questionVote.create({
      data: {
        userId,
        questionId,
        voteType: 'down',
      },
    });

    await prisma.question.update({
      where: { id: questionId },
      data: { upvotes: { decrement: 1 } },
    });

    return res.json({ message: 'Question downvoted' });
  } catch (err) {
    console.error('Downvote error:', err);
    return res.status(500).json({ error: 'Failed to downvote' });
  }
};



