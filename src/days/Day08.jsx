import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- DATA ---
const content = [
  {
    id: 1,
    title: "Ethereal",
    subtitle: "Collection 2026",
    desc: "Redefining the silhouette with fluid dynamics and structural integrity.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
    align: "left"
  },
  {
    id: 2,
    title: "Structure",
    subtitle: "Modernist Era",
    desc: "Where brutalism meets delicate organic forms in perfect harmony.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop",
    align: "right"
  },
  {
    id: 3,
    title: "Essence",
    subtitle: "Pure Form",
    desc: "Stripping away the noise to reveal the fundamental truth of design.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop",
    align: "left"
  }
]

// --- COMPONENT ---
const FeatureSection = ({ item }) => {
  const container = useRef()
  const imgRef = useRef()
  const textRef = useRef()

  useGSAP(() => {
    // A. REVEAL ANIMATION
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container.current,
            start: "top 85%", // Triggers slightly earlier on mobile for better UX
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })

    // Mask Reveal
    tl.fromTo(container.current.querySelector('.img-mask'), 
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, ease: "power4.inOut" }
    )

    // Text Reveal
    tl.from(textRef.current.querySelectorAll('.anim-text'), {
        y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out"
    }, "-=1.0")

    // B. PARALLAX (Subtle movement inside the mask)
    gsap.fromTo(imgRef.current, 
        { scale: 1.2, y: -30 }, 
        { 
            y: 30, 
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    )

  }, { scope: container })

  // Determine classes for layout
  const layoutClass = item.align === "left" ? "row-left" : "row-right"

  return (
    <div ref={container} className={`section-container ${layoutClass}`}>
      
      {/* 1. IMAGE SIDE */}
      <div className="col-image">
         <div className="img-mask">
            <img ref={imgRef} src={item.img} alt={item.title} />
         </div>
      </div>

      {/* 2. TEXT SIDE */}
      <div ref={textRef} className="col-text">
         <div className="text-inner">
            <h3 className="anim-text subtitle">{item.subtitle}</h3>
            <h1 className="anim-text title">{item.title}</h1>
            <p className="anim-text desc">{item.desc}</p>
            <button className="anim-text btn">Explore</button>
         </div>
      </div>

    </div>
  )
}

// --- MAIN LAYOUT ---
export default function Day08() {
  return (
    <div style={{ background: '#0e0e0e', color: '#f0f0f0', overflowX: 'hidden' }}>
      
      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title">VOGUE</h1>
        <p className="hero-sub">Scroll to discover</p>
      </div>

      {/* SECTIONS */}
      <div className="max-width-wrapper">
        {content.map((item) => (
            <FeatureSection key={item.id} item={item} />
        ))}
      </div>

      {/* FOOTER */}
      <div className="footer">
         <p>© 2026 Agency</p>
      </div>

      {/* --- PROFESSIONAL CSS ARCHITECTURE --- */}
      <style>{`
        /* 1. HERO */
        .hero {
            height: 100vh;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            border-bottom: 1px solid #333;
        }
        /* FLUID TYPE: clamps between 4rem and 15rem based on screen width */
        .hero-title { 
            font-size: clamp(4rem, 15vw, 15rem); 
            margin: 0; line-height: 0.8; font-family: 'Didot', serif; text-transform: uppercase; 
        }
        .hero-sub { margin-top: 20px; font-family: sans-serif; opacity: 0.6; }

        /* 2. LAYOUT GRID */
        .max-width-wrapper {
            max-width: 1400px; /* Stop it from getting too wide on 4k screens */
            margin: 0 auto;
            padding: 0 20px;
        }

        .section-container {
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5vw; /* Fluid gap */
            padding: 50px 0;
        }

        /* 3. COLUMNS */
        .col-image, .col-text {
            flex: 1; /* Take up equal space on desktop */
            display: flex;
            justify-content: center;
        }

        /* 4. THE ZIG-ZAG LOGIC */
        .row-right { flex-direction: row-reverse; }
        .row-left { flex-direction: row; }

        /* 5. IMAGE MASK */
        .img-mask {
            width: 100%;
            max-width: 600px;
            aspect-ratio: 3 / 4; /* Keeps consistent rectangular shape */
            overflow: hidden;
            position: relative;
        }

        img {
            width: 100%; height: 120%; object-fit: cover;
            position: absolute; top: -10%; left: 0;
        }

        /* 6. TYPOGRAPHY */
        .text-inner { max-width: 400px; }
        .subtitle { color: #888; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 20px; font-size: 0.9rem; font-family: sans-serif; }
        .title { 
            font-family: 'Didot', serif; 
            font-size: clamp(3rem, 5vw, 6rem); /* Fluid Font */
            margin: 0; line-height: 1; 
        }
        .desc { font-size: 1.1rem; line-height: 1.6; color: #ccc; margin-top: 30px; font-family: sans-serif; }
        
        .btn {
            margin-top: 40px; padding: 15px 40px; background: transparent; color: white;
            border: 1px solid rgba(255,255,255,0.3); border-radius: 50px; cursor: pointer; transition: 0.3s;
        }
        .btn:hover { background: white; color: black; }

        .footer { height: 30vh; display: flex; align-items: center; justify-content: center; opacity: 0.3; font-family: sans-serif; }

        /* 7. MOBILE RESPONSIVENESS (The Magic) */
        @media (max-width: 900px) {
            .section-container {
                flex-direction: column !important; /* Stack Vertical */
                text-align: center;
                gap: 40px;
            }
            /* Reset Row Reverse so Image is ALWAYS on top */
            .row-right { flex-direction: column !important; }

            .text-inner { 
                align-items: center; 
                display: flex; 
                flex-direction: column; 
            }
            
            .img-mask { width: 90vw; } /* Wider image on phone */
        }
      `}</style>
    </div>
  )
}