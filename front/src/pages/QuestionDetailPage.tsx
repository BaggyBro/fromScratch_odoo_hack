import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowUp, ArrowDown, Home } from "lucide-react"
import axios from "axios"
import Button from "../components/ui/Button"
import RichTextEditor from "../components/RichTextEditor"

// ====== Types ======
interface User {
  id: number
  username: string
}

interface Answer {
  id: number
  content: string
  upvotes?: number
  user?: User
}

interface Question {
  id: number
  title: string
  description: string
  tags: any // Can be string or array of tag objects
  upvotes?: number
  user?: User
}

// ====== Component ======
export default function QuestionDetailPage() {
  const [question, setQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(true)

const { id } = useParams()
const questionId = Number(id)

  useEffect(() => {
    if (questionId) {
      fetchQuestion()
      fetchAnswers()
    }
  }, [questionId])

  const fetchQuestion = async () => {
    try {
      const res = await axios.get<Question>(`http://localhost:5000/questions/${questionId}`)
      setQuestion(res.data)
    } catch (err) {
      console.error("Failed to load question", err)
    }
  }

  const fetchAnswers = async () => {
    try {
      const res = await axios.get<Answer[]>(`http://localhost:5000/questions/${questionId}/answers`)
      setAnswers(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Failed to load answers", err)
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!answer.trim()) return
    try {
      await axios.post(
        "http://localhost:5000/answers",
        { content: answer, questionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      setAnswer("")
      fetchAnswers()
    } catch (err) {
      console.error("Submit failed", err)
    }
  }

  const handleUpvote = async () => {
    try {
      await axios.patch(`http://localhost:5000/questions/${questionId}/upvote`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      fetchQuestion()
    } catch (err) {
      console.error("Upvote failed", err)
    }
  }

  const handleDownvote = async () => {
    try {
      await axios.patch(`http://localhost:5000/questions/${questionId}/downvote`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      fetchQuestion()
    } catch (err) {
      console.error("Downvote failed", err)
    }
  }

  if (loading || !question) return <div className="text-gray-900 dark:text-white p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-8 overflow-x-auto">
          <a href="/" className="hover:text-[#D3D3FF] transition-colors flex-shrink-0">
            <Home className="h-4 w-4" />
          </a>
          <span className="flex-shrink-0">{">"}</span>
          <a href="/" className="hover:text-[#D3D3FF] transition-colors flex-shrink-0">Question</a>
          <span className="flex-shrink-0">{">"}</span>
          <span className="text-[#D3D3FF] flex-shrink-0 truncate">{question.title}</span>
        </nav>

        {/* Question */}
        <div className="bg-[#D3D3FF] border border-gray-700 rounded-xl p-4 sm:p-8 mb-6 sm:mb-8 shadow-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-black mb-4">{question.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {question.tags && Array.isArray(question.tags) ? (
              question.tags.map((tag: any) => (
                <span
                  key={tag.id || tag}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-black text-[#D3D3FF] rounded-full"
                >
                  {tag.tag || tag}
                </span>
              ))
            ) : question.tags ? (
              question.tags.split(",").map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-black text-[#D3D3FF] rounded-full"
                >
                  {tag.trim()}
                </span>
              ))
            ) : null}
          </div>

          <p className="text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{question.description}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/30 rounded-lg p-2">
                <Button variant="ghost" size="sm" onClick={handleUpvote}>
                  <ArrowUp className="h-4 w-4 text-black" />
                </Button>
                <span className="text-sm font-medium text-black min-w-[20px] text-center">
                  {question.upvotes ?? 0}
                </span>
                <Button variant="ghost" size="sm" onClick={handleDownvote}>
                  <ArrowDown className="h-4 w-4 text-black" />
                </Button>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-700">
              Asked by{" "}
              <span className="font-medium text-black">
                {question?.user?.username ?? "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-[#D3D3FF] mb-4 sm:mb-6">Answers</h2>
          <div className="space-y-4 sm:space-y-6">
            {answers.map((ans) => (
              <div key={ans.id} className="bg-[#D3D3FF] border border-gray-700 rounded-xl p-4 sm:p-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 bg-white/30 rounded-lg p-2 sm:p-3">
                    <Button variant="ghost" size="sm">
                      <ArrowUp className="h-4 w-4 text-black" />
                    </Button>
                    <span className="text-sm font-medium text-black min-w-[20px] text-center">
                      {ans.upvotes ?? 0}
                    </span>
                    <Button variant="ghost" size="sm">
                      <ArrowDown className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black leading-relaxed whitespace-pre-line text-sm sm:text-base">{ans.content}</p>
                    <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-black">
                      Answered by{" "}
                      <span className="font-medium text-black">
                        {ans.user?.username ?? "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Answer */}
        <div className="bg-[#D3D3FF] border border-gray-700 rounded-xl p-4 sm:p-8 shadow-2xl">
          <h3 className="text-base sm:text-lg font-semibold text-black mb-4 sm:mb-6">Submit Your Answer</h3>
          <div className="mb-4 sm:mb-6">
            <RichTextEditor value={answer} onChange={setAnswer} placeholder="Write your answer here..." />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <Button variant="primary" className="flex items-center justify-center space-x-2 w-full sm:w-auto">
              <span className="hidden sm:inline">✨ Enhance with AI</span>
              <span className="sm:hidden">✨ AI</span>
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="w-full sm:w-auto">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
