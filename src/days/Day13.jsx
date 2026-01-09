// import { useRef, useMemo } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { useTexture, OrbitControls } from '@react-three/drei'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'
// import * as THREE from 'three'

// gsap.registerPlugin(ScrollTrigger)

// // --------------------------------------------------------
// // 1. THE SHADER DEFINITION
// // --------------------------------------------------------
// const LiquidShader = {
//   uniforms: {
//     uTime: { value: 0 },
//     uTexture: { value: null },
//     uDistortion: { value: 0 } // Controlled by GSAP
//   },
//   vertexShader: `
//     varying vec2 vUv;
//     uniform float uDistortion;
//     uniform float uTime;

//     void main() {
//       vUv = uv;
//       vec3 pos = position;
      
//       // WAVE LOGIC:
//       // sin(y) creates horizontal bands. 
//       // uDistortion controls how deep the curve is.
//       float wave = sin(pos.y * 5.0 + uTime) * uDistortion;
      
//       pos.x += wave; 
//       pos.z += wave * 0.5; // Add some depth warp too

//       gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//     }
//   `,
//   fragmentShader: `
//     uniform sampler2D uTexture;
//     uniform float uDistortion;
//     varying vec2 vUv;

//     void main() {
//       // RGB SHIFT LOGIC:
//       // We read the texture 3 times at slightly different coordinates
//       float shiftStrength = uDistortion * 0.1;

//       float r = texture2D(uTexture, vUv + vec2(shiftStrength, 0.0)).r;
//       float g = texture2D(uTexture, vUv).g;
//       float b = texture2D(uTexture, vUv - vec2(shiftStrength, 0.0)).b;

//       gl_FragColor = vec4(r, g, b, 1.0);
//     }
//   `
// }

// // --------------------------------------------------------
// // 2. THE IMAGE PLANE COMPONENT
// // --------------------------------------------------------
// function LiquidPlane() {
//   const meshRef = useRef()
//   const materialRef = useRef()
  
//   // Load a high-quality texture
//   const texture = useTexture("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop")

//   // ANIMATION LOOP (Keep the wave moving slightly)
//   useFrame((state) => {
//     if (materialRef.current) {
//         materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
//     }
//   })

//   // GSAP SCROLL TRIGGER
//   useGSAP(() => {
//     // We are animating a property of the material object directly
//     const uniforms = materialRef.current.uniforms

//     // Create a Timeline linked to the ScrollTrigger
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: ".trigger-zone", // The HTML element
//             start: "top bottom",      // When top of div hits bottom of screen
//             end: "bottom top",        // When bottom of div hits top of screen
//             scrub: true,              // Link animation progress to scrollbar
//         }
//     })
//     .to(uniforms.uDistortion, {
//         value: 1.0, // Peak distortion at the center?
//         ease: "power2.in", 
//         duration: 1
//     })
//     .to(uniforms.uDistortion, {
//         value: 0.0, // Back to normal
//         ease: "power2.out", 
//         duration: 1
//     })

//   }, [])

//   return (
//     <mesh ref={meshRef} scale={[4, 5, 1]}>
//       <planeGeometry args={[1, 1, 32, 32]} /> {/* 32 segments needed for vertex bending */}
//       <shaderMaterial 
//         ref={materialRef}
//         args={[LiquidShader]} 
//         uniforms-uTexture-value={texture}
//       />
//     </mesh>
//   )
// }

// // --------------------------------------------------------
// // 3. THE PAGE LAYOUT
// // --------------------------------------------------------
// export default function Day13() {
//   return (
//     <div style={{ width: '100%', background: '#000', color: 'white' }}>
      
//       {/* BACKGROUND CANVAS */}
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
//         <Canvas camera={{ position: [0, 0, 7] }}>
//           <LiquidPlane />
//         </Canvas>
//       </div>

//       {/* FOREGROUND CONTENT */}
//       <div style={{ position: 'relative', zIndex: 10 }}>
        
//         {/* Intro */}
//         <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <h1 style={{ fontSize: '5rem', margin: 0 }}>SCROLL</h1>
//         </div>

