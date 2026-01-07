import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", title: "PORTRAIT" },
  { id: 2, src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop", title: "STREET" },
  { id: 3, src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop", title: "FASHION" },
  { id: 4, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop", title: "STUDIO" },
]

export default function Day10() {
  const container = useRef()
  const scrollContainer = useRef()

  useGSAP(() => {
    // 1. GET ALL SECTIONS
    const sections = gsap.utils.toArray('.horizontal-panel')

    // 2. CREATE THE HORIZONTAL SCROLL
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1), // Move left by (Total - 1) widths
      ease: "none", // IMPORTANT: Linear movement
      scrollTrigger: {
        trigger: scrollContainer.current,
        pin: true,     // Lock the container in place
        scrub: 1,      // Smooth scrubbing
        // Define how long the scroll lasts
        // "+=3000" means "User must scroll 3000px down to finish this animation"
        end: "+=3000", 
      }
    })

  }, { scope: container })

  return (
    <div ref={container} style={{ background: '#111', color: 'white', overflowX: 'hidden' }}>
      
      {/* SECTION 1: VERTICAL HERO */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '5rem', margin: 0 }}>VERTICAL</h1>
        <p style={{ fontSize: '1.5rem', color: '#888' }}>Scroll down to switch dimensions.</p>
        <div style={{ marginTop: 50, fontSize: '3rem' }}>↓</div>
      </div>

      {/* SECTION 2: THE HORIZONTAL WRAPPER */}
      <div ref={scrollContainer} style={{ height: '100vh', width: '400%', display: 'flex' }}>
        {images.map((img, i) => (
            <div 
                key={img.id} 
                className="horizontal-panel"
                style={{
                    width: '100vw', 
                    height: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    borderRight: '1px solid #333'
                }}
            >
                {/* Image Card */}
                <div style={{ position: 'relative', width: '600px', height: '800px', overflow: 'hidden' }}>
                    <img 
                        src={img.src} 
                        alt={img.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.8)' }}
                    />
                    
                    {/* Big Text Overlay */}
                    <h2 style={{ 
                        position: 'absolute', bottom: 40, left: -40, 
                        fontSize: '8rem', margin: 0, 
                        color: 'transparent', WebkitTextStroke: '2px #fff',
                        zIndex: 10
                    }}>
                        0{img.id}
                    </h2>
                </div>

                <h3 style={{ 
                    position: 'absolute', top: '50%', left: '60%', 
                    fontSize: '4rem', margin: 0, 
                    transform: 'translateY(-50%)',
                    mixBlendMode: 'difference' 
                }}>
                    {img.title}
                </h3>
            </div>
        ))}
      </div>

      {/* SECTION 3: VERTICAL FOOTER */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#000' }}>
        <h1 style={{ fontSize: '5rem', margin: 0 }}>VERTICAL AGAIN</h1>
        <p style={{ fontSize: '1.5rem', color: '#888' }}>You made it to the end.</p>
      </div>

    </div>
  )
}