import React from "react";

export default function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  disabled = false,
  className = "",
  type = "button"
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-500 text-white focus:ring-cyan-500 shadow-lg shadow-cyan-500/20",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500 border border-slate-600",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-500/20",
    danger: "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 shadow-lg shadow-rose-500/20",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
