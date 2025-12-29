// import { useRef, useState } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'

// export default function Day02() {
//   const container = useRef()
//   // State to track if menu is open
//   const [isOpen, setIsOpen] = useState(false)
  
//   // Store the timeline to control it later
//   const tl = useRef()

//   useGSAP(() => {
//     // 1. CREATE TIMELINE (Paused)
//     tl.current = gsap.timeline({ paused: true })

//     // A. Expand Overlay (Clip Path)
//     tl.current.to('.menu-overlay', {
//       duration: 1.25,
//       // Animates from a thin line at top -> Full screen
//       clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
//       ease: 'power4.inOut',
//     })

//     // B. Slide Links Up
//     tl.current.from('.menu-link-item', {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.1,
//       ease: 'power4.out',
//     }, "-=0.75") 

//     // C. Fade In Socials
//     tl.current.from('.social-item', {
//         opacity: 0, 
//         y: 20, 
//         stagger: 0.05
//     }, "<50%")

//   }, { scope: container })

//   // 2. CONTROL LOOP
//   // When 'isOpen' changes, play or reverse the video tape
//   useGSAP(() => {
//     if (isOpen) {
//       tl.current.play()
//     } else {
//       tl.current.reverse()
//     }
//   }, [isOpen]) 

//   return (
//     <div ref={container} style={{ 
//         height: '100vh', 
//         background: '#fff', 
//         position: 'relative', 
//         overflow: 'hidden', 
//         fontFamily: 'sans-serif',
//         // ✅ FIX: Push content down so it's not hidden behind the Navbar
//         paddingTop: '100px' 
//     }}>
      
//       {/* --- THE VISIBLE HEADER --- */}
//       <div style={{ padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', fontWeight: 'bold' }}>AGENCY</h3>
        
//         {/* THE BURGER BUTTON */}
//         <button 
//             onClick={() => setIsOpen(!isOpen)}
//             style={{ 
//                 zIndex: 20, // Must be higher than overlay
//                 background: 'transparent', 
//                 border: 'none', 
//                 cursor: 'pointer',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 8, // Space between lines
//                 padding: 10
//             }}
//         >
//             {/* Line 1 */}
//             <div style={{ 
//                 width: 40, 
//                 height: 4, 
//                 background: isOpen ? '#fff' : '#000', // Turns white when menu opens
//                 transition: 'background 0.3s' 
//             }}></div>
//             {/* Line 2 */}
//             <div style={{ 
//                 width: 40, 
//                 height: 4, 
//                 background: isOpen ? '#fff' : '#000', 
//                 transition: 'background 0.3s' 
//             }}></div>
//         </button>
//       </div>

//       {/* --- BACKGROUND CONTENT --- */}
//       <div style={{ padding: 40, color: '#333' }}>
//         <h1 style={{ fontSize: '4rem', margin: 0, lineHeight: 1.1 }}>
//             The Timeline<br/>Interaction.
//         </h1>
//         <p style={{ marginTop: 20, fontSize: '1.2rem', color: '#666' }}>
//             Click the black lines on the right ↗
//         </p>
//       </div>

//       {/* --- THE HIDDEN MENU OVERLAY --- */}
//       <div className="menu-overlay" style={{
//           position: 'fixed',
//           top: 0, left: 0,
//           width: '100vw', height: '100vh',
//           background: '#111',
//           zIndex: 10,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           // START STATE: Hidden (A thin line at the top)
//           clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' 
//       }}>
          
//           {/* NAVIGATION LINKS */}
//           <nav style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
//               {['WORK', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
//                   <div key={item} style={{ overflow: 'hidden' }}>
//                       <a href="#" className="menu-link-item" style={{ 
//                           display: 'block',
//                           fontSize: '4rem', 
//                           color: 'white', 
//                           textDecoration: 'none', 
//                           fontWeight: 800,
//                           lineHeight: 1.1,
//                           fontFamily: 'Impact, sans-serif'
//                       }}>
//                           {item}
//                       </a>
//                   </div>
//               ))}
//           </nav>

//           {/* SOCIAL FOOTER */}
//           <div style={{ display: 'flex', gap: 30, marginTop: 60 }}>
//               {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
//                   <span key={social} className="social-item" style={{ 
//                       color: '#888', 
//                       fontSize: '1rem', 
//                       textTransform: 'uppercase', 
//                       letterSpacing: 2,
//                       cursor: 'pointer'
//                   }}>
//                       {social}
//                   </span>
//               ))}
//           </div>

