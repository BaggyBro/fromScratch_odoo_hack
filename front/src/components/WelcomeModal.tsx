import { useNavigate } from "react-router-dom"
import Button from "./ui/Button"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const navigate = useNavigate()

  const handleViewAsGuest = () => {
    localStorage.setItem("welcomeModalShown", "true")
    onClose()
    // Stay on the current page (home page)
  }

  const handleLogin = () => {
    localStorage.setItem("welcomeModalShown", "true")
    onClose()
    navigate("/signin")
  }

  const handleSignup = () => {
    localStorage.setItem("welcomeModalShown", "true")
    onClose()
    navigate("/signup")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#D3D3FF] rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Welcome to Q&A Platform</h2>
          <p className="text-gray-700 mb-8">
            Choose how you'd like to explore our community
          </p>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full py-3 text-lg"
              onClick={handleViewAsGuest}
            >
              👀 View as Guest
            </Button>
            
            <Button
              variant="outline"
              className="w-full py-3 text-lg"
              onClick={handleLogin}
            >
              🔐 Login
            </Button>
            
            <Button
              variant="outline"
              className="w-full py-3 text-lg"
              onClick={handleSignup}
            >
              ✨ Sign Up
            </Button>
          </div>
          
          <button
            onClick={() => {
              localStorage.setItem("welcomeModalShown", "true")
              onClose()
            }}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
} 