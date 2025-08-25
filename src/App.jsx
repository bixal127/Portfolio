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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        <section className="bg-darker">
          <div className="container py-20">
            <About />
          </div>
        </section>

        <section className="bg-navy">
          <div className="container py-20">
            <Projects />
          </div>
        </section>

        <section className="bg-darker">
          <div className="container py-20">
            <Resume />
          </div>
        </section>

        <section className="bg-navy">
          <div className="container py-20">
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}