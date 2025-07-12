import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import QuestionDetailPage from "./pages/QuestionDetailPage"
import AskQuestionPage from "./pages/AskQuestionPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/question/:id" element={<QuestionDetailPage />} />
                <Route path="/ask" element={<AskQuestionPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
