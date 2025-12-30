import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Custom Split Text (Same as before)
const SplitText = ({ children, className }) => {
  return (
    <span className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {children.split('').map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'transform' }}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default function Day03() {
  const container = useRef()
  const [replay, setReplay] = useState(0)

  useGSAP(() => {
    const tl = gsap.timeline()

    // 1. SETUP: Force 3D Perspective
    // We set this initially so the browser prepares for 3D transforms
    gsap.set('.grid-box', { 
        transformPerspective: 600, // Makes the 3D flips look deep
        transformOrigin: "center center",
        rotationX: 0,
        rotationY: 0,
        scale: 0,
        opacity: 0
    })

    // 2. THE COMPLEX STAGGER (The "Cyber" Effect)
    tl.to('.grid-box', {
        // KEYFRAMES: The box does 3 things in sequence
        keyframes: [
            { opacity: 1, scale: 1, duration: 0.4 }, // 1. Pop in
            { rotationX: 180, background: '#00ff88', duration: 0.4 }, // 2. Flip & Turn Green
            { rotationX: 360, background: '#333', scale: 0.5, duration: 0.4 } // 3. Flip back & Shrink
        ],
        // THE STAGGER LOGIC
        stagger: {
            amount: 2,        // Spread over 2 seconds
            grid: [10, 10],   // 10x10 Grid logic
            from: "center",   // Ripple from center
            ease: "power3.inOut" // The easing of the WAVE (not the box)
        },
        ease: "power1.inOut" // The easing of the KEYFRAMES
    })

    // 3. TEXT REVEAL (The "Hacker" Effect)
    // Random function-based Y values
    tl.fromTo('.char', 
        { 
            y: (i) => i % 2 === 0 ? 100 : -100, // Even letters go Up, Odd letters go Down
            opacity: 0,
            filter: 'blur(10px)'
        },
        { 
            y: 0, 
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1, 
            stagger: {
                amount: 0.5,
                from: "random" // Letters appear randomly, not left-to-right
            },
            ease: 'power3.out'
        }, 
        "-=1.5" // Overlap with grid
    )

    // 4. IDLE LOOP (Breathing)
    // After the intro, we want the grid to keep moving forever.
    tl.to('.grid-box', {
        scale: 0.2,
        rotation: 45,
        opacity: 0.5,
        duration: 2,
        repeat: -1, // Infinite Loop
        yoyo: true, // Back and Forth
        ease: "sine.inOut",
        stagger: {
            amount: 1,
            grid: [10, 10],
            from: "center"
        }
    })

  }, { scope: container, dependencies: [replay] })

  return (
    <div ref={container} style={{ 
        height: '100vh', background: '#050505', color: 'white', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', position: 'relative', fontFamily: 'monospace'
    }}>
      
      {/* BACKGROUND GRID */}
      <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10,
          width: '600px', height: '600px',
          zIndex: 0
      }}>
        {[...Array(100)].map((_, i) => (
            <div key={i} className="grid-box" style={{ 
                width: '100%', height: '100%', 
                background: '#333', borderRadius: '2px',
                border: '1px solid #222'
            }} />
        ))}
      </div>

      {/* FOREGROUND TEXT */}
      <div style={{ zIndex: 10, textAlign: 'center', pointerEvents: 'none', mixBlendMode: 'difference' }}>
        <h1 style={{ fontSize: '7vw', margin: 0, lineHeight: 0.9 }}>
            <SplitText>SYSTEM</SplitText>
        </h1>
        <h1 style={{ fontSize: '7vw', margin: 0, lineHeight: 0.9, color: '#00ff88' }}>
            <SplitText>ONLINE</SplitText>
        </h1>
      </div>

      {/* REPLAY BUTTON */}
      <button 
        onClick={() => setReplay(prev => prev + 1)}
        style={{ 
            zIndex: 20, marginTop: 60, padding: '15px 40px', 
            background: 'transparent', border: '1px solid #00ff88', color: '#00ff88',
            fontFamily: 'monospace', fontSize: '1rem', cursor: 'pointer',
            transition: 'all 0.3s'
        }}
        onMouseOver={(e) => { e.target.style.background = '#00ff88'; e.target.style.color = 'black' }}
        onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#00ff88' }}
      >
        // REBOOT_SYSTEM
      </button>

    </div>
  )
}