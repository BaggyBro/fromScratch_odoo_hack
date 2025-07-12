"use client"

import { Link, useNavigate } from "react-router-dom"
import { Search, Bell, Moon, Sun, LogOut, User, Plus } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"
import Button from "./ui/Button"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className=" border-[#D3D3FF] bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-purple-200 hover:text-purple-100 transition-colors">
              Stack<span className="text-purple-400">It</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors">
                Questions
              </Link>
              <Link to="/tags" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors">
                Tags
              </Link>
              <Link to="/users" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors">
                Users
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d3d3ff] h-4 w-4" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-[#D3D3FF] rounded-lg bg-black text-purple-200 placeholder-[#d3d3ff] focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {isAuthenticated && (
              <Button variant="primary" size="sm" className="hidden sm:flex">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            )}


            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="p-2 relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full"></span>
                </Button>

                <div className="flex items-center space-x-3 pl-3 border-l border-[#D3D3FF]">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <img
                        src={user?.avatar || "https://via.placeholder.com/32x32"}
                        alt={user?.name}
                        className="h-8 w-8 rounded-full border-2 border-[#D3D3FF]"
                      />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-purple-200">{user?.name}</p>
                      <p className="text-xs text-purple-400">125 rep</p>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" onClick={handleLogout} className="p-2">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2 border border-[#D3D3FF] rounded-lg bg-black text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>
      </div>
    </header>
  )
}