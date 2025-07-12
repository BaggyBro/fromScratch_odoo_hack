"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  


  const signup = async (name: string, email: string, password: string) => {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name, // your backend expects `username`, not `name`
        email,
        password,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Signup failed")
    }

    // No user object is returned by your backend — just a success message
    setUser({
      id: "temp-id", // Placeholder — ideally fetched in future from `/me` route
      name,
      email,
      avatar: "https://via.placeholder.com/32x32",
    })
  }

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Login failed")
    }

    const data = await response.json()
    const token = data.token

    // Optionally store token in localStorage
    localStorage.setItem("token", token)

    // You don’t get user data from login, so fake it for now
    setUser({
      id: "temp-id",
      name: "User",
      email,
      avatar: "https://via.placeholder.com/32x32",
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
