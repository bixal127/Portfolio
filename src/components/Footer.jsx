import React from 'react' 
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/bixal127',
    icon: <FaGithub />,
    color: 'hover:text-royal',
    hoverColor: '#06B6D4'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bishal-lamichhane-4b3730333/',
    icon: <FaLinkedin />,
    color: 'hover:text-royal',
    hoverColor: '#06B6D4'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/tlg_bishal/',
    icon: <FaInstagram />,
    color: 'hover:text-gold',
    hoverColor: '#F59E0B'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/bishalamichhane1',
    icon: <FaFacebook />,
    color: 'hover:text-royal',
    hoverColor: '#06B6D4'
  }
]

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const socialVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  hover: {
    scale: 1.2,
    y: -4,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: "backOut"
    }
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black bg-opacity-100 border-t border-gold/10 py-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <motion.div
        className="absolute top-0 left-1/4 w-32 h-32 bg-gold/3 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1]
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-24 h-24 bg-royal/3 rounded-full blur-2xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, -15, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay: 2
        }}
      />

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Enhanced Social Links */}
          <motion.div 
            variants={textVariants}
            className="flex items-center gap-3 order-1 sm:order-1"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                custom={index}
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
                className={`w-10 h-10 rounded-full bg-black border border-gold/20 flex items-center justify-center text-lg text-light/70 transition-all relative overflow-hidden group ${social.color}`}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {social.icon}
                </span>
                
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0"
                  style={{ 
                    background: `radial-gradient(circle, ${social.hoverColor}15 0%, transparent 70%)`
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Subtle pulse animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                />
                
                {/* Click ripple effect placeholder */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold/20 opacity-0"
                  whileTap={{ 
                    scale: [1, 1.5],
                    opacity: [0, 1, 0],
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Enhanced Copyright */}
          <motion.div
            variants={textVariants}
            className="order-2 sm:order-2 text-center sm:text-right relative"
          >
            <motion.div 
              className="text-light/60 text-sm relative inline-block"
              whileHover={{ 
                scale: 1.02,
                color: '#ffffff99',
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <span className="relative z-10">
                © {currentYear} Bishal Lamichhane
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-gold/5 to-royal/5 rounded opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}