import React, { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
]

export default function Header({ onSectionChange, activeSection }) {
  const [open, setOpen] = useState(false)

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (sectionId) => {
    // Close mobile menu first
    setOpen(false)
    
    // Update active section through parent component
    onSectionChange(sectionId)
  }

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
  className="fixed w-full z-50 bg-darker border-b border-gold/10"
      >
        <div className="container flex items-center justify-between py-4">
          <motion.button 
            onClick={() => handleNavClick('home')}
            className="text-2xl font-bold text-gold hover:text-royal transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            Bixal
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n, i) => (
              <motion.button 
                key={n.id}
                onClick={() => handleNavClick(n.id)}
                className={`relative hover:text-gold transition-colors font-medium cursor-pointer ${
                  activeSection === n.id ? 'text-gold' : 'text-light'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3, ease: "easeOut" }}
                whileHover={{ y: -2 }}
              >
                {n.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === n.id ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            ))}
          </nav>

          <motion.button 
            className="md:hidden p-2 text-gold hover:text-royal transition-colors" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {open ? <HiX size={28} /> : <HiMenu size={28} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop for mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-navy/80 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
              
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="md:hidden bg-darker border-t border-gold/10 relative z-10"
              >
                <div className="container py-6 flex flex-col gap-2">
                  {NAV.map((n, i) => (
                    <motion.button 
                      key={n.id}
                      onClick={() => handleNavClick(n.id)}
                      className={`block py-4 px-4 rounded-xl hover:text-gold hover:bg-gold/10 transition-all font-medium border-b border-dark/30 last:border-0 text-left cursor-pointer ${
                        activeSection === n.id ? 'text-gold bg-gold/10' : 'text-light'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, ease: "easeOut" }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {n.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}