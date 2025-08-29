import React from 'react' 
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/bixal127',
    icon: <FaGithub />,
    color: 'hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bishal-lamichhane-4b3730333/',
    icon: <FaLinkedin />,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/tlg_bishal/',
    icon: <FaInstagram />,
    color: 'hover:text-pink-400'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/bishalamichhane1',
    icon: <FaFacebook />,
    color: 'hover:text-blue-500'
  }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-darker border-t border-gold/10 py-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Social Links - Centered on mobile, left on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-3 order-1 sm:order-1"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`w-10 h-10 rounded-full bg-dark/50 border border-gold/20 flex items-center justify-center text-lg text-light/70 transition-all ${social.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -3,
                  borderColor: 'rgba(243, 156, 18, 0.5)',
                  backgroundColor: 'rgba(243, 156, 18, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright - Centered on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-2 sm:order-2 text-center sm:text-right"
          >
            <p className="text-light/60 text-sm">
              © {currentYear} Bishal Lamichhane
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}