import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import RichTextEditor from "../components/RichTextEditor" // Adjust the import path as needed
import Button from "../components/ui/Button"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token") // Adjust if you use a different auth method

      const response = await fetch("http://localhost:5000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description, // HTML from Quill
          tags,        // You can split tags on backend if needed
        }),
      })

      if (!response.ok) throw new Error("Failed to submit question")

      navigate("/")
    } catch (err) {
      alert("Failed to submit question")
    }
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-black rounded-xl shadow-2xl border p-8" style={{ borderColor: '#d3d3ff' }}>
          <h1 className="text-3xl font-bold text-purple-200 mb-8 text-center">
            Ask Question
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title for your question"
                required
                className="w-full px-4 py-3 border-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                style={{ borderColor: '#d3d3ff' }}
              />
            </div>

        <div className="space-y-2">
  <label className="text-sm font-medium text-purple-300">
    Description
  </label>

  <div className="rounded-lg border-2 border-[#d3d3ff] bg-purple-200 p-4 text-white">
    <RichTextEditor 
      value={description}
      onChange={setDescription}
      placeholder="Provide detailed information about your question..."
    />
  </div>
</div>



            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add relevant tags (e.g., react, javascript, css)"
                className="w-full px-4 py-3 border-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                style={{ borderColor: '#d3d3ff' }}
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: '#d3d3ff' }}>
              
              
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate("/")
                  }
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
