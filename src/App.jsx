import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      {/* Swipeable main content area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
        <section className="min-h-screen snap-start flex items-center justify-center">
          <Hero />
        </section>
        
        <section className="min-h-screen bg-darker snap-start flex items-center justify-center">
          <div className="container py-12 lg:py-20 w-full">
            <About />
          </div>
        </section>

        <section className="min-h-screen bg-navy snap-start flex items-center justify-center">
          <div className="container py-12 lg:py-20 w-full">
            <Projects />
          </div>
        </section>

        <section className="min-h-screen bg-darker snap-start flex items-center justify-center">
          <div className="container py-12 lg:py-20 w-full">
            <Resume />
          </div>
        </section>

        <section className="min-h-screen bg-navy snap-start flex items-center justify-center">
          <div className="container py-12 lg:py-20 w-full">
            <Contact />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}