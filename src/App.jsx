import { useState } from 'react'
import Day01 from './days/Day01'
import "./App.css"

// As we go, we will add Day02, Day03 here...
const components = {
  1: Day01,
}

export default function App() {
  const [activeDay, setActiveDay] = useState(1)
  const ActiveComponent = components[activeDay]

  return (
    <>
      {/* NAVIGATION BAR */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        padding: '15px', background: '#111', borderBottom: '1px solid #333',
        display: 'flex', gap: '10px', zIndex: 9999, alignItems: 'center'
      }}>
        <span style={{ color: '#00ff88', fontWeight: 'bold', marginRight: 10 }}>GSAP 14 //</span>
        {Object.keys(components).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(Number(day))}
            style={{
              padding: '8px 16px',
              background: activeDay === Number(day) ? '#fff' : '#222',
              color: activeDay === Number(day) ? '#000' : '#888',
              border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* RENDER AREA */}
      <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
        {ActiveComponent ? <ActiveComponent /> : <div style={{color:'white', padding: 50}}>Day Not Ready</div>}
      </div>
    </>
  )
}