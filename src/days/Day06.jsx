// import { useRef, useState, useEffect } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'

// // ------------------------------------------------------------------
// // COMPONENT 1: THE REUSABLE MAGNET
// // Wrap any button/div with this to make it sticky!
// // ------------------------------------------------------------------
// function Magnetic({ children }) {
//   const ref = useRef()

//   useGSAP(() => {
//     // 1. SETUP QUICKSETTERS
//     // quickTo is optimized for mouse movement. 
//     // It's 5x faster than gsap.to() for continuous updates.
//     const xTo = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
//     const yTo = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

//     // 2. MOUSE MOVE HANDLER
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e
//       // Get the position of the button on screen
//       const { height, width, left, top } = ref.current.getBoundingClientRect()
      
//       // Calculate center of button
//       const centerX = left + width / 2
//       const centerY = top + height / 2
      
//       // Calculate distance from center (Delta)
//       const x = clientX - centerX
//       const y = clientY - centerY

//       // Move the button relative to mouse
//       // Multiply by 0.5 to make it move HALF the speed of mouse (Resistance)
//       xTo(x * 0.35)
//       yTo(y * 0.35)
//     }

//     // 3. MOUSE LEAVE HANDLER
//     const handleMouseLeave = () => {
//       // Snap back to 0,0 (Original position)
//       xTo(0)
//       yTo(0)
//     }

//     // Add event listeners to the DOM element
//     ref.current.addEventListener("mousemove", handleMouseMove)
//     ref.current.addEventListener("mouseleave", handleMouseLeave)

//     // Cleanup
//     return () => {
//       if(ref.current) {
//         ref.current.removeEventListener("mousemove", handleMouseMove)
//         ref.current.removeEventListener("mouseleave", handleMouseLeave)
//       }
//     }
//   }, { scope: ref })

//   // We clone the child element to attach the ref directly to it
//   // This is a React Pattern called "Render Props" or "Clone Element"
//   return React.cloneElement(children, { ref })
// }

// import React from 'react' // Needed for cloneElement

// // ------------------------------------------------------------------
// // COMPONENT 2: THE CUSTOM CURSOR
// // A small dot that follows the mouse with lag
// // ------------------------------------------------------------------
// function Cursor() {
//     const circle = useRef()
    
//     useGSAP(() => {
//         // Center the circle on the mouse initially
//         gsap.set(circle.current, { xPercent: -50, yPercent: -50 })

//         // Create quickTo functions for smooth following
//         const xTo = gsap.quickTo(circle.current, "x", { duration: 0.6, ease: "power3.out" })
//         const yTo = gsap.quickTo(circle.current, "y", { duration: 0.6, ease: "power3.out" })

//         window.addEventListener("mousemove", (e) => {
//             xTo(e.clientX)
//             yTo(e.clientY)
//         })
//     })

//     return (
//         <div ref={circle} style={{
//             position: 'fixed', top: 0, left: 0,
//             width: 20, height: 20,
//             backgroundColor: '#00ff88',
//             borderRadius: '50%',
//             pointerEvents: 'none', // Crucial: lets clicks pass through
//             zIndex: 9999,
//             mixBlendMode: 'difference' // Cool effect on white backgrounds
//         }} />
//     )
// }

// // ------------------------------------------------------------------
// // THE MAIN DAY 06 PAGE
// // ------------------------------------------------------------------
// export default function Day06() {
//   const container = useRef()

//   return (
//     <div ref={container} style={{ 
//         height: '100%', background: '#111', color: 'white', 
//         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//         cursor: 'none' // Hide default cursor
//     }}>
      
//       <Cursor />

//       <h1 style={{ fontSize: '4vw', marginBottom: 50, opacity: 0.5 }}>MOUSE INTERACTION</h1>

//       <div style={{ display: 'flex', gap: 50 }}>
        
//         {/* BUTTON 1: WRAPPED IN MAGNET */}
//         <Magnetic>
//             <div style={{ 
//                 width: 150, height: 150, 
//                 background: '#333', 
//                 borderRadius: '50%',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer',
//                 border: '1px solid #555'
//             }}>
//                 <span style={{ fontWeight: 'bold' }}>HOVER ME</span>
//             </div>
//         </Magnetic>

//         {/* BUTTON 2: WRAPPED IN MAGNET */}
//         <Magnetic>
//             <div style={{ 
//                 width: 200, height: 200, 
//                 background: '#00ff88', color: 'black',
//                 borderRadius: '50%',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer'
//             }}>
//                 <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>WORK</span>
//             </div>
//         </Magnetic>

