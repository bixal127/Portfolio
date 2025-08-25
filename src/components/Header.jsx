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

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'navbar-blur shadow-lg border-b border-gold/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <motion.a 
            href="#home" 
            className="text-2xl font-bold text-gold hover:text-royal transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bixal
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n, i) => (
              <motion.a 
                key={n.id}
                href={`#${n.id}`} 
                className="relative hover:text-gold transition-colors font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {n.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          <motion.button 
            className="md:hidden p-2 text-gold hover:text-royal transition-colors" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {open ? <HiX size={28} /> : <HiMenu size={28} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden navbar-blur border-t border-gold/10"
            >
              <div className="container py-6 flex flex-col gap-4">
                {NAV.map((n, i) => (
                  <motion.a 
                    key={n.id}
                    href={`#${n.id}`} 
                    onClick={() => setOpen(false)} 
                    className="block py-3 hover:text-gold transition-colors font-medium border-b border-dark/50 last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {n.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}