import React from 'react' 
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaHeart } from 'react-icons/fa'

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
    <footer className="bg-darker border-t border-gold/10 py-12 mt-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`w-12 h-12 rounded-full bg-dark/50 border border-gold/20 flex items-center justify-center text-xl text-light/70 transition-all ${social.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  borderColor: 'rgba(243, 156, 18, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-light/60 text-sm flex items-center justify-center gap-2">
              © {currentYear} Bishal Lamichhane.
            </p>
          </motion.div>

          {/* Back to top link */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gold/70 hover:text-gold text-sm font-medium transition-colors"
            whileHover={{ y: -2 }}
          >
            ↑ Back to Top
          </motion.a>
        </motion.div>
      </div>
    </footer>
  )
}