//       </div>

//     </div>
//   )
// }


// import { useRef, useState } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'

// export default function Day02() {
//   const container = useRef()
//   const [isOpen, setIsOpen] = useState(false)
//   const tl = useRef()

//   useGSAP(() => {
//     // 1. Create Timeline (Paused)
//     tl.current = gsap.timeline({ paused: true })

//     // --- YOUR CUSTOM BUTTON ANIMATION ---
//     // We add this at position '0' so it happens INSTANTLY when the menu starts opening.
    
//     // Top Line: Rotate and push down
//     tl.current.to('.line-1', {
//         rotate: 45,
//         y: 6,        // Move down to center
//         background: '#fff', // Turn white on dark background
//         duration: 0.3,
//         ease: 'power2.inOut'
//     }, 0)

//     // Bottom Line: Rotate and push up
//     tl.current.to('.line-2', {
//         rotate: -45,
//         y: -6,       // Move up to center
//         background: '#fff', 
//         duration: 0.3,
//         ease: 'power2.inOut'
//     }, 0)

//     // --- THE MENU EXPANSION ---
    
//     // A. Expand Overlay
//     // We use "<" to say: Start this AT THE SAME TIME as the button animation
//     tl.current.to('.menu-overlay', {
//       duration: 1.25,
//       clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
//       ease: 'power4.inOut',
//     }, "<") 

//     // B. Text Reveal
//     tl.current.from('.menu-link-item', {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.1,
//       ease: 'power4.out',
//     }, "-=0.75") 

//     // C. Socials
//     tl.current.from('.social-item', {
//         opacity: 0, 
//         y: 20, 
//         stagger: 0.05
//     }, "<50%")

//   }, { scope: container })

//   useGSAP(() => {
//     if (isOpen) {
//       tl.current.play()
//     } else {
//       tl.current.reverse()
//     }
//   }, [isOpen]) 

//   return (
//     <div ref={container} style={{ 
//         height: '100vh', 
//         background: '#fff', 
//         position: 'relative', 
//         overflow: 'hidden', 
//         fontFamily: 'sans-serif',
//         paddingTop: '100px' 
//     }}>
      
//       {/* HEADER */}
//       <div style={{ padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', fontWeight: 'bold' }}>AGENCY</h3>
        
//         {/* THE TRIGGER BUTTON */}
//         <button 
//             onClick={() => setIsOpen(!isOpen)}
//             style={{ 
//                 zIndex: 20, 
//                 background: 'transparent', 
//                 border: 'none', 
//                 cursor: 'pointer',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 gap: 8, // The gap is 8px. So moving lines 6px (plus height) creates the X.
//                 padding: 10
//             }}
//         >
//             {/* Added classNames here to target them! */}
//             <div className="line-1" style={{ width: 40, height: 4, background: '#000' }}></div>
//             <div className="line-2" style={{ width: 40, height: 4, background: '#000' }}></div>
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div style={{ padding: 40, color: '#333' }}>
//         <h1 style={{ fontSize: '4rem', margin: 0, lineHeight: 1.1 }}>
//             The Timeline<br/>Interaction.
//         </h1>
//         <p style={{ marginTop: 20, fontSize: '1.2rem', color: '#666' }}>
//             Click the button top right ↗
//         </p>
//       </div>

//       {/* MENU OVERLAY */}
//       <div className="menu-overlay" style={{
//           position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
//           background: '#111', zIndex: 10,
//           display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
//           clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' 
//       }}>
          
//           <nav style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
//               {['WORK', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
//                   <div key={item} style={{ overflow: 'hidden' }}>
//                       <a href="#" className="menu-link-item" style={{ 
//                           display: 'block', fontSize: '4rem', color: 'white', 
//                           textDecoration: 'none', fontWeight: 800, lineHeight: 1.1, fontFamily: 'Impact, sans-serif'
//                       }}>
//                           {item}
//                       </a>
//                   </div>
//               ))}
//           </nav>

//           <div style={{ display: 'flex', gap: 30, marginTop: 60 }}>
//               {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
//                   <span key={social} className="social-item" style={{ color: '#888', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 2 }}>{social}</span>
//               ))}
//           </div>

