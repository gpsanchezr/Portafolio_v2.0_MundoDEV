import React, { useEffect, useRef } from 'react'

export const SakuraParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()

    const petalImg = new Image()
    petalImg.src = '/assets/images/petal.png'

    type Petal = {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      angle: number
      spin: number
      seed: number
      reset: (first?: boolean) => void
      update: () => void
      draw: () => void
    }

    const petals: Petal[] = []
    const maxPetals = 10

    const createPetal = (): Petal => {
      const p: Omit<Petal, 'reset' | 'update' | 'draw'> = {
        x: 0,
        y: 0,
        size: 0,
        speedX: 0,
        speedY: 0,
        angle: 0,
        spin: 0,
        seed: Math.random(),
      }

      const reset = (first = false) => {
        p.x = Math.random() * canvas.width
        p.y = first ? Math.random() * canvas.height : -20 - Math.random() * 120

        // Pequeños y sutiles
        p.size = 10 + Math.random() * 12

        // Diagonal lenta
        p.speedX = 0.15 + Math.random() * 0.55
        p.speedY = 0.25 + Math.random() * 0.65

        // Girar suave
        p.angle = Math.random() * Math.PI * 2
        p.spin = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      }

      const update = () => {
        p.x += p.speedX
        p.y += p.speedY
        p.angle += p.spin

        // Loop
        if (p.y > canvas.height + 40 || p.x > canvas.width + 40) reset()
      }

      const draw = () => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = 0.8
        ctx.drawImage(petalImg, -p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }

      reset(true)

      return {
        ...p,
        reset,
        update,
        draw,
      }
    }

    for (let i = 0; i < maxPetals; i++) petals.push(createPetal())

    let raf = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach((p) => {
        p.update()
        p.draw()
      })
      raf = window.requestAnimationFrame(animate)
    }

    const start = () => {
      window.cancelAnimationFrame(raf)
      animate()
    }

    petalImg.onload = start

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}

