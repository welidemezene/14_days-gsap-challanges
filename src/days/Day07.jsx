// import { useRef } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'

// export default function Day07() {
//   const container = useRef()
//   const counterRef = useRef()

//   useGSAP(() => {
//     const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } })

//     // --- PART 1: THE PRELOADER ---
//     // We animate a JS object property 'val' from 0 to 100
//     const progress = { val: 0 }
    
//     tl.to(progress, {
//         val: 100,
//         duration: 2.5,
//         ease: "power4.inOut", // Slow start, fast middle, slow end
//         onUpdate: () => {
//             // Update the DOM text every frame
//             if(counterRef.current) {
//                 counterRef.current.innerText = Math.round(progress.val)
//             }
//         }
//     })
    
//     // Collapse the counter text
//     .to('.preloader-text', { y: -100, opacity: 0, duration: 0.5 }, "-=0.5")
    
//     // Slide the curtain UP
//     .to('.preloader', {
//         height: 0,
//         duration: 1.5,
//         ease: "power4.inOut"
//     }, "-=0.2")

//     // --- PART 2: THE HERO REVEAL ---
//     // Scale image down from 1.5 to 1 (Parallax Zoom)
//     .from('.hero-img', {
//         scale: 1.5,
//         duration: 2,
//         ease: "power4.out"
//     }, "-=1.5") // START EARLY! (While curtain is moving)

//     // Stagger Text Up
//     .from('.hero-title span', {
//         y: 200,
//         rotate: 10,
//         opacity: 0,
//         duration: 1.5,
//         stagger: 0.1,
//         ease: "power4.out"
//     }, "-=1.2")
    
//     // Fade in Nav
//     .from('nav', {
//         y: -50,
//         opacity: 0,
//         duration: 1
//     }, "-=1")

//   }, { scope: container })

//   return (
//     <div ref={container} style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', fontFamily: "'Didot', serif" }}>
      
//       {/* 1. THE PRELOADER CURTAIN */}
//       <div className="preloader" style={{
//           position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//           background: '#111', zIndex: 99,
//           display: 'flex', alignItems: 'center', justifyContent: 'center'
//       }}>
//           <div className="preloader-text" style={{ overflow: 'hidden', display: 'flex', alignItems: 'baseline' }}>
//              <h1 ref={counterRef} style={{ fontSize: '10vw', color: '#fff', margin: 0, lineHeight: 1 }}>0</h1>
//              <span style={{ fontSize: '2vw', color: '#fff', marginLeft: 10 }}>%</span>
//           </div>
//       </div>

//       {/* 2. THE HERO SECTION */}
//       <div className="hero" style={{ height: '100%', width: '100%', position: 'relative', background: '#dcdcdc' }}>
        
//         {/* Nav */}
//         <nav style={{ 
//             position: 'absolute', top: 0, left: 0, width: '100%', 
//             padding: '40px', display: 'flex', justifyContent: 'space-between', 
//             zIndex: 10, mixBlendMode: 'difference', color: 'white',
//             fontFamily: 'sans-serif', fontWeight: 'bold', letterSpacing: '2px'
//         }}>
//             <div>VOGUE</div>
//             <div>MENU</div>
//         </nav>

//         {/* Background Image */}
//         <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
//             <img 
//                 className="hero-img"
//                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2400&auto=format&fit=crop" 
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />
//         </div>

//         {/* Hero Text */}
//         <div style={{ 
//             position: 'absolute', bottom: '10%', left: '5%', 
//             mixBlendMode: 'difference', color: 'white' 
//         }}>
//             {/* Split Lines for Stagger */}
//             <h1 className="hero-title" style={{ fontSize: '12vw', margin: 0, lineHeight: 0.8, textTransform: 'uppercase' }}>
//                 <span style={{ display: 'inline-block' }}>Autumn</span><br/>
//                 <span style={{ display: 'inline-block', fontStyle: 'italic' }}>Collection</span><br/>
//                 <span style={{ display: 'inline-block', fontSize: '2vw', letterSpacing: 5, fontFamily: 'sans-serif' }}>2025 / Paris</span>
//             </h1>
//         </div>

//       </div>

//     </div>
//   )
// }




