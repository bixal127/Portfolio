import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
// Import the image using Vite's asset handling
import profileImage from '../assets/profile.jpg'

const Star = ({ id, initialX, initialY, color, size, mouseX, mouseY, onRemove }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 2, // Slightly reduced for smoother movement
    y: (Math.random() - 0.5) * 2  
  })
  const [opacity, setOpacity] = useState(0)
  const [lifecycle, setLifecycle] = useState('appearing')
  
  useEffect(() => {
    // Star lifecycle management
    const appearTimer = setTimeout(() => {
      setOpacity(1)
      setLifecycle('living')
    }, 300)

    const disappearTimer = setTimeout(() => {
      setLifecycle('disappearing')
      setOpacity(0)
    }, 12000 + Math.random() * 8000) // More varied lifespan

    const removeTimer = setTimeout(() => {
      onRemove(id)
    }, 13500 + Math.random() * 8000)

    return () => {
      clearTimeout(appearTimer)
      clearTimeout(disappearTimer)
      clearTimeout(removeTimer)
    }
  }, [id, onRemove])

  useEffect(() => {
    // Smoother continuous movement with mouse repulsion
    const moveInterval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + velocity.x
        let newY = prev.y + velocity.y
        
        // Mouse repulsion - smoother effect
        const distance = Math.sqrt(
          Math.pow(mouseX - prev.x, 2) + Math.pow(mouseY - prev.y, 2)
        )
        
        if (distance < 100 && distance > 0) {
          const angle = Math.atan2(prev.y - mouseY, prev.x - mouseX)
          const repulsionForce = (100 - distance) * 0.05 // Smoother repulsion
          
          newX += Math.cos(angle) * repulsionForce
          newY += Math.sin(angle) * repulsionForce
        }
        
        // Smooth bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) {
          setVelocity(v => ({ ...v, x: -v.x * 0.9 }))
          newX = Math.max(0, Math.min(window.innerWidth, newX))
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          setVelocity(v => ({ ...v, y: -v.y * 0.9 }))
          newY = Math.max(0, Math.min(window.innerHeight, newY))
        }

        return { x: newX, y: newY }
      })
    }, 50) // Slightly less frequent for smoother performance

    return () => clearInterval(moveInterval)
  }, [velocity, mouseX, mouseY])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: position.x - size/2,
        top: position.y - size/2,
        width: size,
        height: size,
      }}
      animate={{
        opacity: opacity,
        rotate: [0, 360],
        scale: lifecycle === 'appearing' ? [0, 1] : lifecycle === 'disappearing' ? [1, 0] : [1, 1.08, 1],
      }}
      transition={{
        opacity: { duration: 0.8, ease: "easeInOut" },
        rotate: { duration: 12 + Math.random() * 6, repeat: Infinity, ease: "linear" },
        scale: lifecycle === 'living' ? { 
          duration: 3 + Math.random() * 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        } : { duration: 0.8, ease: "easeInOut" }
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: color,
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          filter: 'drop-shadow(0 0 6px currentColor)',
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
      // Typing effect
      if (currentText.length < text.length) {
        const timer = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1))
        }, 100 + Math.random() * 50) // Variable typing speed for more natural feel
        
        return () => clearTimeout(timer)
      } else {
        // Finished typing, wait then start deleting
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        
        return () => clearTimeout(timer)
      }
    } else {
      // Deleting effect
      if (currentText.length > 0) {
        const timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 50)
        
        return () => clearTimeout(timer)
      } else {
        // Finished deleting, move to next text
        const timer = setTimeout(() => {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
          setIsTyping(true)
        }, 500)
        
        return () => clearTimeout(timer)
      }
    }
  }, [currentText, currentTextIndex, isTyping, texts])

  useEffect(() => {
    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={className}>
      {currentText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        |
      </span>
    </span>
  )
}

const StarField = () => {
  const [stars, setStars] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nextId, setNextId] = useState(0)
  const containerRef = useRef(null)

  const colors = [
    '#ff6b6b', '#ffd93d', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', 
    '#ff9f43', '#ffffff', '#ddd6fe', '#fef3c7', '#dcfce7',
  ]

  const createStar = () => {
    return {
      id: nextId,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 8, // Slightly more consistent sizes
    }
  }

  const removeStar = (id) => {
    setStars(prevStars => prevStars.filter(star => star.id !== id))
  }

  useEffect(() => {
    // Optimized initial star count
    const initialStars = []
    const numStars = Math.min(45, Math.max(25, Math.floor(window.innerWidth / 25)))
    
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
    // Smoother star generation
    const addStarInterval = setInterval(() => {
      setStars(prevStars => {
        const maxStars = Math.min(60, Math.max(30, Math.floor(window.innerWidth / 20)))
        
        if (prevStars.length < maxStars) {
          const newStar = createStar()
          setNextId(prev => prev + 1)
          return [...prevStars, { ...newStar, id: nextId }]
        }
        return prevStars
      })
    }, 800 + Math.random() * 1200) // More varied timing

    return () => clearInterval(addStarInterval)
  }, [nextId])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const handleResize = () => {
      const maxStars = Math.min(60, Math.max(30, Math.floor(window.innerWidth / 20)))
      setStars(prevStars => prevStars.slice(0, maxStars))
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
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

  return (
    <section id="home" className="min-h-screen w-full hero-gradient relative overflow-hidden">
      {/* Animated star field background */}
      <StarField />

      <div className="container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-20 lg:py-32 relative z-10 h-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 lg:mb-6"
          >
            Hi, I'm{' '}
            <motion.span 
              className="text-gold relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Bishal
              <motion.div
                className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-gradient-to-r from-gold to-royal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </motion.span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl text-light/80 mb-6 lg:mb-8 leading-relaxed min-h-[2em]"
          >
            <Typewriter 
              texts={typewriterTexts}
              className="text-royal font-semibold"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4"
          >
            <motion.a 
              href="#projects" 
              className="px-6 lg:px-8 py-3 lg:py-4 rounded-full btn-primary text-white font-semibold text-base lg:text-lg inline-flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#contact" 
              className="px-6 lg:px-8 py-3 lg:py-4 rounded-full btn-secondary text-light font-semibold text-base lg:text-lg inline-flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-3 lg:border-4 border-gold/30 shadow-2xl relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold/20 to-royal/20 rounded-full"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <img 
                src={profileImage} 
                alt="Bishal Lamichhane" 
                className="object-cover w-full h-full relative z-10"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0NDk1RSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNGMzlDMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9maWxlIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                  console.log('Profile image failed to load, using placeholder')
                }}
              />
            </div>
            
            {/* Floating decoration - smoother animation */}
            <motion.div
              className="absolute -top-2 lg:-top-4 -right-2 lg:-right-4 w-6 lg:w-8 h-6 lg:h-8 bg-gold rounded-full"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 w-4 lg:w-6 h-4 lg:h-6 bg-royal rounded-full"
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, ease: "easeOut" }}
        className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 lg:w-6 h-8 lg:h-10 border-2 border-gold rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 lg:w-1 h-2 lg:h-3 bg-gold rounded-full mt-1.5 lg:mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}