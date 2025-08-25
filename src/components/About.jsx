import React from 'react'
import { motion } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaJsSquare, FaJava, FaDatabase, FaGithub } from 'react-icons/fa'
import { SiC, SiTailwindcss, SiSpringboot } from 'react-icons/si'

const skills = [
  { 
    name: 'HTML', 
    icon: <FaHtml5 className="text-4xl" />, 
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/30'
  },
  { 
    name: 'CSS', 
    icon: <FaCss3Alt className="text-4xl" />, 
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30'
  },
  { 
    name: 'Bootstrap', 
    icon: <FaBootstrap className="text-4xl" />, 
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30'
  },
  { 
    name: 'JavaScript', 
    icon: <FaJsSquare className="text-4xl" />, 
    color: 'from-yellow-400 to-yellow-500',
    borderColor: 'border-yellow-500/30'
  },
  { 
    name: 'React', 
    icon: <FaReact className="text-4xl" />, 
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-400/30'
  },
  { 
    name: 'Tailwind CSS', 
    icon: <SiTailwindcss className="text-4xl" />, 
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-400/30'
  },
  { 
    name: 'C programming', 
    icon: <SiC className="text-4xl" />, 
    color: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-600/30'
  },
  { 
    name: 'Java', 
    icon: <FaJava className="text-4xl" />, 
    color: 'from-red-500 to-orange-600',
    borderColor: 'border-red-500/30'
  },
  {
    name: 'Spring Boot',
    icon: <SiSpringboot className="text-4xl" />,
    color: 'from-green-600 to-green-700',
    borderColor: 'border-green-600/30'
  },
  { 
    name: 'Github', 
    icon: <FaGithub className="text-4xl" />, 
    color: 'from-gray-600 to-gray-800',
    borderColor: 'border-gray-600/30'
  },
  { 
    name: 'Databases', 
    icon: <FaDatabase className="text-4xl" />, 
    color: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500/30'
  }
]

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-darker/50 to-navy/30 rounded-3xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gold">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-royal mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg md:text-xl text-light/90 leading-relaxed text-center">
            I am a BCA student from Nepathya College (Tribhuvan University). I love building web applications and learning new technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Skills / <span className="text-gold">Expertise</span>
          </h3>
          <p className="text-center text-light/80 mb-12">Technologies I've worked with</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                className={`skill-card rounded-2xl p-6 text-center group cursor-pointer ${skill.borderColor} border-2`}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-white">
                    {skill.icon}
                  </div>
                </motion.div>
                <h4 className="font-semibold text-lg text-light group-hover:text-gold transition-colors">
                  {skill.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}