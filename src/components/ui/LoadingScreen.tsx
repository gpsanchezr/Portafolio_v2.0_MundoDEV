import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useWorldStore } from '../../stores/worldStore'

export default function LoadingScreen() {
  const isLoaded = useWorldStore((s) => s.isLoaded)
  const setLoaded = useWorldStore((s) => s.setLoaded)
  const setIntroComplete = useWorldStore((s) => s.setIntroComplete)

  // Simulación de carga hasta integrar assets reales.
  const canFinish = true

  const [progress, setProgress] = useState(8)
  const durationMs = useMemo(() => 1600 + Math.floor(Math.random() * 400), [])

  useEffect(() => {
    if (isLoaded) return

    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = 8 + eased * 92
      setProgress(value)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    const timeout = window.setTimeout(() => {
      setProgress(100)
      if (typeof setLoaded === 'function') setLoaded(true)
      if (typeof setIntroComplete === 'function') setIntroComplete(false)
    }, durationMs)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timeout)
    }
  }, [durationMs, isLoaded])

  if (isLoaded) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(8,12,24,.9)',
        color: '#ff89b5',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ textAlign: 'center', width: 420, maxWidth: '90vw', padding: 18 }}
      >
        <div
          style={{
            fontSize: 18,
            marginBottom: 10,
            letterSpacing: 0.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            color: '#ff89b5',
          }}
        >
          <span style={{ filter: 'drop-shadow(0 8px 18px rgba(255,137,181,.25))' }}>?</span>
          Cargando mundo 3D…
        </div>

        <div style={{ opacity: 0.85, marginBottom: 14 }}>Preparando zonas Sakura.</div>

        <div
          style={{
            margin: '0 auto',
            width: 320,
            maxWidth: '100%',
            height: 12,
            borderRadius: 999,
            border: '1px solid rgba(255,137,181,.25)',
            background: 'rgba(255,137,181,.07)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{ height: '100%' }}
            animate={{ width: `${Math.round(progress)}%` }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.12 }}
            initial={{ width: '0%' }}
          />
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8, color: '#f0e8dc' }}>
          {Math.round(progress)}%
        </div>

        {canFinish ? (
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.55, color: '#f0e8dc' }}>
            (Simulación de carga — listo para integrar assets reales)
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}

