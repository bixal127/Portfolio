import React from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaEye, FaFileAlt } from 'react-icons/fa'

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -3,
    transition: {
      duration: 0.3,
      ease: "backOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  idle: { 
    y: 0,
    rotate: 0
  },
  hover: {
    y: [-3, 0, -3],
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1]
    }
  }
}

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = import.meta.env.BASE_URL + 'resume.pdf'
    link.download = 'Bishal_Lamichhane_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = () => {
    window.open(import.meta.env.BASE_URL + 'resume.pdf', '_blank')
  }

  return (
    <section id="resume" className="w-full">
      <div className="w-full max-w-4xl mx-auto text-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-gold to-royal rounded-2xl flex items-center justify-center relative overflow-hidden"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.4, ease: "backOut" }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1, ease: "easeOut" }
                }}
              >
                <FaFileAlt className="text-2xl text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold/20 to-royal/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating particles around icon */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-white/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.9, 0.4],
                    rotate: [360, 180, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 1.5,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                />
              </motion.div>
              <div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-light"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  My <motion.span 
                    className="text-gold relative"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "backOut" }
                    }}
                  >
                    Resume
                    <motion.div
                      className="absolute -inset-1 bg-gold/5 rounded-lg opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </motion.h2>
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-gold to-royal mt-2 mx-auto"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="text-lg text-light/80 max-w-lg mx-auto mb-8 relative"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <span className="relative z-10">
                View or download my resume to learn more about my education, skills, and experience.
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button 
                onClick={handleDownload}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-3 px-6 py-4 btn-primary text-white rounded-2xl font-semibold text-lg shadow-lg relative overflow-hidden"
              >
                <motion.div
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <FaDownload />
                </motion.div>
                <span className="relative z-10">Download PDF</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/20 to-royal/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  whileHover={{
                    opacity: [0, 1, 0],
                    x: [-100, 200],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                />
              </motion.button>
              
              <motion.button 
                onClick={handleView}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-3 px-6 py-4 btn-secondary rounded-2xl font-semibold text-lg relative overflow-hidden"
              >
                <motion.div
                  whileHover={{ 
                    scale: [1, 1.2, 1],
                    transition: { duration: 0.4, ease: "backOut" }
                  }}
                >
                  <FaEye />
                </motion.div>
                <span className="relative z-10">View Online</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/10 to-royal/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -skew-x-12"
                  whileHover={{
                    opacity: [0, 1, 0],
                    x: [-100, 200],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1]
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-32 h-32 bg-royal/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0],
            x: [0, -8, 0],
            y: [0, 8, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-light/5 rounded-full blur-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            delay: 2
          }}
        />
      </div>
    </section>
  )
}