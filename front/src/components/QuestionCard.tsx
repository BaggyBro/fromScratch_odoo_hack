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
    <div className="border border-purple-300 rounded-lg p-6 bg-[#E6E6FA] hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-2 text-sm text-black">
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

        <div className="flex-1">
          <Link
            to={`/question/${question.id}`}
            className="text-lg font-semibold text-black hover:text-purple-800"
          >
            {question.title}
          </Link>

          <p className="mt-2 text-black line-clamp-2">{question.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-black text-purple-200 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-gray-700">
              <span className="font-medium text-black">{question.author}</span> • {question.timeAgo}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}