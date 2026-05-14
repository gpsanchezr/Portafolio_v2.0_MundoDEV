import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Preload, PerformanceMonitor } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { useWorldStore } from '../stores/worldStore'
import LoadingScreen from '../components/ui/LoadingScreen'
import IntroScreen from '../components/ui/IntroScreen'
import HUD from '../components/ui/HUD'
import PanelOverlay from '../components/ui/PanelOverlay'
import { Minimap } from '../components/ui/Minimap'
import { AchievementToast } from '../components/ui/AchievementToast'
import { MobileControls } from '../components/ui/MobileControls'
import World from '../components/world/World'
import { motion } from 'framer-motion'

const CONTROLS = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'run', keys: ['ShiftLeft', 'ShiftRight'] },
  { name: 'interact', keys: ['KeyE', 'Enter'] },
]

interface Props {
  onBack: () => void
}

export default function World3DPage({ onBack }: Props) {
  const { isLoaded, introComplete, isMobile } = useWorldStore()

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#080c18',
      }}
    >
      {/* Loading + Intro */}
      <LoadingScreen />
      {isLoaded && !introComplete && <IntroScreen />}

      {/* In-game UI */}
      {introComplete && (
        <>
          <HUD />
          <Minimap />
          <PanelOverlay />
          <AchievementToast />
          {isMobile && <MobileControls />}
        </>
      )}

      {/* ← Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 300,
          padding: '.44rem 1.1rem',
          background: 'rgba(8,12,24,.88)',
          border: '1px solid rgba(255,137,181,.38)',
          borderRadius: '100px',
          color: '#ff89b5',
          fontSize: '.78rem',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '.35rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
      ← Volver al portafolio 2D
      </motion.button>

      {/* 3D Canvas */}
      <KeyboardControls map={CONTROLS}>
        <Canvas
          shadows="soft"
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          camera={{ fov: 58, near: 0.1, far: 420, position: [0, 15, 28] }}
          dpr={[1, isMobile ? 1.5 : 2]}
          style={{ background: '#f5d8b8' }}
        >
          <PerformanceMonitor />
          <Suspense fallback={null}>
            <Physics gravity={[0, -30, 0]} timeStep="vary">
              <World />
            </Physics>
            <Preload all />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}
