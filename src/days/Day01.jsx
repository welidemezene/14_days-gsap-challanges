import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Day01() {
  const container = useRef()

  useGSAP(() => {
    const tl = gsap.timeline()

    // 1. Text Reveal
    // We select the <h1> inside the container
    // y: '100%' moves it down. Since parent has overflow:hidden, it disappears.
    tl.from('.hero-text', {
      y: '100%',
      duration: 1.5,
      ease: 'power4.out', // Expensive feeling ease
      stagger: 0.03 // The "Wave" effect (0.1s delay between lines)
    })

    // 2. Subtitle Fade
    tl.from('.subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out'
    }, "-=1.0") // Start 1 second before the previous animation ends

    // 3. Button Scale In
    tl.from('.cta-btn', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)' // Bouncy effect
    }, "-=0.5")

  }, { scope: container })

  return (
    <div ref={container} style={{ 
        height: '100%', 
        background: '#111', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Helvetica Neue, sans-serif'
    }}>
      
      {/* LINE 1 */}
      <div style={{ overflow: 'hidden' }}> {/* THE MASK */}
        <h1 className="hero-text" style={{ margin: 0, fontSize: '8vw', lineHeight: 0.9, textTransform: 'uppercase' }}>
            DIGITAL
        </h1>
      </div>

      {/* LINE 2 */}
      <div style={{ overflow: 'hidden' }}> {/* THE MASK */}
        <h1 className="hero-text" style={{ margin: 0, fontSize: '8vw', lineHeight: 0.9, textTransform: 'uppercase', color: '#00ff88' }}>
            EXPERIENCE
        </h1>
      </div>

      {/* SUBTITLE */}
      <p className="subtitle" style={{ fontSize: '1.5rem', marginTop: 20, opacity: 0.7 }}>
        Day 01: Timelines & Easing
      </p>

      {/* BUTTON */}
      <button className="cta-btn" style={{
          marginTop: 40,
          padding: '15px 40px',
          background: 'white',
          color: 'black',
          border: 'none',
          borderRadius: 50,
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
      }}>
          START PROJECT
      </button>

    </div>
  )
}