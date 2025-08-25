import React from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaEye, FaFileAlt } from 'react-icons/fa'

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a')
    // Use the public folder path that will work with GitHub Pages
    link.href = import.meta.env.BASE_URL + 'resume.pdf'
    link.download = 'Bishal_Lamichhane_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = () => {
    // Use the public folder path that will work with GitHub Pages
    window.open(import.meta.env.BASE_URL + 'resume.pdf', '_blank')
  }

  return (
    <section id="resume" className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-darker/50 to-navy/30 rounded-3xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-gold to-royal rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaFileAlt className="text-2xl text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-light">
                  My <span className="text-gold">Resume</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-gold to-royal mt-2" />
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-light/80 max-w-lg"
            >
              View or download my resume to learn more about my education, skills, and experience.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button 
              onClick={handleDownload}
              className="flex items-center gap-3 px-6 py-4 btn-primary text-white rounded-2xl font-semibold text-lg shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaDownload />
              </motion.div>
              Download PDF
            </motion.button>
            
            <motion.button 
              onClick={handleView}
              className="flex items-center gap-3 px-6 py-4 btn-secondary rounded-2xl font-semibold text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye />
              View Online
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-32 h-32 bg-royal/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  )
}