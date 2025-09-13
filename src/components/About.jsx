import React from 'react'
import { motion } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaJsSquare, FaJava, FaDatabase, FaGithub } from 'react-icons/fa'
import { SiC, SiTailwindcss, SiSpringboot } from 'react-icons/si'

const skills = [
  { 
    name: 'HTML', 
    icon: <FaHtml5 className="text-4xl" />, 
    borderColor: 'border-gold/30',
    color: '#e34c26'
  },
  { 
    name: 'CSS', 
    icon: <FaCss3Alt className="text-4xl" />, 
    borderColor: 'border-royal/30',
    color: '#1572B6'
  },
  { 
    name: 'Bootstrap', 
    icon: <FaBootstrap className="text-4xl" />, 
    borderColor: 'border-gold/30',
    color: '#7952B3'
  },
  { 
    name: 'JavaScript', 
    icon: <FaJsSquare className="text-4xl" />, 
    borderColor: 'border-royal/30',
    color: '#f7df1e'
  },
  { 
    name: 'React.js', 
    icon: <FaReact className="text-4xl" />, 
    borderColor: 'border-gold/30',
    color: '#61dafb'
  },
  { 
    name: 'Tailwind CSS', 
    icon: <SiTailwindcss className="text-4xl" />, 
    borderColor: 'border-royal/30',
    color: '#38bdf8'
  },
  { 
    name: 'C programming', 
    icon: <SiC className="text-4xl" />, 
    borderColor: 'border-gold/30',
    color: '#00599C'
  },
  { 
    name: 'Java', 
    icon: <FaJava className="text-4xl" />, 
    borderColor: 'border-royal/30',
    color: '#007396'
  },
  {
    name: 'Spring Boot',
    icon: <SiSpringboot className="text-4xl" />,
    borderColor: 'border-gold/30',
    color: '#6DB33F'
  },
  { 
    name: 'Github', 
    icon: <FaGithub className="text-4xl" />, 
    borderColor: 'border-royal/30',
    color: '#181717'
  },
  { 
    name: 'Databases', 
    icon: <FaDatabase className="text-4xl" />, 
    borderColor: 'border-gold/30',
    color: '#4DB33D'
  }
]

export default function About() {
  return (
    <section id="about" className="w-full relative pt-0 mt-0">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg md:text-xl text-light/90 leading-relaxed text-center">
            I am a BCA student from Nepathya College (Tribhuvan University). I love building web applications and learning new technologies. I am currently learning Java and Spring Boot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Skills / Expertise
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
                  duration: 0.6, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.08,
                  y: -8
                }}
                className={`skill-card rounded-2xl p-6 text-center group cursor-pointer ${skill.borderColor} border-2`}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-dark mb-4 group-hover:scale-110 transition-transform duration-500 ease-out`}
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                </motion.div>
                <h4 className="font-semibold text-lg text-light group-hover:text-gold transition-colors duration-300 ease-out">
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