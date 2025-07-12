"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, ChevronDown } from "lucide-react"
import Button from "../components/ui/Button"
import QuestionCard from "../components/QuestionCard"

export default function HomePage() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/questions") // adjust if proxy is set up
        if (!res.ok) throw new Error("Failed to fetch questions")
        const data = await res.json()
        setQuestions(data)
      } catch (err: any) {
        console.error(err)
        setError("Could not load questions.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const filteredQuestions = questions.filter((q: any) => {
    if (filterBy === "answered") return q.answers.length > 0
    if (filterBy === "unanswered") return q.answers.length === 0
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 bg-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 bg-black space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Link to="/ask" className="w-full sm:w-auto">
            <Button variant="primary" className="flex items-center justify-center space-x-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Ask New Question</span>
              <span className="sm:hidden">Ask Question</span>
            </Button>
          </Link>

          
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#d3d3ff] border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-voted">Most Voted</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-[#d3d3ff] border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
            >
              <option value="all">All Questions</option>
              <option value="unanswered">Unanswered</option>
              <option value="answered">Answered</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-purple-300">Loading questions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((question: any) => (
            <QuestionCard
              key={question.id}
              question={{
                id: question.id,
                title: question.title,
                description: question.description,
                tags: question.tags.map((tag: any) => tag.name),
                author: question.user.username,
                timeAgo: new Date(question.createdAt).toLocaleDateString(),
                votes: question.votes || 0,
                answers: question.answers.length,
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination placeholder */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
        {[1, 2, 3, 4, 5].map((n) => (
          <Button key={n} variant="ghost" size="sm" className="text-xs sm:text-sm">
            {n}
          </Button>
        ))}
      </div>
    </div>
  )
}
