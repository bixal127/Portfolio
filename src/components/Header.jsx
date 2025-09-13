import React, { useState, useEffect, useRef } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
]

// Enhanced animation variants
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

export default function Header({ onSectionChange, activeSection }) {
  const [open, setOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const headerRef = useRef(null)

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && open) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleNavClick = (sectionId) => {
    // Prevent multiple rapid clicks during transition
    if (isTransitioning) return

    setIsTransitioning(true)
    
    // Close mobile menu with smooth animation
    if (open) {
      setOpen(false)
      // Wait for menu close animation before changing section
      setTimeout(() => {
        onSectionChange(sectionId)
        setIsTransitioning(false)
      }, 300)
    } else {
      onSectionChange(sectionId)
      setIsTransitioning(false)
    }
  }

  const toggleMenu = () => {
    if (!isTransitioning) {
      setOpen(!open)
    }
  }

  return (
    <>
      <motion.header 
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="fixed w-full z-50 bg-darker/95 backdrop-blur-xl border-b border-gold/10"
      >
        <div className="container flex items-center justify-between py-4">
          <motion.button 
            onClick={() => handleNavClick('home')}
            className="text-2xl font-bold text-gold hover:text-royal transition-colors cursor-pointer relative"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeOut" }
            }}
            disabled={isTransitioning}
          >
            <span className="relative z-10">Bixal</span>
            <motion.div
              className="absolute inset-0 rounded-lg bg-gold/10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n, i) => (
              <motion.button 
                key={n.id}
                onClick={() => handleNavClick(n.id)}
                className={`relative hover:text-gold transition-all font-medium cursor-pointer px-3 py-2 rounded-lg ${
                  activeSection === n.id ? 'text-gold' : 'text-light'
                } ${isTransitioning ? 'pointer-events-none' : ''}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: i * 0.1 + 0.3, 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                whileHover={{ 
                  y: -2,
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1, ease: "easeOut" }
                }}
                disabled={isTransitioning}
              >
                {n.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === n.id ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gold/5 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </nav>

          <motion.button 
            className="md:hidden p-2 text-gold hover:text-royal transition-all relative rounded-lg" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1, ease: "easeOut" }
            }}
            disabled={isTransitioning}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {open ? <HiX size={28} /> : <HiMenu size={28} />}
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-lg bg-gold/10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <>
              {/* Enhanced backdrop */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={backdropVariants}
                className="fixed inset-0 bg-navy/90 backdrop-blur-md"
                onClick={() => setOpen(false)}
              />
              
              {/* Enhanced mobile menu */}
              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="md:hidden bg-darker/98 backdrop-blur-xl border-t border-gold/10 relative z-10 overflow-hidden"
              >
                <div className="container py-6 flex flex-col gap-2">
                  {NAV.map((n, i) => (
                    <motion.button 
                      key={n.id}
                      variants={menuItemVariants}
                      onClick={() => handleNavClick(n.id)}
                      className={`block py-4 px-6 rounded-xl hover:text-gold hover:bg-gold/10 transition-all font-medium text-left cursor-pointer relative overflow-hidden ${
                        activeSection === n.id ? 'text-gold bg-gold/10' : 'text-light'
                      } ${isTransitioning ? 'pointer-events-none' : ''}`}
                      whileHover={{ 
                        x: 8, 
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        transition: { duration: 0.1, ease: "easeOut" }
                      }}
                      disabled={isTransitioning}
                    >
                      <span className="relative z-10">{n.label}</span>
                      {activeSection === n.id && (
                        <motion.div
                          className="absolute left-0 top-0 h-full w-1 bg-gold"
                          layoutId="activeMobileIndicator"
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
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