//         {/* The Trigger Zone (Invisible, determines when the warp happens) */}
//         <div className="trigger-zone" style={{ height: '200vh' }}>
//             {/* You can put text here too */}
//             <div style={{ position: 'sticky', top: '50vh', textAlign: 'center', mixBlendMode: 'difference' }}>
//                 <h2 style={{ fontSize: '8rem', margin: 0 }}>LIQUID</h2>
//             </div>
//         </div>

//         {/* Outro */}
//         <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <h1 style={{ fontSize: '5rem', margin: 0 }}>REALITY</h1>
//         </div>

//       </div>

//     </div>
//   )
// }



import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --------------------------------------------------------
// 1. THE LIQUID SHADER
// --------------------------------------------------------
const LiquidShader = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uScrollVelocity: { value: 0 } // Driven by scroll speed
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uScrollVelocity;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // WAVE LOGIC:
      // The wave amplitude is multiplied by scroll velocity
      // So if you stop scrolling, the wave flattens out.
      float wave = sin(pos.y * 3.0 - uTime * 2.0) * (uScrollVelocity * 0.5);
      
      pos.z += wave; 

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uScrollVelocity;
    varying vec2 vUv;

    void main() {
      // RGB SHIFT LOGIC:
      // The shift intensity is also driven by velocity
      float shift = uScrollVelocity * 0.04;

      float r = texture2D(uTexture, vUv + vec2(0.0, shift)).r; // Shift Red Vertically
      float g = texture2D(uTexture, vUv).g;
      float b = texture2D(uTexture, vUv - vec2(0.0, shift)).b; // Shift Blue Vertically

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
}

// --------------------------------------------------------
// 2. THE IMAGE PLANE COMPONENT
// --------------------------------------------------------
function LiquidPlane() {
  const meshRef = useRef()
  const materialRef = useRef()
  
  // Load a high-quality fashion texture
  const texture = useTexture("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop")

  // ANIMATION LOOP
  useFrame((state, delta) => {
    // 1. Update Time
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    
    // 2. DAMPING (The Secret Sauce)
    // We smoothly interpolate the shader value back to 0.
    // This creates the "Elastic Snap Back" effect when you stop scrolling.
    // lerp(current, target, speed)
    materialRef.current.uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScrollVelocity.value,
        0, 
        0.1
    )
  })

  // SCROLL VELOCITY TRACKER
  useGSAP(() => {
    ScrollTrigger.create({
        trigger: ".scroll-layout",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            // self.getVelocity() returns pixels per second.
            // We divide by 1000 to get a manageable number (e.g., 0.5 to 5.0)
            const velocity = Math.abs(self.getVelocity() / 1000)
            
            // Push this velocity into the shader immediately
            if (materialRef.current) {
                // We add to the current value to create "Momentum"
                materialRef.current.uniforms.uScrollVelocity.value += velocity
            }
        }
    })
  }, [])

  return (
    <mesh ref={meshRef} scale={[5, 7, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} /> {/* High segment count for smooth waves */}
      <shaderMaterial 
        ref={materialRef}
        args={[LiquidShader]} 
        uniforms-uTexture-value={texture}
      />
    </mesh>
  )
}

// --------------------------------------------------------
// 3. THE PAGE LAYOUT
// --------------------------------------------------------
export default function Day13() {
  return (
    <div style={{ width: '100%', background: '#111', color: 'white' }}>
      
      {/* BACKGROUND CANVAS */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6] }}>
          <LiquidPlane />
        </Canvas>
      </div>

      {/* FOREGROUND SCROLL CONTENT */}
      <div className="scroll-layout" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '8vw', margin: 0, fontFamily: 'Impact', mixBlendMode: 'difference' }}>VELOCITY</h1>
        </div>

        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '8vw', margin: 0, fontFamily: 'Impact', mixBlendMode: 'difference', color: '#00ff88' }}>GLITCH</h1>
        </div>

        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '8vw', margin: 0, fontFamily: 'Impact', mixBlendMode: 'difference' }}>SHIFTER</h1>
        </div>

      </div>

    </div>
  )
}