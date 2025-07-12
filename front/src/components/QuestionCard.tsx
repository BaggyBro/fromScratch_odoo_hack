import { Link } from "react-router-dom"
import { MessageCircle, ArrowUp, ArrowDown } from "lucide-react"
import Button from "./ui/Button"

interface Question {
  id: string
  title: string
  description: string
  tags: string[]
  author: string
  timeAgo: string
  votes: number
  answers: number
}

interface QuestionCardProps {
  question: Question
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="border border-purple-300 rounded-lg p-4 sm:p-6 bg-[#E6E6FA] hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 text-sm text-black">
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="font-medium">{question.votes}</span>
            <Button variant="ghost" size="sm">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{question.answers}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <Link
            to={`/question/${question.id}`}
            className="text-base sm:text-lg font-semibold text-black hover:text-purple-800 line-clamp-2"
          >
            {question.title}
          </Link>

          <p className="mt-2 text-black line-clamp-2 text-sm sm:text-base">{question.description}</p>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {question.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-black text-purple-200 rounded"
                >
                  {tag}
                </span>
              ))}
              {question.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-600 text-white rounded">
                  +{question.tags.length - 3}
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm text-gray-700">
              <span className="font-medium text-black">{question.author}</span> • {question.timeAgo}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}