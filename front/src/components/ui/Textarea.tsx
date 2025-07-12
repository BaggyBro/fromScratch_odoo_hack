import type React from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export default function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-purple-700 dark:text-purple-300">{label}</label>}
      <textarea
        className={`w-full px-4 py-3 border-2 border-[#D3D3FF] dark:border-[#D3D3FF] rounded-lg bg-[#D3D3FF] dark:bg-[#D3D3FF] text-purple-900 dark:text-purple-900 placeholder-purple-600 dark:placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 resize-vertical ${className}`}
        {...props}
      />
    </div>
  )
}