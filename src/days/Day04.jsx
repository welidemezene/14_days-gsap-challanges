// import { useRef } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function Day04() {
//   const container = useRef()
//   const svgRef = useRef()

//   useGSAP(() => {
//     // 1. SETUP THE PATH (The "Cable")
//     const path = svgRef.current.querySelector('.trace-path')
//     const totalLength = path.getTotalLength()

//     // Hide the line initially using the Dash Array trick
//     gsap.set(path, { 
//       strokeDasharray: totalLength,
//       strokeDashoffset: totalLength
//     })

//     // 2. MASTER TIMELINE (Linked to Scroll)
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container.current,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1, // Smooth dragging
//       }
//     })

//     // A. DRAW THE LINE
//     tl.to(path, {
//       strokeDashoffset: 0,
//       ease: "none",
//       duration: 10 // Relative duration used for spacing events
//     })

//     // B. ACTIVATE NODES (Timing based on line progress)
//     // The line is roughly defined. We time the explosions when the line "hits" that Y position.
    
//     // Node 1 (Start)
//     tl.fromTo('.node-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 0.5)
//     tl.fromTo('.card-1', { x: -50, opacity: 0 }, { x: 0, opacity: 1 }, 0.5)

//     // Node 2 (Middle) - Happens around 35% down the line
//     tl.fromTo('.node-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 3.5)
//     tl.fromTo('.card-2', { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, 3.5)

//     // Node 3 (End) - Happens around 75% down the line
//     tl.fromTo('.node-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 7.5)
//     tl.fromTo('.card-3', { x: -50, opacity: 0 }, { x: 0, opacity: 1 }, 7.5)

//     // C. FINAL GLOW (At the very end)
//     tl.to(path, { 
//         strokeWidth: 10, 
//         filter: "drop-shadow(0px 0px 20px #00ffff)", 
//         duration: 1 
//     }, 9)

//   }, { scope: container })

//   return (
//     <div ref={container} style={{ 
//         position: 'relative', 
//         width: '100%', 
//         height: '400vh', // VERY TALL to allow scrolling
//         background: '#050505', 
//         color: 'white',
//         overflow: 'hidden'
//     }}>
      
//       {/* 1. THE FIXED SVG LAYER (Behind everything) */}
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none' }}>
//         <svg 
//             ref={svgRef} 
//             viewBox="0 0 600 800" 
//             preserveAspectRatio="xMidYMid slice" 
//             style={{ width: '100%', height: '100%' }}
//         >
//             <defs>
//                 {/* CYBERPUNK GRADIENT */}
//                 <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#ff0055" />
//                     <stop offset="50%" stopColor="#00ffff" />
//                     <stop offset="100%" stopColor="#ccff00" />
//                 </linearGradient>
//             </defs>

//             {/* THE PATH (S-Curve) */}
//             <path 
//                 className="trace-path"
//                 d="M 300 0 
//                    Q 300 200, 100 300 
//                    T 300 600
//                    T 500 900" 
//                 fill="none" 
//                 stroke="url(#neonGradient)" 
//                 strokeWidth="6" 
//                 strokeLinecap="round"
//             />

//             {/* DECORATIVE NODES (Placed manually on the path curve) */}
//             {/* Node 1 */}
//             <circle className="node-1" cx="300" cy="50" r="10" fill="#fff" />
//             {/* Node 2 */}
//             <circle className="node-2" cx="100" cy="300" r="15" fill="#fff" />
//             {/* Node 3 */}
//             <circle className="node-3" cx="300" cy="600" r="20" fill="#fff" />

//         </svg>
//       </div>

//       {/* 2. THE HTML CONTENT LAYER (Scrolls normally) */}
//       {/* We space these out to match the drawing speed */}
      
//       {/* CARD 1 */}
//       <div className="card-1" style={{ position: 'absolute', top: '10vh', left: '10%', maxWidth: '300px' }}>
//         <h1 style={{ fontSize: '3rem', margin: 0 }}>INITIATE</h1>
//         <p style={{ opacity: 0.7 }}>Secure connection established. <br/>Protocol v.2.0 active.</p>
//       </div>

//       {/* CARD 2 */}
//       <div className="card-2" style={{ position: 'absolute', top: '120vh', right: '10%', maxWidth: '300px', textAlign: 'right' }}>
//         <h1 style={{ fontSize: '3rem', margin: 0, color: '#00ffff' }}>PROCESS</h1>
//         <p style={{ opacity: 0.7 }}>Data flowing through neural nodes. <br/>Encryption: AES-256.</p>
//       </div>

//       {/* CARD 3 */}
//       <div className="card-3" style={{ position: 'absolute', top: '250vh', left: '10%', maxWidth: '300px' }}>
//         <h1 style={{ fontSize: '3rem', margin: 0, color: '#ccff00' }}>COMPLETE</h1>
//         <p style={{ opacity: 0.7 }}>Transaction verified. <br/>System fully operational.</p>
//       </div>

