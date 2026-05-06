import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

const variantStyles = {
  primary:
    "bg-primary-800 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
  secondary:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md",
  outline:
    "border-2 border-primary-800 text-primary-800 hover:bg-primary-50 bg-transparent",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
