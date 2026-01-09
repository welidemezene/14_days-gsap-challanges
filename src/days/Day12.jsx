import { useLayoutEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Float, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// --------------------------------------------------------
// 1. THE TUNNEL (The Environment)
// --------------------------------------------------------
function Tunnel() {
  // Generate 30 rings with random properties
  const rings = Array.from({ length: 30 }, (_, i) => ({
    z: -i * 10, // Longer distance for more speed sensation
    scale: 1 + Math.random(),
    rotation: Math.random() * Math.PI,
    color: i % 2 === 0 ? "#00ffff" : "#ff0055" // Cyberpunk Cyan/Pink
  }))

  return (
    <group>
      {/* FOG: The secret to making it look infinite */}
      {/* Color matches the black background to fade objects out */}
      <fog attach="fog" args={['#000', 10, 80]} />
      
      {/* STARS: Adds speed reference points */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />

      {/* RINGS */}
      {rings.map((data, i) => (
        <mesh key={i} position={[0, 0, data.z]} rotation={[0, 0, data.rotation]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color={data.color}
            emissive={data.color}
            emissiveIntensity={3} // High intensity for "Neon" look
            toneMapped={false}    // Critical for bright colors
          />
        </mesh>
      ))}

      {/* THE GOAL (Hero Object) */}
      <Float speed={5} rotationIntensity={2}>
        <mesh position={[0, 0, -320]}>
            <icosahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="white" wireframe />
        </mesh>
      </Float>
    </group>
  )
}

// --------------------------------------------------------
// 2. THE CAMERA RIG (The Pilot)
// --------------------------------------------------------
function CameraController() {
  const { camera } = useThree()
  
  useLayoutEffect(() => {
    // A. Initial Camera Setup
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, -100) // Look down the tunnel

    // B. The Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-layout",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // 1s lag creates "Momentum/Weight"
      }
    })

    // PHASE 1: Acceleration
    tl.to(camera.position, {
        z: -50,
        duration: 2,
        ease: "power2.in"
    })
    
    // PHASE 2: The Barrel Roll (Tilt)
    .to(camera.rotation, {
        z: -Math.PI / 2, // Tilt 90 degrees
        duration: 4,
        ease: "none"
    }, 0)

    // PHASE 3: Hyper-Drive (Fast movement to end)
    .to(camera.position, {
        z: -310, // Stop right in front of the object
        duration: 8,
        ease: "none" // Linear movement feels fastest
    })
    
    // PHASE 4: The Spin
    .to(camera.rotation, {
        z: -Math.PI * 4, // Spin 2 full times
        duration: 10,
        ease: "power2.inOut" // Smooth stop
    }, "<")

  }, [camera])

  return null
}

// --------------------------------------------------------
// 3. THE PAGE LAYOUT
// --------------------------------------------------------
export default function Day12() {
  return (
    <div style={{ background: '#000', width: '100%' }}>
      
      {/* FIXED CANVAS LAYER */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
        <Canvas gl={{ antialias: false }}> {/* Turn off AA for retro vibe + performance */}
          <CameraController />
          <Tunnel />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>

      {/* SCROLL TRACK LAYER (Invisible scroll height) */}
      <div className="scroll-layout" style={{ height: '600vh', position: 'relative', zIndex: 10 }}>
        
        <div style={{ position: 'absolute', top: '10vh', left: '10vw', color: 'white', mixBlendMode: 'difference' }}>
            <h1 style={{ fontSize: '10vw', margin: 0, fontFamily: 'Impact', letterSpacing: '-5px' }}>WARP</h1>
            <p style={{ fontSize: '2vw', fontFamily: 'monospace' }}>INITIALIZING...</p>
        </div>

        <div style={{ position: 'absolute', top: '250vh', right: '10vw', textAlign: 'right', color: '#00ffff', mixBlendMode: 'difference' }}>
            <h1 style={{ fontSize: '10vw', margin: 0, fontFamily: 'Impact', letterSpacing: '-5px' }}>VELOCITY</h1>
            <p style={{ fontSize: '2vw', fontFamily: 'monospace' }}>MACH 10</p>
        </div>

        <div style={{ position: 'absolute', bottom: '10vh', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '8vw', margin: 0, fontFamily: 'Impact' }}>ARRIVAL</h1>
        </div>

      </div>

    </div>
  )
}