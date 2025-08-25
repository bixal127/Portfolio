import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const MOCK = [
  {
    id: 'proj-1',
    title: 'Portfolio',
    desc: 'Personal portfolio built with React and Tailwind CSS with responsive design.',
    tech: ['React', 'Tailwind'],
    github: null,
    live: null,
    category: 'Website'
  },
  {
    id: 'proj-2',
    title: 'Project for 4th semester',
    desc: 'Project for 4th semester',
    tech: ['Java', 'Spring Boot'],
    github: null,
    live: null,
    category: 'Java'
  }
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [showProjects, setShowProjects] = useState(false)
  const tags = ['All', 'Website', 'Java']

  const filtered = MOCK.filter((p) => 
    filter === 'All' || p.category === filter
  )

  return (
    <section id="projects" className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-navy/50 to-darker/30 rounded-3xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-gold">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-royal mx-auto mb-8" />
          <p className="text-lg text-light/80 max-w-2xl mx-auto">
            Here are some of the projects I've worked on.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <motion.button 
            onClick={() => setShowProjects(!showProjects)}
            className={`px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 ${
              showProjects 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'btn-primary text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showProjects ? <FaEyeSlash /> : <FaEye />}
            {showProjects ? 'Hide Projects' : 'View Projects'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex justify-center gap-3 mb-8 flex-wrap"
              >
                {tags.map((tag, index) => (
                  <motion.button 
                    key={tag}
                    onClick={() => setFilter(tag)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      filter === tag 
                        ? 'bg-gold text-navy shadow-lg shadow-gold/25' 
                        : 'bg-dark/50 hover:bg-dark/70 text-light border border-gold/20 hover:border-gold/40'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div 
                layout
                className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, index) => (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ y: -5 }}
                      className="project-card rounded-2xl p-8 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.h3 
                          className="font-bold text-2xl text-gold group-hover:text-royal transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.div
                          className="w-3 h-3 bg-gold rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      <motion.p 
                        className="text-light/80 mb-6 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.desc}
                      </motion.p>

                      <motion.div 
                        className="flex items-center gap-2 flex-wrap mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {project.tech && project.tech.map((tech, techIndex) => (
                          <motion.span 
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + techIndex * 0.1 }}
                            className="text-sm bg-gradient-to-r from-gold/10 to-royal/10 border border-gold/20 px-3 py-1 rounded-full text-gold font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>

                      <motion.div 
                        className="flex gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {project.live ? (
                          <motion.a 
                            href={project.live} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt /> Live Demo
                          </motion.a>
                        ) : (
                          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 opacity-50 cursor-not-allowed text-sm">
                            <FaExternalLinkAlt /> No Demo
                          </span>
                        )}
                        
                        {project.github ? (
                          <motion.a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full btn-primary text-white text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaGithub /> Source Code
                          </motion.a>
                        ) : (
                          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-600 text-white opacity-50 cursor-not-allowed text-sm">
                            <FaLock /> Private
                          </span>
                        )}
                      </motion.div>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <p className="text-light/60 text-lg">No projects found for this filter.</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}