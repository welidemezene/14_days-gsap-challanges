import { useState, useRef } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Flip)

const projects = [
  { id: 1, title: "NEON TOKYO", category: "Cyberpunk", img: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "SYNTH WAVE", category: "Retro", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "FLUID DATA", category: "3D Render", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "VOID STRUCTURE", category: "Architecture", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000&auto=format&fit=crop" }
]


export default function Day05() {
  const container = useRef()
  const [activeId, setActiveId] = useState(null)
  
  // Store the layout state
  const flipState = useRef()

  useGSAP(() => {
    if (!flipState.current) return

    // THE FLIP: Animate from the "Old" state (Grid) to "New" state (Fullscreen)
    Flip.from(flipState.current, {
      duration: 0.8,
      ease: "power4.inOut",
      absolute: true, // Critical: Removes element from flow so it doesn't push others
      zIndex: 10,     // Make sure it flies ON TOP
      
      // Animate children (The Image and Text inside)
      // We don't need nested:true here because we just let CSS handle the children scaling
      
      onEnter: elements => {
        // Fade in the "Details" text when expanded
        return gsap.fromTo(elements[0].querySelectorAll('.details'), 
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.3 }
        )
      },
      onLeave: elements => {
        // Hide details instantly when closing
        return gsap.set(elements[0].querySelectorAll('.details'), { autoAlpha: 0 })
      }
    })

  }, { scope: container, dependencies: [activeId] })

  const toggle = (id) => {
    // 1. Capture State (Where is everything NOW?)
    const state = Flip.getState(".card")
    flipState.current = state

    // 2. Change State (React updates CSS classes)
    setActiveId(activeId === id ? null : id)
  }

  return (
    <div ref={container} style={{ 
        minHeight: '100vh', background: '#111', color: 'white', 
        padding: 50, fontFamily: 'sans-serif' 
    }}>
      
      <h1 style={{ fontSize: '4rem', marginBottom: 50 }}>GALLERY <span style={{ color: '#00ff88' }}>FLIP</span></h1>

      <div className={activeId ? "grid has-active" : "grid"}>
        {projects.map((item) => {
          const isActive = activeId === item.id
          
          return (
            <div 
              key={item.id} 
              className={`card ${isActive ? "expanded" : ""}`} 
              onClick={() => toggle(item.id)}
            >
              {/* IMAGE BACKGROUND */}
              <img src={item.img} className="card-bg" />
              
              {/* CONTENT */}
              <div className="card-content">
                <p className="category">{item.category}</p>
                <h2>{item.title}</h2>
                
                {/* EXTRA DETAILS (Only visible when expanded) */}
                <div className="details">
                    <p>
                        This is an immersive layout transition. 
                        GSAP Flip calculates the pixel difference between the 
                        grid layout and the fullscreen layout and morphs the element seamlessly.
                    </p>
                    <button className="cta-btn">VIEW PROJECT</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        /* CARD STYLING */
        .card {
            position: relative;
            height: 400px;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            /* When not active, allow it to be clicked */
        }

        /* FADE OUT other cards when one is active */
        .grid.has-active .card:not(.expanded) {
            opacity: 0.1;
            pointer-events: none;
            transition: opacity 0.5s;
        }

        .card-bg {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        .card:hover .card-bg { transform: scale(1.1); }

        .card-content {
            position: absolute; bottom: 0; left: 0; width: 100%;
            padding: 30px;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            box-sizing: border-box;
        }

        .card h2 { margin: 0; font-size: 2rem; }
        .category { color: #00ff88; font-weight: bold; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px; }

        .details {
            opacity: 0; /* Hidden by default */
            margin-top: 20px;
            max-width: 600px;
        }

        .cta-btn {
            margin-top: 20px;
            padding: 15px 30px;
            background: #00ff88;
            color: black;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 50px;
        }

        /* --- THE EXPANDED STATE (Magic happens here) --- */
        .card.expanded {
            position: fixed;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            border-radius: 0; /* Un-round corners */
            cursor: default;
        }

        .card.expanded .card-content {
            padding: 80px; /* More padding when full */
        }

        .card.expanded h2 { font-size: 5rem; } /* Bigger text */
      `}</style>

    </div>
  )
}





// import { useState, useRef } from 'react'
// import gsap from 'gsap'
// import { Flip } from 'gsap/all'
// import { useGSAP } from '@gsap/react'

// gsap.registerPlugin(Flip)

// // ✅ FIXED: High-Quality, Reliable Image Links
// const projects = [
//   { id: 1, title: "NEON TOKYO", category: "Cyberpunk", img: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop" },
//   { id: 2, title: "SYNTH WAVE", category: "Retro", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop" },
//   { id: 3, title: "FLUID DATA", category: "3D Render", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
//   { id: 4, title: "VOID STRUCTURE", category: "Architecture", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000&auto=format&fit=crop" }
// ]

// export default function Day05() {
//   const container = useRef()
//   const [activeId, setActiveId] = useState(null)
  
//   // Store the layout state
//   const flipState = useRef()

//   useGSAP(() => {
//     if (!flipState.current) return

//     // THE FLIP: Animate from Grid -> Fullscreen
//     Flip.from(flipState.current, {
//       duration: 0.9,
//       ease: "power4.inOut", // Very dramatic slow-start, slow-end
//       absolute: true, 
//       zIndex: 50,
      
//       onEnter: elements => {
//         // A. Fade in Details
//         gsap.fromTo(elements[0].querySelectorAll('.details'), 
//             { autoAlpha: 0, y: 30 },
//             { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.4 }
//         )
//         // B. Animate Close Button scale
//         gsap.fromTo(elements[0].querySelectorAll('.close-btn'),
//             { scale: 0, rotation: -90 },
//             { scale: 1, rotation: 0, duration: 0.4, delay: 0.4, ease: "back.out(1.7)" }
//         )
//       },
//       onLeave: elements => {
//         // Instant hide when closing so it doesn't look messy
//         return gsap.set(elements[0].querySelectorAll('.details, .close-btn'), { autoAlpha: 0 })
//       }
//     })

//   }, { scope: container, dependencies: [activeId] })

//   const toggle = (id) => {
//     // 1. Capture State
//     const state = Flip.getState(".card")
//     flipState.current = state

//     // 2. Change State
//     setActiveId(activeId === id ? null : id)
//   }

//   return (
//     <div ref={container} style={{ 
//         minHeight: '100vh', background: '#0a0a0a', color: 'white', 
//         padding: 50, fontFamily: "'Helvetica Neue', sans-serif" 
//     }}>
      
//       <div style={{ marginBottom: 60, borderBottom: '1px solid #333', paddingBottom: 20 }}>
//         <h1 style={{ fontSize: '4rem', margin: 0, letterSpacing: '-2px' }}>
//             IMMERSIVE <span style={{ color: '#00ff88' }}>GALLERY</span>
//         </h1>
//         <p style={{ opacity: 0.5, marginTop: 10 }}>Day 05: Shared Element Transitions</p>
//       </div>

//       <div className={activeId ? "grid has-active" : "grid"}>
//         {projects.map((item) => {
//           const isActive = activeId === item.id
          
//           return (
//             <div 
//               key={item.id} 
//               className={`card ${isActive ? "expanded" : ""}`} 
//               onClick={() => !isActive && toggle(item.id)} // Only click to open, use X to close
//             >
//               {/* IMAGE BACKGROUND */}
//               <img src={item.img} className="card-bg" alt={item.title} />
              
//               {/* CONTENT OVERLAY */}
//               <div className="card-content">
//                 <p className="category">{item.category}</p>
//                 <h2>{item.title}</h2>
                
//                 {/* EXTRA DETAILS (Expanded Only) */}
//                 <div className="details">
//                     <p>
//                         This project explores the relationship between digital space and 
//                         physical architecture. Using advanced raytracing and volumetric lighting,
//                         we created a world that feels both impossible and tangible.
//                     </p>
//                     <div style={{ display: 'flex', gap: 15, marginTop: 30 }}>
//                         <button className="cta-btn primary">VIEW CASE STUDY</button>
//                         <button className="cta-btn secondary">SHARE</button>
//                     </div>
//                 </div>
//               </div>

//               {/* CLOSE BUTTON (Only visible when expanded) */}
//               <button 
//                 className="close-btn" 
//                 onClick={(e) => {
//                     e.stopPropagation() // Don't trigger card click
//                     toggle(item.id)
//                 }}
//               >
//                 ✕
//               </button>

//             </div>
//           )
//         })}
//       </div>

//       <style>{`
//         .grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//             gap: 30px;
//         }

//         /* CARD DEFAULT */
//         .card {
//             position: relative;
//             height: 450px;
//             border-radius: 16px;
//             overflow: hidden;
//             cursor: pointer;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.3);
//         }

//         /* BACKGROUND BLUR when one is active */
//         .grid.has-active .card:not(.expanded) {
//             opacity: 0.2;
//             filter: blur(5px); /* FOCUS EFFECT */
//             pointer-events: none;
//             transition: all 0.5s;
//         }

//         .card-bg {
//             position: absolute; top: 0; left: 0; width: 100%; height: 100%;
//             object-fit: cover;
//             transition: transform 0.7s;
//         }
//         .card:hover .card-bg { transform: scale(1.1); }

//         .card-content {
//             position: absolute; bottom: 0; left: 0; width: 100%;
//             padding: 30px;
//             background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
//             box-sizing: border-box;
//             display: flex;
//             flex-direction: column;
//             justify-content: flex-end;
//             height: 100%;
//         }

//         .card h2 { margin: 0; font-size: 2.5rem; line-height: 1; text-transform: uppercase; }
//         .category { color: #00ff88; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }

//         .details {
//             opacity: 0; /* Hidden by default */
//             display: none; /* Removed from flow */
//             margin-top: 30px;
//             max-width: 600px;
//             font-size: 1.2rem;
//             line-height: 1.6;
//             color: #ccc;
//         }

//         /* --- CLOSE BUTTON --- */
//         .close-btn {
//             position: absolute; top: 40px; right: 40px;
//             width: 50px; height: 50px;
//             border-radius: 50%;
//             background: rgba(255,255,255,0.2);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255,255,255,0.3);
//             color: white; font-size: 1.5rem;
//             cursor: pointer;
//             display: none; /* Hidden by default */
//             align-items: center; justifyContent: center;
//             transition: background 0.2s;
//         }
//         .close-btn:hover { background: white; color: black; }

//         /* --- THE EXPANDED STATE --- */
//         .card.expanded {
//             position: fixed;
//             top: 0; left: 0;
//             width: 100vw;
//             height: 100vh;
//             z-index: 9999;
//             border-radius: 0;
//             cursor: default;
//         }

//         .card.expanded .card-content {
//             padding: 80px; /* More padding */
//             background: linear-gradient(to right, rgba(0,0,0,0.9) 40%, transparent); /* Gradient changes direction */
//         }

//         .card.expanded .details { display: block; }
//         .card.expanded .close-btn { display: flex; }
        
//         .card.expanded h2 { font-size: 6rem; margin-bottom: 20px; }

//         /* BUTTONS */
//         .cta-btn {
//             padding: 15px 30px; border-radius: 50px; border: none; font-weight: bold; cursor: pointer;
//         }
//         .cta-btn.primary { background: #00ff88; color: black; }
//         .cta-btn.secondary { background: transparent; border: 1px solid white; color: white; }
//       `}</style>

//     </div>
//   )
// }