//       </div>
//     </div>
//   )
// }

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Day02() {
  const container = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const tl = useRef()

  // --- 1. SCROLL LOCK (UX ESSENTIAL) ---
  // If you don't do this, clients will complain that the site "feels broken"
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useGSAP(() => {
    // A. SET INITIAL STATE (Anti-Flash)
    // We force the overlay to be invisible instantly before the frame paints
    gsap.set('.menu-overlay', { visibility: 'hidden' })

    // B. BUILD TIMELINE
    tl.current = gsap.timeline({ 
        paused: true,
        // OPTIMIZATION: When closed, set visibility: hidden so screen readers ignore it
        onReverseComplete: () => gsap.set('.menu-overlay', { visibility: 'hidden' }),
        onStart: () => gsap.set('.menu-overlay', { visibility: 'visible' })
    })

    // --- BUTTON ANIMATION (Instant) ---
    // Start at 0 absolute time
    tl.current.to('.line-1', { 
        rotate: 45, y: 6, background: '#fff', duration: 0.3, ease: 'power2.inOut' 
    }, 0)
    tl.current.to('.line-2', { 
        rotate: -45, y: -6, background: '#fff', duration: 0.3, ease: 'power2.inOut' 
    }, 0)

    // --- MENU EXPANSION ---
    // Start at 0 (Same time as button)
    tl.current.to('.menu-overlay', {
      duration: 1.25,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'expo.inOut', // 'expo' feels more premium/snappy than 'power4'
    }, 0)

    // --- LINKS REVEAL (From Center) ---
    tl.current.from('.menu-link-item', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: {
          amount: 0.3,
          from: "center" // <--- THE ELITE TOUCH
      }
    }, "-=0.75") 

    // --- SOCIALS ---
    tl.current.from('.social-item', {
        opacity: 0, y: 20, stagger: 0.05
    }, "<50%")

  }, { scope: container })

  // CONTROL
  useGSAP(() => {
    if (isOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isOpen]) 

  return (
    <div ref={container} style={{ 
        height: '100vh', 
        background: '#fff', 
        position: 'relative', 
        overflow: 'hidden', 
        fontFamily: 'sans-serif',
        paddingTop: '100px' 
    }}>
      
      {/* HEADER */}
      <div style={{ padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', fontWeight: 'bold', zIndex: 30 }}>AGENCY</h3>
        
        {/* BUTTON */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
                zIndex: 30, 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: 10
            }}
        >
            <div className="line-1" style={{ width: 40, height: 4, background: '#000' }}></div>
            <div className="line-2" style={{ width: 40, height: 4, background: '#000' }}></div>
        </button>
      </div>

      {/* DUMMY CONTENT (To test scroll lock) */}
      <div style={{ padding: 40, color: '#333' }}>
        <h1 style={{ fontSize: '4rem', margin: 0, lineHeight: 1.1 }}>
            Production<br/>Ready.
        </h1>
        <p style={{ marginTop: 20, fontSize: '1.2rem', color: '#666', maxWidth: '500px' }}>
            Try to scroll down while the menu is open. You can't. 
            That is the difference between a demo and a product.
        </p>
        {/* Lots of text to force scrollbar */}
        <div style={{ marginTop: 50, color: '#ddd', fontSize: '2rem' }}>
            {Array(10).fill("Scroll Test ").map((t, i) => <p key={i}>{t} {i}</p>)}
        </div>
      </div>

      {/* MENU OVERLAY */}
      <div className="menu-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: '#111', zIndex: 20,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          visibility: 'hidden' // Hidden by default (GSAP handles this)
      }}>
          
          <nav style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['WORK', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
                  <div key={item} style={{ overflow: 'hidden' }}>
                      <a href="#" className="menu-link-item" style={{ 
                          display: 'block', fontSize: '5rem', color: 'white', 
                          textDecoration: 'none', fontWeight: 800, lineHeight: 1.1, fontFamily: 'Impact, sans-serif'
                      }}>
                          {item}
                      </a>
                  </div>
              ))}
          </nav>

          <div style={{ display: 'flex', gap: 30, marginTop: 60 }}>
              {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                  <span key={social} className="social-item" style={{ color: '#888', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 2 }}>{social}</span>
              ))}
          </div>

      </div>
    </div>
  )
}