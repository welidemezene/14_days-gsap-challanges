import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// CONFIGURATION
const FRAME_COUNT = 51 // We have 51 frames in this specific sequence
// This is a public URL for a headphone sequence (frames 0001 to 0051)
const URL_PREFIX = "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/"
const FILE_NAME = (index) => `${index.toString().padStart(4, '0')}.jpg`

export default function Day11() {
  const container = useRef()
  const canvasRef = useRef()
  const [images, setImages] = useState([])
  const [percentLoaded, setPercentLoaded] = useState(0)

  // 1. PRELOAD IMAGES (The Heavy Lifting)
  useEffect(() => {
    let loadedCount = 0
    const imgArray = []

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image()
        img.src = URL_PREFIX + FILE_NAME(i)
        
        img.onload = () => {
            loadedCount++
            setPercentLoaded(Math.round((loadedCount / FRAME_COUNT) * 100))
            
            if (loadedCount === FRAME_COUNT) {
                // All loaded! Update state to trigger the animation setup
                setImages(imgArray) 
            }
        }
        imgArray.push(img)
    }
  }, [])

  // 2. THE ANIMATION (Only runs when images are ready)
  useGSAP(() => {
    if (images.length === 0) return // Wait for load

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    // Handle High-DPI screens (Retina)
    const setupCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Initial draw
        render(0)
    }
    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    // THE RENDER LOOP
    const playhead = { frame: 0 }
    
    function render(frameIndex) {
        // Clear old frame
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        const img = images[Math.round(frameIndex)]
        if (!img) return

        // "Contain" logic (Keep image aspect ratio centered)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width / 2) - (img.width / 2) * scale
        const y = (canvas.height / 2) - (img.height / 2) * scale
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale)
    }

    // THE SCROLLTRIGGER
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=4000", // 4000px scroll height
            pin: true,     // Lock screen
            scrub: 1,      // Smooth scrubbing
            // onUpdate: (self) => console.log(self.progress)
        }
    })

    // Animate the Frame Number (0 -> 50)
    tl.to(playhead, {
        frame: FRAME_COUNT - 1,
        snap: "frame", // Snap to integer
        ease: "none",
        onUpdate: () => render(playhead.frame)
    })

    // SYNCED TEXT ANIMATIONS
    // Text 1: Appears at start (Frame 0-10)
    tl.fromTo('.text-1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
    tl.to('.text-1', { opacity: 0, y: -50, duration: 0.5 }, 1)

    // Text 2: Appears in middle (Frame 20-30)
    tl.fromTo('.text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5)
    tl.to('.text-2', { opacity: 0, y: -50, duration: 0.5 }, 2.5)

    // Text 3: Appears at end (Frame 40-50)
    tl.fromTo('.text-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 3)

  }, { scope: container, dependencies: [images] }) // Re-run when images are loaded

  return (
    <div ref={container} style={{ height: '100vh', background: '#000', color: 'white', position: 'relative' }}>
      
      {/* LOADING SCREEN */}
      {percentLoaded < 100 && (
          <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: '#000', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column'
          }}>
              <h1 style={{ fontFamily: 'Helvetica', fontSize: '2rem' }}>LOADING ASSETS</h1>
              <div style={{ width: '200px', height: '2px', background: '#333', marginTop: '20px' }}>
                  <div style={{ width: `${percentLoaded}%`, height: '100%', background: '#fff', transition: 'width 0.1s' }} />
              </div>
          </div>
      )}

      {/* CANVAS LAYER (Behind Text) */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* OVERLAY TEXT LAYER (Front) */}
      <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          zIndex: 10, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
      }}>
          
          <div className="text-1" style={{ position: 'absolute', opacity: 0 }}>
             <h1 style={{ fontSize: '5rem', margin: 0, fontFamily: 'Helvetica' }}>AIRPODS PRO</h1>
             <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>Immersive Sound.</p>
          </div>

          <div className="text-2" style={{ position: 'absolute', opacity: 0 }}>
             <h1 style={{ fontSize: '5rem', margin: 0, fontFamily: 'Helvetica' }}>Active Noise Cancellation</h1>
             <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>Hear what you want to hear.</p>
          </div>

          <div className="text-3" style={{ position: 'absolute', opacity: 0 }}>
             <h1 style={{ fontSize: '5rem', margin: 0, fontFamily: 'Helvetica' }}>All-Day Battery</h1>
             <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>Experience the magic.</p>
          </div>

      </div>

    </div>
  )
}