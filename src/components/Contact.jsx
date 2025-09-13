import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedEmail, setSelectedEmail] = useState('123lamichhane@gmail.com')

  const emails = {
    primary: '123lamichhane@gmail.com',
    secondary: 'workforbixal127@gmail.com'
  }

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
      const mailtoLink = `mailto:${selectedEmail}?subject=Contact from ${encodeURIComponent(form.name)}&body=From: ${encodeURIComponent(form.name)}%0D%0AEmail: ${encodeURIComponent(form.email)}%0D%0A%0D%0A${encodeURIComponent(form.message)}`
      window.location.href = mailtoLink
      
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(`Could not send message. Please try emailing directly: ${selectedEmail}`)
    } finally {
      setLoading(false)
    }
  }

  return (
  <section id="contact" className="w-full pt-0 mt-0">
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Background decoration matching other sections */}
        <div className="absolute inset-0 bg-gradient-to-br from-darker/50 to-navy/30 rounded-3xl" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-light">
                  Contact <span className="text-gold">Me</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-gold to-royal mt-2 mx-auto" />
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-light/80 max-w-2xl mx-auto"
            >
              Have a question or want to work together? Send me a message and I'll get back to you soon.
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Email Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mb-8"
            >
              <p className="text-light/80 mb-4 text-center">Choose email address:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  type="button"
                  onClick={() => setSelectedEmail(emails.primary)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedEmail === emails.primary
                      ? 'bg-gold text-navy'
                      : 'bg-dark/50 border border-gold/20 text-light hover:border-gold/40'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  Email-1: {emails.primary}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSelectedEmail(emails.secondary)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedEmail === emails.secondary
                    ? 'bg-gold text-navy'
                      : 'bg-dark/50 border border-gold/20 text-light hover:border-gold/40'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  Email-2: {emails.secondary}
                </motion.button>
              </div>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60" />
                <input 
                  required 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/50"
                  disabled={loading}
                />
              </motion.div>

              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60" />
                <input 
                  required 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="Your Email" 
                  className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/50"
                  disabled={loading}
                />
              </motion.div>

              <motion.div 
                className="md:col-span-2 relative"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <FaComment className="absolute left-4 top-6 text-gold/60" />
                <textarea 
                  required 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  placeholder="Your Message" 
                  className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/50 resize-none"
                  rows={6}
                  disabled={loading}
                />
              </motion.div>

              <div className="md:col-span-2 text-center">
                <motion.button 
                  type="submit"
                  className="flex items-center gap-3 px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-lg mx-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  disabled={loading}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.div
                    className={loading ? 'animate-spin' : ''}
                    animate={loading ? {} : { y: [0, -2, 0] }}
                    transition={loading ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FaPaperPlane />
                  </motion.div>
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>

                {sent && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mt-4 text-green-400 font-medium"
                  >
                    Message sent! I'll reply soon.
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mt-4 text-red-400 font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <div className="bg-dark/30 border border-gold/20 rounded-2xl p-6 inline-block">
                <p className="text-light/80 mb-4">Or email me directly:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-light/60 text-sm mb-1">Email-1:</p>
                    <motion.a 
                      href="mailto:123lamichhane@gmail.com" 
                      className="text-gold hover:text-royal font-semibold text-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      123lamichhane@gmail.com
                    </motion.a>
                  </div>
                  <div>
                    <p className="text-light/60 text-sm mb-1">Email-2:</p>
                    <motion.a 
                      href="mailto:workforbixal127@gmail.com" 
                      className="text-gold hover:text-royal font-semibold text-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      workforbixal127@gmail.com
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements matching other sections */}
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