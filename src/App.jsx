import { useState } from 'react'
import './App.css'
import Day01 from './days/Day01'
import Day02 from './days/Day02'
import Day03 from './days/Day03'
import Day04 from './days/Day04'
import Day05 from './days/Day05' 
import Day06 from './days/Day06'
import Day07 from './days/Day07'
import Day08 from './days/Day08'
import Day09 from './days/Day09'
import Day10 from './days/Day10'
import Day11 from './days/Day11'
import Day12 from './days/Day12'
import Day13 from './days/Day13'// <--- IMPORT THIS

const components = {
  1: Day01,
  2: Day02,
  3: Day03,
  4: Day04,
  5: Day05, 
  6: Day06,
  7: Day07,
  8: Day08,
  9: Day09,
  10:Day10,
  11:Day11,
  12:Day12,
  13:Day13// <--- ADD THIS
}

export default function App() {
  // SET DEFAULT TO 5 SO YOU SEE IT IMMEDIATELY
  const [activeDay, setActiveDay] = useState(5) 
  const ActiveComponent = components[activeDay]

  return (
    <>
      {/* NAVIGATION BAR */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        padding: '15px', background: '#111', borderBottom: '1px solid #333',
        display: 'flex', gap: '10px', zIndex: 9999, overflowX: 'auto'
      }}>
        <span style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>GSAP 14:</span>
        {Object.keys(components).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(Number(day))}
            style={{
              padding: '8px 16px',
              background: activeDay === Number(day) ? '#00ff88' : '#333',
              color: activeDay === Number(day) ? '#000' : '#fff',
              border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* RENDER AREA */}
      <div style={{ width: '100vw', minHeight: '100vh' }}>
        {ActiveComponent ? <ActiveComponent /> : <div style={{color:'white', padding: 50}}>Day Not Ready</div>}
      </div>
    </>
  )
}