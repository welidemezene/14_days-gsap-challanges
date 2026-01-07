import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// CONFIGURATION
const FRAME_COUNT = 51 
const URL_PREFIX = "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/"
const FILE_NAME = (index) => `${index.toString().padStart(4, '0')}.jpg`

export default function Day11() {
  const container = useRef()
  const canvasRef = useRef()
  const [images, setImages] = useState([])
  const [percentLoaded, setPercentLoaded] = useState(0)

  // 1. PRELOAD IMAGES
  useEffect(() => {
    let loadedCount = 0
    const imgArray = []

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image()
        img.src = URL_PREFIX + FILE_NAME(i)
        img.onload = () => {
            loadedCount++
            setPercentLoaded(Math.round((loadedCount / FRAME_COUNT) * 100))
            if (loadedCount === FRAME_COUNT) setImages(imgArray)
        }
        imgArray.push(img)
    }
  }, [])

  // 2. THE RENDER LOGIC
  useGSAP(() => {
    if (images.length === 0) return 

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const playhead = { frame: 0 }

    // --- RESPONSIVE CANVAS SETUP ---
    const render = () => {
        const img = images[Math.round(playhead.frame)] || images[0]
        if (!img) return

        const dpr = window.devicePixelRatio || 1
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
        context.scale(dpr, dpr)

        const canvasWidth = window.innerWidth
        const canvasHeight = window.innerHeight
        const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height)
        
        const x = (canvasWidth / 2) - (img.width / 2) * scale
        const y = (canvasHeight / 2) - (img.height / 2) * scale
        
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        context.drawImage(img, x, y, img.width * scale, img.height * scale)
    }

    // Initial Draw
    render()
    window.addEventListener('resize', render)

    // --- SCROLL ANIMATION ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=4000", 
            pin: true,
            scrub: 0.5,
        }
    })

    // Animate Frames
    tl.to(playhead, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render 
    })

    // --- TEXT ANIMATIONS ---
    
    // TEXT 1: Start Visible -> Fade Out (0% to 20% scroll)
    tl.fromTo('.text-1', { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 0.5 }, 0)

    // TEXT 2: Fade In -> Fade Out (30% to 60% scroll)
    tl.fromTo('.text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 1)
    tl.to('.text-2', { opacity: 0, y: -50, duration: 0.5 }, 2)

    // TEXT 3: Fade In (80% to 100% scroll)
    tl.fromTo('.text-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 3)

    return () => window.removeEventListener('resize', render)

  }, { scope: container, dependencies: [images] })

  return (
    <div ref={container} style={{ height: '100vh', background: '#000', color: 'white', position: 'relative' }}>
      
      {/* 3. RESPONSIVE CSS INJECTION */}
      <style>{`
        h1 { font-size: clamp(2.5rem, 6vw, 6rem); margin: 0; font-family: 'Helvetica Neue', sans-serif; letter-spacing: -0.05em; line-height: 1; }
        p { font-size: clamp(1rem, 2vw, 1.5rem); opacity: 0.8; margin-top: 10px; font-family: sans-serif; font-weight: 300; }
        
        .text-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            text-align: center;
            pointer-events: none; /* Let clicks pass through */
            padding: 20px;
            box-sizing: border-box;
            z-index: 10;
            
            /* FIX: Make text visible on light AND dark backgrounds */
            mix-blend-mode: difference; 
            color: white;
        }

        .text-block { position: absolute; width: 100%; max-width: 800px; opacity: 0; }
        
        /* Loader Styles */
        .loader {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 999;
            display: flex; align-items: center; justify-content: center;
            flex-direction: column;
        }
        .bar-container { width: 200px; height: 4px; background: #333; margin-top: 20px; border-radius: 2px; }
        .bar-fill { height: 100%; background: #fff; transition: width 0.1s linear; }
      `}</style>

      {/* LOADER */}
      {percentLoaded < 100 && (
          <div className="loader">
              <h1 style={{ fontSize: '1.5rem', mixBlendMode: 'normal' }}>LOADING EXPERIENCE</h1>
              <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${percentLoaded}%` }} />
              </div>
          </div>
      )}

      {/* CANVAS LAYER */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* TEXT LAYERS */}
      <div className="text-overlay">
          <div className="text-block text-1">
             {/* Force opacity: 1 inline to override CSS default */}
             <div style={{opacity: 1}}> 
                 <h1>AIRPODS PRO</h1>
                 <p>Rebuilt from sound up.</p>
             </div>
          </div>

          <div className="text-block text-2">
             <h1>ACTIVE NOISE CANCELLATION</h1>
             <p>Immersive sound. Transparency mode.</p>
          </div>

          <div className="text-block text-3">
             <h1>MAGICAL</h1>
             <p>Experience the new standard.</p>
          </div>
      </div>

    </div>
  )
}