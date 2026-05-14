import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useWorldStore } from '../../stores/worldStore'

export default function IntroScreen() {
  const introComplete = useWorldStore((s) => s.introComplete)
  const setIntroComplete = useWorldStore((s) => s.setIntroComplete)

  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started) return
    setStarted(true)
    const t = window.setTimeout(() => setIntroComplete(true), 2350)
    return () => window.clearTimeout(t)
  }, [setIntroComplete, started])

  if (introComplete) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f0e8dc',
        background: 'rgba(8,12,24,.35)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ padding: 24, maxWidth: 560, textAlign: 'center' }}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
        >
          <h2 style={{ marginBottom: 10, fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
            Jardín Sakura
          </h2>
          <p style={{ opacity: 0.9, marginBottom: 18, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
            Un cozy videojuego para mostrar mi portafolio.
            <br />
            Acércate a las zonas y presiona <span style={{ color: '#ff89b5', fontWeight: 800 }}>E</span> para abrir cada proyecto.
          </p>
        </motion.div>

        <div
          style={{
            margin: '0 auto',
            width: 260,
            height: 12,
            borderRadius: 999,
            border: '1px solid rgba(255,137,181,.25)',
            background: 'rgba(255,137,181,.07)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.1, ease: 'easeInOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, rgba(255,137,181,.15), rgba(255,137,181,.65))', borderRadius: 999 }}
          />
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75, color: '#f0e8dc' }}>
          La intro se sincroniza cuando integramos la carga real de assets.
        </div>
      </div>
    </motion.div>
  )
}
