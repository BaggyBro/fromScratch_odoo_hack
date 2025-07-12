import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "primary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export default function Button({ variant = "default", size = "md", className = "", children, ...props }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-[#D3D3FF] text-black hover:bg-[#C4C4FF]",
    outline: "border border-[#D3D3FF] bg-transparent text-[#D3D3FF] hover:bg-[#D3D3FF] hover:text-black",
    ghost: "bg-transparent text-purple-200 hover:bg-purple-200 hover:text-black",
    primary: "bg-[#D3D3FF] text-black hover:bg-black hover:text-[#D3D3FF] border",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}