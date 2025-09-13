import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Enhanced page transition variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  in: { 
    opacity: 1, 
    y: 0,
    scale: 1
  },
  out: { 
    opacity: 0, 
    y: -50,
    scale: 1.05
  }
}

const pageTransition = {
  type: "tween",
  ease: [0.4, 0, 0.2, 1],
  duration: 0.6
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <section className="flex-1 flex flex-col p-0 m-0">
            <Hero />
          </section>
        )
      case 'about':
        return (
          <section className="min-h-screen bg-darker snap-start flex items-start justify-center">
            <div className="container py-8 lg:py-12 w-full">
              <About />
            </div>
          </section>
        )
      case 'projects':
        return (
          <section className="min-h-screen bg-darker snap-start flex items-start justify-center">
            <div className="container py-8 lg:py-12 w-full">
              <Projects />
            </div>
          </section>
        )
      case 'resume':
        return (
          <section className="min-h-screen bg-darker snap-start flex items-start justify-center">
            <div className="container py-8 lg:py-12 w-full">
              <Resume />
            </div>
          </section>
        )
      case 'contact':
        return (
          <section className="min-h-screen bg-darker snap-start flex items-start justify-center">
            <div className="container py-8 lg:py-12 w-full">
              <Contact />
            </div>
          </section>
        )
      default:
        return (
          <section className="min-h-screen snap-start flex items-center justify-center">
            <Hero />
          </section>
        )
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onSectionChange={setActiveSection} activeSection={activeSection} />
      
      {/* Enhanced main content area with smoother transitions */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-full"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}