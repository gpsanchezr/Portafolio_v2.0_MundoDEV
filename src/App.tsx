import { useState, useCallback } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import PortfolioPage from './pages/Portfolio'
import World3DPage from './pages/World3D'

export type View = 'portfolio' | 'world'

export default function App() {
  const [view, setView] = useState<View>('portfolio')

  const goToWorld = useCallback(() => setView('world'), [])
  const goToPortfolio = useCallback(() => setView('portfolio'), [])

  return (
    <AnimatePresence mode="wait">
      {view === 'portfolio' ? (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
        >
          <PortfolioPage onEnterWorld={goToWorld} />
        </motion.div>
      ) : (
        <motion.div
          key="world"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '100%' }}
        >
          <World3DPage onBack={goToPortfolio} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

