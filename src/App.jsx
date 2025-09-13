import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
      
      {/* Main content area - shows only active section */}
  <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderActiveSection()}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}