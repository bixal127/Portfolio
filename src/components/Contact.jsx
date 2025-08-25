import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('') // Clear error when user types
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Using mailto as fallback
      const mailtoLink = `mailto:123lamichhane@gmail.com?subject=Contact from ${encodeURIComponent(form.name)}&body=From: ${encodeURIComponent(form.name)}%0D%0AEmail: ${encodeURIComponent(form.email)}%0D%0A%0D%0A${encodeURIComponent(form.message)}`
      window.location.href = mailtoLink
      
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Could not send message. Please try emailing directly: 123lamichhane@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative">
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
            Contact <span className="text-gold">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-royal mx-auto mb-8" />
          <p className="text-lg text-light/80 max-w-2xl mx-auto">
            Have a question or want to work together? Send me a message and I'll get back to you soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60" />
              <input 
                required 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Your Name" 
                className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/60"
                disabled={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60" />
              <input 
                required 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Your Email" 
                className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/60"
                disabled={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="md:col-span-2 relative"
            >
              <FaComment className="absolute left-4 top-6 text-gold/60" />
              <textarea 
                required 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                placeholder="Your Message" 
                className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/60 resize-none"
                rows={6}
                disabled={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="md:col-span-2"
            >
              <motion.button 
                type="submit" 
                className="flex items-center gap-3 px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-lg mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                >
                  <FaPaperPlane />
                </motion.div>
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4 text-green-400 font-medium"
                >
                  Message sent! I'll reply soon.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4 text-red-400 font-medium"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="bg-dark/30 border border-gold/20 rounded-2xl p-6 inline-block">
              <p className="text-light/80 mb-2">Or email me directly:</p>
              <motion.a 
                href="mailto:123lamichhane@gmail.com" 
                className="text-gold hover:text-royal font-semibold text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                123lamichhane@gmail.com
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}