import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const GlassButton = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/40 hover:shadow-red-800/60',
    secondary: 'glass text-white hover:bg-white/15',
    outline: 'border border-red-500/50 text-red-500 hover:bg-red-500/10',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  disabled={isLoading}
  className={`
    relative overflow-hidden
    ${variants[variant]} ${sizes.md}
    rounded-xl font-semibold
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `}
  {...props}
></motion.button>)}