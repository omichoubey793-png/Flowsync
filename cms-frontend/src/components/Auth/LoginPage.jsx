
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Chrome,
  Github,
  Loader2,
  Check,
  X,
  Heart,
  Zap,
  Shield,
  Star,
} from 'lucide-react';
import Logo from './Logo';

// ============================================
// LOGO COMPONENT
// ============================================
const LogoSmall = ({ className = "w-8 h-8" }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 3 }}
    whileTap={{ scale: 0.95 }}
    className={`relative ${className}`}
  >
    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse" />
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl relative">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#logoGrad)" />
      <g transform="translate(50, 52)">
        <ellipse cx="-20" cy="-18" rx="14" ry="20" fill="#7F1D1D" transform="rotate(-15)" />
        <ellipse cx="20" cy="-18" rx="14" ry="20" fill="#7F1D1D" transform="rotate(15)" />
        <ellipse cx="0" cy="5" rx="26" ry="28" fill="#FEE2E2" />
        <ellipse cx="-10" cy="-2" rx="5" ry="6" fill="#1F2937" />
        <ellipse cx="10" cy="-2" rx="5" ry="6" fill="#1F2937" />
        <circle cx="-8" cy="-4" r="2" fill="white" />
        <circle cx="12" cy="-4" r="2" fill="white" />
        <ellipse cx="0" cy="14" rx="6" ry="5" fill="#1F2937" />
        <path d="M -8 22 Q 0 30 8 22" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <g transform="translate(0, 38)">
          <path d="M -32 0 Q -16 -8 0 0 Q 16 8 32 0" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M -40 10 Q -20 2 0 10 Q 20 18 40 10" stroke="#DC2626" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>
      <g className="animate-pulse">
        <circle cx="78" cy="18" r="2.5" fill="white" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="85" cy="30" r="1.5" fill="white" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  </motion.div>
);

// ============================================
// FLOATING PARTICLES BACKGROUND
// ============================================
const ParticlesBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-3xl"
      />

      {/* Small Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 glass' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <LogoSmall className="w-11 h-11" />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-white">Flow</span>
                  <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                    Sync
                  </span>
                </h1>
                <p className="text-[10px] text-gray-500 -mt-1 tracking-widest uppercase">
                  Sync Your Flow
                </p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pricing', 'About', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-medium text-sm shadow-lg shadow-red-900/30 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-all duration-300"
            >
              <motion.div
                key={mobileOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden"
          >
            <div className="mx-4 glass rounded-2xl p-6 border border-white/10">
              <div className="space-y-4">
                {['Features', 'Pricing', 'About', 'Contact'].map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                  >
                    {link}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium shadow-lg shadow-red-900/30"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================
// SOCIAL BUTTON
// ============================================
const SocialButton = ({ icon: Icon, label, onClick, delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center justify-center gap-3 w-full py-4 px-4 glass rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/10 group"
  >
    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
    <span>{label}</span>
  </motion.button>
);

// ============================================
// CUSTOM CHECKBOX
// ============================================
const CustomCheckbox = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <motion.div
      animate={{ scale: checked ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onChange(!checked)}
      className={`relative w-6 h-6 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
        checked
          ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-600'
          : 'border-gray-600 hover:border-gray-500 bg-transparent'
      }`}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
      {label}
    </span>
  </label>
);

// ============================================
// FEATURE HIGHLIGHTS
// ============================================
const FeatureBadges = () => {
  const features = [
    { icon: Shield, text: 'Secure' },
    { icon: Zap, text: 'Fast Sync' },
    { icon: Heart, text: 'Loved by 10K+' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {features.map((feature, i) => (
        <motion.div
          key={feature.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-gray-400"
        >
          <feature.icon className="w-4 h-4 text-red-500" />
          <span>{feature.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================
// MAIN AUTH CARD COMPONENT
// ============================================
const AuthCard = ({ isSignUp, setIsSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    console.log('Form submitted:', formData);
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

 <motion.div
  initial={{ opacity: 0, scale: 0.95, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="relative w-full max-w-md"
></motion.div>}