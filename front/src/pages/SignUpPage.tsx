"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await signup(name, email, password)
      navigate("/")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black dark:from-gray-900 dark:to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-800 dark:text-purple-200">
            Join Stack<span className="text-purple-600 dark:text-purple-400">It</span>
          </h2>
          <p className="mt-2 text-center text-sm text-purple-600 dark:text-purple-400">
            Or{" "}
            <Link to="/signin" className="font-medium text-purple-700 hover:text-purple-200 dark:text-purple-300 dark:hover:text-purple-200 transition-colors">
              sign in to your account
            </Link>
          </p>
        </div>

        <div className="bg-white dark:bg-black border-2 border-purple-[#D3D3FF]  rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />

            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded bg-purple-50 dark:bg-purple-900/20 dark:border-purple-600"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-purple-700 dark:text-purple-300">
                I agree to the{" "}
                <Link to="#" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}