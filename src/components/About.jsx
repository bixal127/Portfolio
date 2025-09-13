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

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15
    }
  }
}

const skillVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.08,
    y: -12,
    rotateY: 5,
    transition: {
      duration: 0.4,
      ease: "backOut"
    }
  }
}

const iconVariants = {
  idle: { 
    rotate: 0,
    scale: 1
  },
  hover: {
    rotate: [0, -10, 10, -5, 0],
    scale: [1, 1.1, 1.15, 1.1, 1.1],
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.2, 0.5, 0.8, 1]
    }
  }
}

export default function About() {
  return (
    <section id="about" className="w-full relative pt-0 mt-0">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            About <motion.span 
              className="text-gold relative"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "backOut" }
              }}
            >
              Me
              <motion.div
                className="absolute -inset-2 bg-gold/5 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-gold to-royal mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div 
            className="text-lg md:text-xl text-light/90 leading-relaxed text-center relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="relative z-10">
              I am a BCA student from Nepathya College (Tribhuvan University). I love building web applications and learning new technologies. I am currently learning Java and Spring Boot.
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 rounded-xl opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            Skills / Expertise
          </motion.h3>
          <motion.p 
            className="text-center text-light/80 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Technologies I've worked with
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 perspective-1000"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillVariants}
                whileHover="hover"
                className={`skill-card rounded-2xl p-6 text-center group cursor-pointer ${skill.borderColor} border-2 relative overflow-hidden backdrop-blur-sm`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* Background gradient effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 bg-gradient-to-br from-gold/10 via-transparent to-royal/10"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                
                {/* Floating background elements */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-gold/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
                
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-dark mb-4 relative z-10`}
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <span style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                  
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0"
                    style={{
                      background: `radial-gradient(circle, ${skill.color}15 0%, transparent 70%)`,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                <motion.h4 
                  className="font-semibold text-lg text-light group-hover:text-gold transition-colors duration-500 ease-out relative z-10"
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.3, ease: "backOut" }
                  }}
                >
                  {skill.name}
                </motion.h4>

                {/* Skill level indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-royal opacity-0"
                  whileHover={{ 
                    opacity: 1,
                    scaleX: [0, 1],
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    scaleX: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced background decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1]
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-royal/5 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.35, 0.15],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-light/5 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
        }}
      />
    </section>
  )
}