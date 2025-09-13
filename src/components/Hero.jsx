import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
// Import the image using Vite's asset handling
import profileImage from '../assets/profile.jpg'

const Star = ({ id, initialX, initialY, color, size, mouseX, mouseY, onRemove }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [opacity, setOpacity] = useState(0)
  const [lifecycle, setLifecycle] = useState('appearing')
  const velocityRef = useRef({
    x: (Math.random() - 0.5) * 0.8,
    y: (Math.random() - 0.5) * 0.8
  })
  const animationRef = useRef()
  const lastUpdateRef = useRef(0)
  
  useEffect(() => {
    // Enhanced star lifecycle with smoother transitions
    const appearTimer = setTimeout(() => {
      setOpacity(1)
      setLifecycle('living')
    }, 150)

    const disappearTimer = setTimeout(() => {
      setLifecycle('disappearing')
      setOpacity(0)
    }, 4000 + Math.random() * 3000)

    const removeTimer = setTimeout(() => {
      onRemove(id)
    }, 5500 + Math.random() * 2000)

    return () => {
      clearTimeout(appearTimer)
      clearTimeout(disappearTimer)
      clearTimeout(removeTimer)
    }
  }, [id, onRemove])

  useEffect(() => {
    // Smoother movement with better performance
    const animate = (currentTime) => {
      if (currentTime - lastUpdateRef.current < 16) { // 60fps
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastUpdateRef.current = currentTime
      
      setPosition(prev => {
        let newX = prev.x + velocityRef.current.x
        let newY = prev.y + velocityRef.current.y
        
        // Enhanced mouse interaction with smoother repulsion
        const distance = Math.sqrt(
          Math.pow(mouseX - prev.x, 2) + Math.pow(mouseY - prev.y, 2)
        )
        
        if (distance < 80 && distance > 0) {
          const angle = Math.atan2(prev.y - mouseY, prev.x - mouseX)
          const repulsionForce = Math.max(0, (80 - distance) * 0.025)
          
          newX += Math.cos(angle) * repulsionForce
          newY += Math.sin(angle) * repulsionForce
          
          // Add some randomness for more organic movement
          velocityRef.current.x += (Math.random() - 0.5) * 0.02
          velocityRef.current.y += (Math.random() - 0.5) * 0.02
        }
        
        // Smooth bounce off edges with damping
        if (newX <= 0 || newX >= window.innerWidth) {
          velocityRef.current.x = -velocityRef.current.x * 0.8
          newX = Math.max(0, Math.min(window.innerWidth, newX))
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          velocityRef.current.y = -velocityRef.current.y * 0.8
          newY = Math.max(0, Math.min(window.innerHeight, newY))
        }

        // Gradual velocity decay for more realistic movement
        velocityRef.current.x *= 0.999
        velocityRef.current.y *= 0.999

        return { x: newX, y: newY }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: position.x - size/2,
        top: position.y - size/2,
        width: size,
        height: size,
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
      animate={{
        opacity: opacity,
        rotate: lifecycle === 'appearing' ? [0, 360] : 
               lifecycle === 'disappearing' ? [0, -360] : 
               [0, 360, 720],
        scale: lifecycle === 'appearing' ? [0, 1] : 
               lifecycle === 'disappearing' ? [1, 0] : 
               [1, 1.1, 1],
      }}
      transition={{
        opacity: { 
          duration: lifecycle === 'appearing' || lifecycle === 'disappearing' ? 0.8 : 1,
          ease: [0.4, 0, 0.2, 1]
        },
        rotate: { 
          duration: lifecycle === 'living' ? 12 + Math.random() * 6 : 1.5,
          repeat: lifecycle === 'living' ? Infinity : 0,
          ease: "linear"
        },
        scale: lifecycle === 'living' ? { 
          duration: 3 + Math.random() * 2, 
          repeat: Infinity, 
          ease: [0.4, 0, 0.6, 1]
        } : { 
          duration: lifecycle === 'appearing' ? 0.8 : 0.6,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(45deg, ${color}, ${color}dd)`,
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          filter: 'drop-shadow(0 0 8px currentColor) brightness(1.1)',
        }}
      />
    </motion.div>
  )
}

const Typewriter = ({ texts, className }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const text = texts[currentTextIndex]
    
    if (isTyping) {
      if (currentText.length < text.length) {
        const timer = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1))
        }, 80 + Math.random() * 40) // Slightly faster typing
        
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 2500) // Longer pause to read
        
        return () => clearTimeout(timer)
      }
    } else {
      if (currentText.length > 0) {
        const timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 40) // Faster deletion
        
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
          setIsTyping(true)
        }, 500)
        
        return () => clearTimeout(timer)
      }
    }
  }, [currentText, currentTextIndex, isTyping, texts])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500) // Smoother cursor blink

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={className}>
      {currentText}
      <motion.span 
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="text-gold"
      >
        |
      </motion.span>
    </span>
  )
}

const StarField = () => {
  const [stars, setStars] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nextId, setNextId] = useState(0)
  const containerRef = useRef(null)

  const colors = [
    '#F59E0B', '#06B6D4', '#F3F4F6', '#D97706', '#0891B2', 
    '#FBBF24', '#22D3EE', '#E5E7EB'
  ]

  const createStar = () => {
    return {
      id: nextId,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 6,
    }
  }

  const removeStar = (id) => {
    setStars(prevStars => prevStars.filter(star => star.id !== id))
  }

  useEffect(() => {
    const initialStars = []
    const numStars = Math.min(35, Math.max(15, Math.floor(window.innerWidth / 50)))
    for (let i = 0; i < numStars; i++) {
      initialStars.push({
        ...createStar(),
        id: i
      })
    }
    setStars(initialStars)
    setNextId(numStars)
  }, [])

  useEffect(() => {
    const addStarInterval = setInterval(() => {
      setStars(prevStars => {
        const maxStars = Math.min(45, Math.max(20, Math.floor(window.innerWidth / 40)))
        if (prevStars.length < maxStars) {
          const newStar = createStar()
          setNextId(prev => prev + 1)
          return [...prevStars, { ...newStar, id: nextId }]
        }
        return prevStars
      })
    }, 1500 + Math.random() * 1000)

    return () => clearInterval(addStarInterval)
  }, [nextId])

  useEffect(() => {
    let mouseMoveTimeout
    const handleMouseMove = (e) => {
      if (mouseMoveTimeout) return
      
      mouseMoveTimeout = setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          })
        }
        mouseMoveTimeout = null
      }, 8) // Smoother tracking
    }

    const handleResize = () => {
      const maxStars = Math.min(45, Math.max(20, Math.floor(window.innerWidth / 40)))
      setStars(prevStars => prevStars.slice(0, maxStars))
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        if (mouseMoveTimeout) {
          clearTimeout(mouseMoveTimeout)
        }
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden star-field pointer-events-none">
      {stars.map(star => (
        <Star
          key={star.id}
          id={star.id}
          initialX={star.x}
          initialY={star.y}
          color={star.color}
          size={star.size}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          onRemove={removeStar}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const typewriterTexts = [
    "Student",
    "Front-end Developer", 
    "Aspiring Full Stack Developer"
  ]

  // Enhanced scroll to section with smooth animation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="home" className="flex-1 w-full h-full bg-darker overflow-hidden flex items-center justify-center z-0 relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <StarField />
      </div>

      <div className="container grid lg:grid-cols-2 gap-4 lg:gap-8 items-center py-0 lg:py-8 relative z-10 w-full h-full min-h-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 lg:mb-6 w-full"
          >
            Hi, I'm{' '}
            <motion.span 
              className="text-gold relative inline-block"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "backOut" }
              }}
              onHoverStart={() => {
                // Add subtle particle effect on hover
              }}
            >
              Bishal
              <motion.div
                className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-gradient-to-r from-gold to-royal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.div
                className="absolute -inset-2 bg-gold/5 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl text-light/80 mb-6 lg:mb-8 leading-relaxed min-h-[2em] w-full"
          >
            <Typewriter 
              texts={typewriterTexts}
              className="text-royal font-semibold"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4"
          >
            <motion.a 
              href="#projects" 
              className="px-6 lg:px-8 py-3 lg:py-4 rounded-full btn-primary text-white font-semibold text-base lg:text-lg inline-flex items-center justify-center relative overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                transition: { duration: 0.3, ease: "backOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: "easeOut" }
              }}
              onHoverStart={() => {}}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/20 to-royal/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a 
              href="#contact" 
              className="px-6 lg:px-8 py-3 lg:py-4 rounded-full btn-secondary text-light font-semibold text-base lg:text-lg inline-flex items-center justify-center relative overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                transition: { duration: 0.3, ease: "backOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: "easeOut" }
              }}
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/10 to-royal/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <motion.div 
            className="relative"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4, ease: "backOut" }
            }}
          >
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-3 lg:border-4 border-gold/30 shadow-2xl relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold/20 to-royal/20 rounded-full"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-royal/10 to-gold/10 rounded-full opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <img 
                src={profileImage} 
                alt="Bishal Lamichhane" 
                className="object-cover w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0NDk1RSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNGMzlDMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9maWxlIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                  console.log('Profile image failed to load, using placeholder')
                }}
              />
            </div>
            
            {/* Enhanced floating decorations */}
            <motion.div
              className="absolute -top-2 lg:-top-4 -right-2 lg:-right-4 w-6 lg:w-8 h-6 lg:h-8 bg-gold rounded-full shadow-lg shadow-gold/25"
              animate={{ 
                y: [-8, 8, -8],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: [0.4, 0, 0.6, 1]
              }}
            />
            <motion.div
              className="absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 w-4 lg:w-6 h-4 lg:h-6 bg-royal rounded-full shadow-lg shadow-royal/25"
              animate={{ 
                y: [8, -8, 8],
                rotate: [360, 180, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                delay: 2.5,
                ease: [0.4, 0, 0.6, 1]
              }}
            />
            <motion.div
              className="absolute top-1/2 -left-8 lg:-left-12 w-3 lg:w-4 h-3 lg:h-4 bg-light rounded-full opacity-60"
              animate={{ 
                x: [-5, 5, -5],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: 1,
                ease: [0.4, 0, 0.6, 1]
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3, ease: "backOut" }
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
          className="w-5 lg:w-6 h-8 lg:h-10 border-2 border-gold rounded-full flex justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
            className="w-0.5 lg:w-1 h-2 lg:h-3 bg-gold rounded-full mt-1.5 lg:mt-2"
          />
          <motion.div
            className="absolute inset-0 bg-gold/10 rounded-full opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}