//       </div>

//       <p style={{ marginTop: 50, maxWidth: 400, textAlign: 'center', lineHeight: 1.5, color: '#888' }}>
//         The cursor uses <code>mix-blend-mode: difference</code> to invert colors. <br/>
//         The buttons calculate <code>damped distance</code> to pull towards the mouse.
//       </p>

//     </div>
//   )
// }



import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// ------------------------------------------------------------------
// 1. THE MAGNETIC WRAPPER (The Magic Component)
// Wraps ANY element and makes it sticky to the mouse
// ------------------------------------------------------------------
const Magnetic = ({ children }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    // A. SETUP QUICKSETTERS (Performance Optimization)
    // We use Elastic ease for that "wobbly" organic feel
    const xTo = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    // B. MOUSE MOVE LOGIC
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = ref.current.getBoundingClientRect()
      
      // Calculate center of the element
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      // Calculate distance from center (The Pull)
      // We multiply by 0.35 to weaken the pull (it shouldn't follow 1:1)
      const x = (clientX - centerX) * 0.35
      const y = (clientY - centerY) * 0.35

      // Push to GSAP
      xTo(x)
      yTo(y)
    }

    // C. MOUSE LEAVE LOGIC (Snap Back)
    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    // Listeners
    ref.current.addEventListener("mousemove", handleMouseMove)
    ref.current.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove)
        ref.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Clone the child to attach the ref without adding an extra <div> wrapper
  return React.cloneElement(children, { ref })
}

// ------------------------------------------------------------------
// 2. THE CUSTOM CURSOR
// A dot that follows the mouse with lag
// ------------------------------------------------------------------
const Cursor = () => {
    const circle = useRef()
    
    useGSAP(() => {
        // Center the circle on the mouse pointer
        gsap.set(circle.current, { xPercent: -50, yPercent: -50 })

        // Smooth follow logic
        const xTo = gsap.quickTo(circle.current, "x", { duration: 0.6, ease: "power3.out" })
        const yTo = gsap.quickTo(circle.current, "y", { duration: 0.6, ease: "power3.out" })

        window.addEventListener("mousemove", (e) => {
            xTo(e.clientX)
            yTo(e.clientY)
        })
    }, { scope: circle })

    return (
        <div ref={circle} style={{
            position: 'fixed', top: 0, left: 0,
            width: '20px', height: '20px',
            backgroundColor: '#00ff88',
            borderRadius: '50%',
            pointerEvents: 'none', // Crucial: lets clicks pass through
            zIndex: 9999,
            mixBlendMode: 'difference' // Inverts colors behind it
        }} />
    )
}

// ------------------------------------------------------------------
// 3. THE MAIN PAGE (Day 6)
// ------------------------------------------------------------------
export default function Day06() {
  const container = useRef()

  return (
    <div ref={container} style={{ 
        height: '100vh', background: '#111', color: 'white', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'none', // Hide the default arrow cursor
        fontFamily: 'Helvetica, sans-serif'
    }}>
      
      <Cursor />

      <h1 style={{ fontSize: '4vw', marginBottom: 60, opacity: 0.3, letterSpacing: '-2px' }}>
          INTERACTION
      </h1>

      <div style={{ display: 'flex', gap: 60 }}>
        
        {/* BUTTON 1: THE ORB */}
        <Magnetic>
            <div style={{ 
                width: 150, height: 150, 
                background: '#222', 
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid #333'
            }}>
                <span style={{ fontWeight: 'bold' }}>HOVER ME</span>
            </div>
        </Magnetic>

        {/* BUTTON 2: THE PRIMARY ACTION */}
        <Magnetic>
            <button style={{ 
                width: 200, height: 200, 
                background: '#00ff88', color: 'black',
                borderRadius: '50%', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '1.5rem', fontWeight: '900'
            }}>
                WORK
            </button>
        </Magnetic>
        
        {/* BUTTON 3: TEXT LINK */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
            <Magnetic>
                <h2 style={{ fontSize: '2rem', margin: 0, cursor: 'pointer' }}>INSTAGRAM</h2>
            </Magnetic>
            <Magnetic>
                <h2 style={{ fontSize: '2rem', margin: 0, cursor: 'pointer' }}>LINKEDIN</h2>
            </Magnetic>
        </div>

      </div>

      <p style={{ position: 'absolute', bottom: 40, opacity: 0.5 }}>
          Move your mouse fast. Feel the weight.
      </p>

    </div>
  )
}