import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-black dark:text-purple-300">{label}</label>}
      <input
        className={`w-full px-4 py-3 border-2 border-[#D3D3FF] dark:border-[#D3D3FF] rounded-lg bg-[#D3D3FF]  text-black placeholder-black  focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-200 transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  )
}