//       <div style={{ position: 'absolute', bottom: 50, width: '100%', textAlign: 'center', opacity: 0.5 }}>
//         SCROLL COMPLETE
//       </div>

//     </div>
//   )
// }




import { useRef, useMemo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Day04() {
  const container = useRef()
  const hudRef = useRef()

  // 1. GENERATE PROCEDURAL RINGS (Math instead of drawing)
  // We create 15 rings with random dashes to look like a complex scanning system
  const rings = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      r: 50 + i * 15, // Radius increases
      dash: Math.random() * 200 + 50, // Random dash length
      gap: Math.random() * 100 + 20, // Random gap
      speed: (Math.random() - 0.5) * 4, // Random rotation speed
      color: i % 2 === 0 ? '#00ffff' : '#ff0055', // Cyan/Pink split
      width: Math.random() * 2 + 0.5 // Random thickness
    }))
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()
    const allCircles = gsap.utils.toArray('.hud-ring')

    // A. PREPARE LINES (Hide them)
    allCircles.forEach(circle => {
        const len = circle.getTotalLength()
        gsap.set(circle, { strokeDasharray: len, strokeDashoffset: len })
    })

    // B. THE "BOOT SEQUENCE" (Draws itself on load)
    tl.to(allCircles, {
        strokeDashoffset: (i) => {
            // Calculate a dashed pattern based on our random data
            const c = rings[i]
            const len = allCircles[i].getTotalLength()
            return len - (len / 2) // Draw only half the circle for a tech look
        },
        strokeDasharray: (i) => `${rings[i].dash} ${rings[i].gap}`, // Apply the tech pattern
        duration: 2,
        stagger: { amount: 1, from: "center" }, // Draw from center out
        ease: "power2.inOut"
    })
    
    // C. THE GLOW UP (Flash white then color)
    tl.fromTo(allCircles, 
        { stroke: '#ffffff', strokeWidth: 5, filter: 'blur(2px)' },
        { stroke: (i) => rings[i].color, strokeWidth: (i) => rings[i].width, filter: 'blur(0px)', duration: 0.5 },
        "-=0.5"
    )

    // D. INFINITE ROTATION (The HUD is alive)
    allCircles.forEach((circle, i) => {
        gsap.to(circle, {
            rotation: 360 * rings[i].speed, // Use the random speed
            transformOrigin: "center center",
            duration: 20,
            repeat: -1,
            ease: "none"
        })
    })

    // E. SCROLL INTERACTION (3D TILT)
    // As you scroll, the HUD tilts back like a hologram table
    gsap.to(hudRef.current, {
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        },
        rotationX: 60, // Tilt back
        scale: 1.5,    // Zoom in
        y: 100,        // Move down
        opacity: 0.2   // Fade out slightly
    })

    // F. TEXT REVEAL
    gsap.from('.data-text', {
        scrollTrigger: {
            trigger: container.current,
            start: "top center",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    })

  }, { scope: container })

  return (
    <div ref={container} style={{ 
        width: '100%', minHeight: '200vh', 
        background: '#050505', color: 'white', 
        fontFamily: 'monospace', overflow: 'hidden',
        perspective: '1000px' // CRITICAL: Enables 3D CSS
    }}>
      
      {/* FIXED HUD LAYER */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* THE SVG CONTAINER */}
        <div ref={hudRef} style={{ width: '600px', height: '600px', transformStyle: 'preserve-3d' }}>
            <svg viewBox="0 0 600 600" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                
                {/* Glow Filter */}
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* PROCEDURAL RINGS */}
                <g style={{ transformBox: 'fill-box' }}> {/* Fix rotation origin */}
                    {rings.map((r, i) => (
                        <circle 
                            key={i} 
                            className="hud-ring"
                            cx="300" cy="300" r={r.r} 
                            fill="none" 
                            stroke={r.color} 
                            strokeWidth={r.width}
                            filter="url(#glow)"
                        />
                    ))}
                </g>

                {/* Center Core */}
                <circle cx="300" cy="300" r="10" fill="#fff" className="hud-core">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                </circle>

            </svg>
        </div>

      </div>

      {/* FOREGROUND CONTENT */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '40vh' }}>
        <h1 style={{ fontSize: '5rem', margin: 0, letterSpacing: '10px' }}>SYSTEM</h1>
        <h2 style={{ fontSize: '2rem', color: '#00ffff' }}>SECURE // ONLINE</h2>
      </div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '60vh', paddingBottom: '20vh' }}>
        {['ENCRYPTION: AES-256', 'NODES: ACTIVE', 'THREAT LEVEL: 0', 'UPTIME: 99.99%'].map((text, i) => (
            <div key={i} className="data-text" style={{ 
                fontSize: '1.5rem', 
                borderBottom: '1px solid #333', 
                padding: '20px', 
                maxWidth: '400px', 
                margin: '0 auto',
                display: 'flex', justifyContent: 'space-between'
            }}>
                <span>{text.split(':')[0]}</span>
                <span style={{ color: '#00ffff' }}>{text.split(':')[1]}</span>
            </div>
        ))}
      </div>

    </div>
  )
}