import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'copper' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  to?: string;
  title?: string;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  href,
  to,
  title,
  'aria-label': ariaLabel,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants: Record<string, string> = {
    primary:
      'razlo-button-primary text-white dark:text-[#0E0E0E] hover:opacity-90 focus-visible:ring-[#0E0E0E]',
    secondary:
      'razlo-button-secondary text-[#0E0E0E] dark:text-white hover:bg-[#0E0E0E]/5 dark:hover:bg-white/10 focus-visible:ring-[#0E0E0E]',
    ghost:
      'bg-transparent text-[#0E0E0E] dark:text-white hover:bg-[#0E0E0E]/5 dark:hover:bg-white/5 focus-visible:ring-[#0E0E0E]',
    copper:
      'razlo-glass-control razlo-button-copper text-white hover:brightness-110 focus-visible:ring-[#B15D2E]',
    outline:
      'razlo-glass-control razlo-button-outline text-[#8F431B] dark:text-[#FFE0D0] hover:bg-white/20 focus-visible:ring-[#B15D2E]',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-8 py-4 text-base rounded-full',
  };

  const finalClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={finalClassName} title={title} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;