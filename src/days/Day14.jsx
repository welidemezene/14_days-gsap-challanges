import * as THREE from 'three'
import { useRef, useLayoutEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  useGLTF, 
  useScroll, 
  ScrollControls, 
  Scroll, 
  Environment, 
  Float, 
  ContactShadows,
  Sparkles 
} from '@react-three/drei'

// ----------------------------------------------------
// 1. THE HERO MODEL (The VR Headset)
// ----------------------------------------------------
function Headset() {
  const { scene } = useGLTF('/headset.glb') // Ensure file is in public folder
  const group = useRef()
  const scroll = useScroll()
  
  // Responsive Scale logic inside the component
  const { viewport } = useThree()
  // Mobile (small screen) = smaller scale to fit
  const scale = viewport.width < 5 ? 0.1 : 0.3

  useFrame((state, delta) => {
    // --- SCROLL TIMELINE ---
    // r1: 0% - 33% (Intro -> Side Profile)
    // r2: 33% - 66% (Side -> Lens Close up)
    // r3: 66% - 100% (Lens -> Front Float)
    const r1 = scroll.range(0, 1/3)
    const r2 = scroll.range(1/3, 1/3)
    const r3 = scroll.range(2/3, 1/3)

    // 1. ROTATION (Choreography)
    // Start: Tilted slightly.
    // End of R1: Rotate to show side profile (90 deg)
    const targetRotY = -0.5 + (r1 * Math.PI / 2) + (r3 * Math.PI)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 4, delta)
    
    // Tilt X (Look up/down)
    const targetRotX = (r2 * 0.5) - (r3 * 0.5)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 4, delta)

    // 2. POSITION (Float Logic)
    // Move slightly left/right to make room for text
    const targetX = r1 * 1.5 - (r3 * 1.5)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 4, delta)

    // 3. ZOOM (The Drama)
    // During r2 (Middle section), zoom in VERY close
    const zoomIntensity = 1 + (r2 * 1.5)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, scale * zoomIntensity, 4, delta))
  })

  return (
    <group ref={group} position={[0, -0.5, 0]} dispose={null}>
        <primitive object={scene} />
    </group>
  )
}

// ----------------------------------------------------
// 2. THE APP LAYOUT
// ----------------------------------------------------
export default function Day14() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        
        {/* --- CYBERPUNK LIGHTING --- */}
        <color attach="background" args={['#050505']} />
        
        {/* Soft fill light */}
        <ambientLight intensity={0.5} />
        
        {/* Key Light (White) */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        {/* Rim Light 1 (Cyan) - Gives that tech edge */}
        <pointLight position={[-10, 0, -10]} intensity={5} color="#00ffff" />
        
        {/* Rim Light 2 (Magenta) - Contrast */}
        <pointLight position={[10, -5, -10]} intensity={5} color="#ff0055" />
        
        {/* Reflections */}
        <Environment preset="city" />

        {/* --- CONTENT --- */}
        <ScrollControls pages={3} damping={0.2}>
            
            {/* 3D OBJECT */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Headset />
            </Float>
            
            {/* ATMOSPHERE */}
            <Sparkles count={100} scale={8} size={2} speed={0.4} opacity={0.5} color="#00ffff" />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} blur={2.5} scale={10} color="#000" />

            {/* HTML OVERLAY */}
            <Scroll html style={{ width: '100%' }}>
                
                {/* SECTION 1: INTRO */}
                <section style={styles.section}>
                    <div>
                        <h1 style={styles.h1}>V-VISION<br/><span style={{color:'#444'}}>PRO</span></h1>
                        <p style={styles.p}>Reality. Upgraded.</p>
                    </div>
                </section>

                {/* SECTION 2: SPECS (Right) */}
                <section style={{...styles.section, justifyContent: 'flex-end'}}>
                    <div style={{ textAlign: 'right' }}>
                        <h1 style={styles.h1}>8K<br/><span style={{color:'#00ffff'}}>OLED</span></h1>
                        <p style={styles.p}>Pixel-perfect immersion.</p>
                    </div>
                </section>

                {/* SECTION 3: CTA (Center) */}
                <section style={{...styles.section, justifyContent: 'center'}}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={styles.h1}>$2,999</h1>
                        <button style={styles.button}>PRE-ORDER</button>
                    </div>
                </section>

            </Scroll>
        </ScrollControls>

      </Canvas>
    </div>
  )
}

// ----------------------------------------------------
// 3. STYLES
// ----------------------------------------------------
const styles = {
    section: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10%',
        boxSizing: 'border-box'
    },
    h1: {
        fontSize: 'clamp(3rem, 10vw, 8rem)',
        margin: 0,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        color: '#fff',
        lineHeight: 0.8,
        letterSpacing: '-0.05em'
    },
    p: {
        fontSize: '1.5rem',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        color: '#888',
        marginTop: '20px'
    },
    button: {
        marginTop: '30px',
        padding: '15px 50px',
        background: '#fff',
        color: '#000',
        border: 'none',
        borderRadius: '50px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        fontWeight: 800,
        letterSpacing: '1px',
        transition: 'transform 0.2s'
    }
}