import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa'

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

const inputVariants = {
  focus: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.3,
      ease: "backOut"
    }
  },
  blur: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedEmail, setSelectedEmail] = useState('123lamichhane@gmail.com')
  const [focusedField, setFocusedField] = useState('')

  const emails = {
    primary: '123lamichhane@gmail.com',
    secondary: 'workforbixal127@gmail.com'
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
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
        <div className="absolute inset-0 bg-gradient-to-br from-darker/50 to-navy/30 rounded-3xl" />
        
        <div className="relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-light"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  Contact <motion.span 
                    className="text-gold relative"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "backOut" }
                    }}
                  >
                    Me
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
              className="text-lg text-light/80 max-w-2xl mx-auto relative"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <span className="relative z-10">
                Have a question or want to work together? Send me a message and I'll get back to you soon.
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-light/80 mb-4 text-center">Choose email address:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  type="button"
                  onClick={() => setSelectedEmail(emails.primary)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all relative overflow-hidden ${
                    selectedEmail === emails.primary
                      ? 'bg-gold text-navy'
                      : 'bg-dark/50 border border-gold/20 text-light hover:border-gold/40'
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="relative z-10">Email-1: {emails.primary}</span>
                  {selectedEmail !== emails.primary && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gold/10 to-royal/10 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSelectedEmail(emails.secondary)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all relative overflow-hidden ${
                    selectedEmail === emails.secondary
                      ? 'bg-gold text-navy'
                      : 'bg-dark/50 border border-gold/20 text-light hover:border-gold/40'
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="relative z-10">Email-2: {emails.secondary}</span>
                  {selectedEmail !== emails.secondary && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gold/10 to-royal/10 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <motion.div 
                variants={itemVariants}
                className="relative"
              >
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60 z-10"
                  animate={{
                    scale: focusedField === 'name' ? 1.2 : 1,
                    color: focusedField === 'name' ? '#F59E0B' : '#F59E0B99'
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <FaUser />
                </motion.div>
                <motion.input 
                  required 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  placeholder="Your Name" 
                  className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/50 relative"
                  disabled={loading}
                  variants={inputVariants}
                  animate={focusedField === 'name' ? 'focus' : 'blur'}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 rounded-2xl opacity-0 pointer-events-none"
                  animate={{ opacity: focusedField === 'name' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="relative"
              >
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/60 z-10"
                  animate={{
                    scale: focusedField === 'email' ? 1.2 : 1,
                    color: focusedField === 'email' ? '#F59E0B' : '#F59E0B99'
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <FaEnvelope />
                </motion.div>
                <motion.input 
                  required 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  placeholder="Your Email" 
                  className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/50 relative"
                  disabled={loading}
                  variants={inputVariants}
                  animate={focusedField === 'email' ? 'focus' : 'blur'}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 rounded-2xl opacity-0 pointer-events-none"
                  animate={{ opacity: focusedField === 'email' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="md:col-span-2 relative"
              >
                <motion.div
                  className="absolute left-4 top-6 text-gold/60 z-10"
                  animate={{
                    scale: focusedField === 'message' ? 1.2 : 1,
                    color: focusedField === 'message' ? '#F59E0B' : '#F59E0B99'
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <FaComment />
                </motion.div>
                <motion.textarea 
                  required 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  placeholder="Your Message" 
                  className="w-full pl-12 pr-4 py-4 bg-dark/50 border border-gold/20 rounded-2xl focus:border-gold focus:outline-none transition-all text-light placeholder-light/50 resize-none relative"
                  rows={6}
                  disabled={loading}
                  variants={inputVariants}
                  animate={focusedField === 'message' ? 'focus' : 'blur'}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/5 to-royal/5 rounded-2xl opacity-0 pointer-events-none"
                  animate={{ opacity: focusedField === 'message' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <div className="md:col-span-2 text-center">
                <motion.button 
                  type="submit"
                  className="flex items-center gap-3 px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-lg mx-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover={!loading ? "hover" : {}}
                  whileTap={!loading ? "tap" : {}}
                >
                  <motion.div
                    animate={loading ? { rotate: 360 } : { y: [0, -2, 0] }}
                    transition={loading ? 
                      { duration: 1, repeat: Infinity, ease: "linear" } :
                      { duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
                    }
                  >
                    <FaPaperPlane />
                  </motion.div>
                  <span className="relative z-10">{loading ? 'Sending...' : 'Send Message'}</span>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gold/20 to-royal/20 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    whileHover={!loading ? {
                      opacity: [0, 1, 0],
                      x: [-100, 200],
                      transition: { duration: 0.8, ease: "easeInOut" }
                    } : {}}
                  />
                </motion.button>

                {sent && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center mt-4 text-green-400 font-medium"
                  >
                    Message sent! I'll reply soon.
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center mt-4 text-red-400 font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </motion.form>

            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-dark/30 border border-gold/20 rounded-2xl p-6 inline-block relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-royal/5 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <p className="text-light/80 mb-4 relative z-10">Or email me directly:</p>
                <div className="space-y-3 relative z-10">
                  <div>
                    <p className="text-light/60 text-sm mb-1">Email-1:</p>
                    <motion.a 
                      href="mailto:123lamichhane@gmail.com" 
                      className="text-gold hover:text-royal font-semibold text-lg transition-colors relative"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "backOut" }
                      }}
                    >
                      <span className="relative z-10">123lamichhane@gmail.com</span>
                      <motion.div
                        className="absolute -inset-1 bg-gold/5 rounded opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </div>
                  <div>
                    <p className="text-light/60 text-sm mb-1">Email-2:</p>
                    <motion.a 
                      href="mailto:workforbixal127@gmail.com" 
                      className="text-gold hover:text-royal font-semibold text-lg transition-colors relative"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "backOut" }
                      }}
                    >
                      <span className="relative z-10">workforbixal127@gmail.com</span>
                      <motion.div
                        className="absolute -inset-1 bg-gold/5 rounded opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
            x: [0, 8, 0],
            y: [0, -6, 0]
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
            x: [0, -10, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-light/5 rounded-full blur-lg"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, -360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            delay: 3
          }}
        />
      </div>
    </section>
  )
}