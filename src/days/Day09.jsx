import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- DATA: High-End Travel Destinations ---
const cards = [
  { id: 1, title: "Kyoto", subtitle: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop", color: "#f5e6d3", text: "#000" },
  { id: 2, title: "Reykjavik", subtitle: "Iceland", img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2000&auto=format&fit=crop", color: "#2b2b2b", text: "#fff" },
  { id: 3, title: "Santorini", subtitle: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop", color: "#0077be", text: "#fff" },
  { id: 4, title: "Marrakech", subtitle: "Morocco", img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2000&auto=format&fit=crop", color: "#ff8c00", text: "#000" }
]

export default function Day09() {
  const container = useRef()

  useGSAP(() => {
    // 1. SELECT CARDS
    const cardsElements = gsap.utils.toArray('.card-wrapper')

    cardsElements.forEach((card, index) => {
        // 2. THE PINNING LOGIC
        ScrollTrigger.create({
            trigger: card,
            start: "top top", 
            // We pin the card until ALL subsequent cards have scrolled past it.
            // Formula: (Total Cards - Current Index - 1) * 100vh
            end: `+=${(cardsElements.length - index - 1) * 100}%`, 
            pin: true, 
            pinSpacing: false, // Allows overlap!
            scrub: true,
            id: `pin-${index}`
        })

        // 3. THE "SCALE DOWN" LOGIC (Depth Effect)
        // We want THIS card to scale down when the NEXT card arrives.
        const nextCard = cardsElements[index + 1]
        
        if (nextCard) {
            gsap.to(card.querySelector('.card-inner'), {
                scale: 0.9,      // Shrink slightly
                filter: 'brightness(0.5)', // Darken
                borderRadius: '50px', // Rounder corners
                ease: "none", // Linear sync with scroll
                scrollTrigger: {
                    trigger: nextCard, // Watch the next card
                    start: "top bottom", // When top of Next hits bottom of Screen
                    end: "top top",      // When top of Next hits top of Screen
                    scrub: true
                }
            })
        }
    })

  }, { scope: container })

  return (
    <div ref={container} style={{ background: '#111', color: 'white' }}>
      
      {/* HEADER */}
      <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', margin: 0, fontFamily: "'Didot', serif", lineHeight: 0.8 }}>
            WANDER
        </h1>
        <p style={{ marginTop: 20, letterSpacing: '2px', opacity: 0.6 }}>THE STACK SCROLL</p>
      </div>

      {/* CARD STACK */}
      <div className="stack-area" style={{ paddingBottom: '20vh' }}>
        {cards.map((card, i) => (
            <div 
                key={card.id} 
                className="card-wrapper"
                style={{
                    height: '100vh', // Full screen height ensures perfect stacking
                    width: '100%',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative', 
                    zIndex: i // Newer cards on top of older ones
                }}
            >
                {/* INNER CARD (This is what we scale) */}
                <div className="card-inner" style={{
                    width: '90%', 
                    height: '90%', 
                    maxWidth: '1200px',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    transformOrigin: 'center top' // Scale from top center
                }}>
                    
                    {/* BACKGROUND IMAGE */}
                    <img 
                        src={card.img} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                        alt={card.title}
                    />

                    {/* CONTENT OVERLAY */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                        padding: '40px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: 'white' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'uppercase', opacity: 0.8 }}>{card.subtitle}</h3>
                                <h2 style={{ margin: 0, fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 0.9, fontFamily: "'Didot', serif" }}>{card.title}</h2>
                            </div>
                            <div style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', opacity: 0.3, fontWeight: 'bold' }}>
                                0{card.id}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ opacity: 0.5 }}>Your journey begins.</p>
      </div>

    </div>
  )
}