import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Day07() {
  const container = useRef()
  const counterRef = useRef()
  const barRef = useRef()
  const numberRef = useRef() // Ref for the moving number container

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } })

    // 1. SETUP
    // Bar starts at 0 width
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" })
    // Number starts at left: 0
    gsap.set(numberRef.current, { left: "0%" })

    // --- PART 1: THE SYNCHRONIZED LOADING ---
    const progress = { val: 0 }
    
    // A. Animate the Counter Value (0 to 100)
    tl.to(progress, {
        val: 100,
        duration: 2.5,
        onUpdate: () => {
            if(counterRef.current) {
                counterRef.current.innerText = progress.val.toFixed(0) + "%"
            }
        }
    })

    // B. Animate the Bar Growth (0 to 1)
    // Runs at the exact same time ("<") as the counter
    .to(barRef.current, {
        scaleX: 1,
        duration: 2.5
    }, "<")

    // C. Animate the Number Position (Move from Left to Right)
    // Runs at the exact same time ("<")
    .to(numberRef.current, {
        left: "100%", // Moves to the end of the line
        duration: 2.5
    }, "<")

    // --- PART 2: THE EXIT ---
    // Fade out everything
    .to('.loader-wrapper', { opacity: 0, duration: 0.5 }, "-=0.5")
    
    // Slide the curtain UP
    .to('.preloader', {
        height: 0,
        duration: 1.5,
        ease: "power4.inOut"
    }, "-=0.2")

    // --- PART 3: HERO REVEAL ---
    .from('.hero-img', { scale: 1.5, duration: 2, ease: "power4.out" }, "-=1.5") 

    .from('.hero-title span', {
        y: 200,
        rotate: 10,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
    }, "-=1.2")
    
    .from('nav', { y: -50, opacity: 0, duration: 1 }, "-=1")

  }, { scope: container })

  return (
    <div ref={container} style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', fontFamily: "'Didot', serif" }}>
      
      {/* 1. THE PRELOADER CURTAIN */}
      <div className="preloader" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#111', zIndex: 99,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
          
          {/* LOADER WRAPPER (Defines the width of the progress track) */}
          <div className="loader-wrapper" style={{ 
              position: 'relative',
              width: '80%', // Covers most of the page
              maxWidth: '1000px', // But not too wide on massive screens
              height: '40px', // Height for the number
              display: 'flex',
              alignItems: 'center'
          }}>
             
             {/* THE BAR (Background Line) */}
             <div style={{ 
                 position: 'absolute',
                 top: '50%',
                 left: 0,
                 width: '100%', 
                 height: '2px', 
                 background: '#333',
                 transform: 'translateY(-50%)'
             }}>
                {/* THE MOVING FILL */}
                <div ref={barRef} style={{ 
                    width: '100%', height: '100%', background: '#fff' 
                }} />
             </div>

             {/* THE MOVING NUMBER CONTAINER */}
             {/* Positioned absolutely so it can slide independently */}
             <div ref={numberRef} style={{
                 position: 'absolute',
                 top: '50%',
                 transform: 'translate(15px, -50%)', // Push 15px to the RIGHT of the current point
                 // This ensures the number is always leading the bar
             }}>
                 <h1 ref={counterRef} style={{ 
                     fontSize: '2rem', color: '#fff', margin: 0, 
                     fontFamily: 'sans-serif', fontWeight: 'bold'
                 }}>
                     0%
                 </h1>
             </div>

          </div>

      </div>

      {/* 2. THE HERO SECTION */}
      <div className="hero" style={{ height: '100%', width: '100%', position: 'relative', background: '#dcdcdc' }}>
        
        {/* Nav */}
        <nav style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', 
            padding: '40px', display: 'flex', justifyContent: 'space-between', 
            zIndex: 10, mixBlendMode: 'difference', color: 'white',
            fontFamily: 'sans-serif', fontWeight: 'bold', letterSpacing: '2px'
        }}>
            <div>VOGUE</div>
            <div>MENU</div>
        </nav>

        {/* Background Image */}
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <img 
                className="hero-img"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2400&auto=format&fit=crop" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>

        {/* Hero Text */}
        <div style={{ 
            position: 'absolute', bottom: '10%', left: '5%', 
            mixBlendMode: 'difference', color: 'white' 
        }}>
            <h1 className="hero-title" style={{ fontSize: '12vw', margin: 0, lineHeight: 0.8, textTransform: 'uppercase' }}>
                <span style={{ display: 'inline-block' }}>Autumn</span><br/>
                <span style={{ display: 'inline-block', fontStyle: 'italic' }}>Collection</span><br/>
                <span style={{ display: 'inline-block', fontSize: '2vw', letterSpacing: 5, fontFamily: 'sans-serif' }}>2025 / Paris</span>
            </h1>
        </div>

      </div>

    </div>
  )
}