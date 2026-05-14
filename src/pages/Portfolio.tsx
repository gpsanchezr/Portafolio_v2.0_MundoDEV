import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SakuraParticles } from '../components/ui/SakuraParticles'
import { createClient } from '@supabase/supabase-js'

// ── Configuración de Supabase ──
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oldvgciksrwujujimepg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_inEBiuI_qSxUzBka_gYd8A_zlCSGDmp'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Datos de Proyectos y Testimonios ──
const PROJECTS_DATA = [
  {
    id: 'happyfarm',
    title: 'Del Campo a Tu Mesa (Happy-Farm)',
    subtitle: 'Plataforma e-commerce para Barranquilla',
    description: 'Plataforma e-commerce para Barranquilla. Destacado: Carrito con persistencia local y pedidos automatizados vía WhatsApp Business.',
    github: 'https://github.com/gpsanchezr/HAPPY-FARM.git',
    demo: 'https://del-campo-a-tu-mesa-1v4j73q0e-gpsanchezrs-projects.vercel.app/',
    docs: 'https://docs.google.com/document/d/1AYkPperOIYQzlworS24ZLEm9Oi5J3jw0zlMpfXcpmDM/edit?usp=sharing',
    video: '/assets/videos/happyfarm.mp4'
  },
  {
    id: 'parknidus',
    title: 'ParkNidus (Sistema de Control de Parqueadero)',
    subtitle: 'Gestión eficiente de cupos en tiempo real',
    description: 'Gestión eficiente de cupos en tiempo real con diseño Neon Pulse. Destacado: Tarifas por tipo de vehículo y asignación automática (30 autos, 15 motos).',
    github: 'https://github.com/gpsanchezr/ParkNidus',
    demo: 'https://park-nidus-lm89f36ur-gpsanchezrs-projects.vercel.app/',
    docs: 'https://docs.google.com/document/d/1oIiIQsVBF9MgdPi8paFpfPY8UqKfUlqK/edit?usp=sharing',
    video: '/assets/videos/parknidus.mp4'
  },
  {
    id: 'terrasoft',
    title: 'Terrasoft - Inmobiliaria MonteVerde',
    subtitle: 'Gestión inmobiliaria, pagos y PQRS',
    description: 'Gestión inmobiliaria, pagos y PQRS.',
    github: 'https://github.com/gpsanchezr/Terrasoft-Inmobiliaria.git',
    demo: 'https://terrasoft-inmobiliaria-git-main-gpsanchezrs-projects.vercel.app/',
    docs: 'https://docs.google.com/document/d/1ZAzT2NGYlHNaF_32qn6pcxX5u98Z1jEB/edit?usp=sharing',
    video: '/assets/videos/terrasoft.mp4'
  },
  {
    id: 'cine-verse',
    title: 'Cine-Verse',
    subtitle: 'Gestión integral de sala de cine para 150 personas',
    description: 'Gestión integral de sala de cine para 150 personas. Nota: Fase de ajustes finales. Integrando CineBot y asientos VIP.',
    github: 'https://github.com/gpsanchezr/Cine-Verse.git',
    demo: 'https://cine-verse-git-main-gpsanchezrs-projects.vercel.app/',
    docs: 'https://drive.google.com/file/d/19dUGY4rsGCpttT9CTCbpBZwkA3vKwhw1/view?usp=sharing',
    video: '/assets/videos/cine-verse.mp4'
  },
  {
    id: 'contador-personas',
    title: 'Contador de Personas',
    subtitle: 'Zona IA - Contador de Personas',
    description: 'Sistema inteligente para conteo de personas usando visión artificial.',
    github: 'https://github.com/gpsanchezr/ContadorPi.main.git',
    demo: '#',
    docs: 'https://docs.google.com/document/d/1YFmk8ceLQv8HJuTkXtoLuLQArGL68LSR/edit?usp=sharing',
    video: '/assets/videos/contador-personas.mp4'
  },
  {
    id: 'glowcode',
    title: 'GlowCode',
    subtitle: 'Plataforma educativa interactiva',
    description: 'Sistema para la enseñanza y el aprendizaje dinámico de conceptos de programación.',
    github: 'https://github.com/gpsanchezr/GlowCode',
    demo: '#',
    docs: 'https://docs.google.com/document/d/1izbb8wiSaiPEGs8dmbdAk5Y3CBLUYHf3/edit?usp=sharing',
    video: '/assets/videos/glowcode.mp4'
  }
]

const TESTIMONIALS_DATA = [
  { name: 'Eleanyeris', text: 'Excelente organización y calidad visual en los proyectos.', img: '/assets/images/image_939079.jpg', role: 'Cliente' },
  { name: 'Luisa', text: 'Las interfaces son modernas y profesionales.', img: '/assets/images/image_938821.jpg', role: 'Cliente' },
  { name: 'Ing. Stivenson García', text: 'Profesional y responsable. Se nota gran dominio técnico en bases de datos y despliegues.', img: '/assets/images/image_937234.jpg', role: 'Instructor' },
  { name: 'Ing. Fabian Florian', text: 'Excelente capacidad analítica y lógica. Gran enfoque en el desarrollo backend y en la resolución de problemas complejos.', img: 'https://ui-avatars.com/api/?name=Fabian+Florian&background=ff89b5&color=fff', role: 'Instructor Técnico' },
  { name: 'Ing. Omar Gutierrez', text: 'Demuestra un gran compromiso con las buenas prácticas de desarrollo y arquitectura de software. Resultados de muy alto nivel.', img: 'https://ui-avatars.com/api/?name=Omar+Gutierrez&background=ff89b5&color=fff', role: 'Instructor' }
]

type TabId = 'frontend' | 'backend' | 'tools'

// ── Utilidades UI ──
function useCursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let x = -9999
    let y = -9999
    const update = () => {
      raf = 0
      el.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`
    }
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return ref
}

function Typewriter({ items, className }: { items: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  useEffect(() => {
    const current = items[index]
    let i = 0
    const typing = setInterval(() => {
      setText(current.slice(0, i))
      i++
      if (i > current.length) clearInterval(typing)
    }, 40)
    const change = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 2200)
    return () => {
      clearInterval(typing)
      clearTimeout(change)
    }
  }, [index, items])
  return (
    <span className={className}>
      {text}
      <span style={{ opacity: 0.7, marginLeft: 2 }}>|</span>
    </span>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ padding: '10px 14px', borderRadius: 999, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', color: '#f4f4f5', fontSize: 13 }}>
      {children}
    </span>
  )
}

function SkillsTabs() {
  const [tab, setTab] = useState<TabId>('frontend')
  const content: Record<TabId, string[]> = {
    frontend: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'UX/UI'],
    backend: ['Python', 'FastAPI', 'Laravel', 'Supabase', 'MySQL'],
    tools: ['GitHub', 'Vercel', 'Figma', 'Linux', 'Raspberry Pi'],
  }
  return (
    <div style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', backdropFilter: 'blur(14px)', padding: 20 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        {[ { id: 'frontend', label: 'Frontend' }, { id: 'backend', label: 'Backend' }, { id: 'tools', label: 'Herramientas' } ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id as TabId)}
            style={{ padding: '10px 16px', borderRadius: 14, cursor: 'pointer', border: tab === item.id ? '1px solid rgba(255,137,181,.6)' : '1px solid rgba(255,255,255,.08)', background: tab === item.id ? 'rgba(255,137,181,.15)' : 'rgba(255,255,255,.03)', color: tab === item.id ? '#ff89b5' : '#fff', fontWeight: 700 }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {content[tab].map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Component ──
export default function PortfolioPage({ onEnterWorld }: { onEnterWorld: () => void }) {
  const glowRef = useCursorGlow()
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const testimonialsRef = useRef<HTMLDivElement | null>(null)
  
  // Estados Modal Proyecto y Formulario
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState('')

  const roles = useMemo(() => ['Frontend premium', 'Arquitectura escalable', 'Experiencias interactivas', 'Soluciones Full Stack', 'Interfaces modernas'], [])

  const isHoverProj = useRef(false)
  const isHoverTest = useRef(false)

  // Navegación Carruseles Manual
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: direction === 'left' ? -420 : 420, behavior: 'smooth' })
  }
  
  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (!testimonialsRef.current) return
    testimonialsRef.current.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  // Carruseles Automáticos
  useEffect(() => {
    const projInterval = setInterval(() => {
      if (carouselRef.current && !isHoverProj.current) {
        const el = carouselRef.current
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) el.scrollTo({ left: 0, behavior: 'smooth' })
        else el.scrollBy({ left: 400, behavior: 'smooth' })
      }
    }, 3500)

    const testInterval = setInterval(() => {
      if (testimonialsRef.current && !isHoverTest.current) {
        const el = testimonialsRef.current
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) el.scrollTo({ left: 0, behavior: 'smooth' })
        else el.scrollBy({ left: 340, behavior: 'smooth' })
      }
    }, 4000)

    return () => {
      clearInterval(projInterval)
      clearInterval(testInterval)
    }
  }, [])

  // Handler Contacto (Supabase)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('Enviando...')
    try {
      const { error } = await supabase.from('contact_messages').insert([{ 
        name: form.name, 
        email: form.email, 
        subject: form.subject, 
        message: form.message 
      }])
      if (error) throw error
      setFormStatus('✅ ¡Mensaje enviado con éxito!')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setFormStatus('❌ Hubo un error al enviar tu mensaje. Intenta nuevamente.')
    }
  }

  return (
    <div style={{ background: '#080c18', minHeight: '100vh', color: 'white', position: 'relative', overflowX: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <div ref={glowRef} style={{ width: 320, height: 320, position: 'fixed', borderRadius: 999, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(255,137,181,.30), rgba(255,137,181,0) 70%)', zIndex: 0, transform: 'translate3d(-9999px,-9999px,0)' }} />

      <SakuraParticles />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* NAVBAR */}
        <nav style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '14px 32px', borderRadius: 999, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(18px)', width: 'max-content', maxWidth: '95vw', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'center', whiteSpace: 'nowrap' }}>
            {[
              ['inicio', 'Inicio'],
              ['sobre-mi', 'Sobre mí'],
              ['servicios', 'Servicios'],
              ['proyectos', 'Proyectos'],
              ['testimonios', 'Testimonios'],
              ['contacto', 'Contacto'],
              ['footer', 'Footer'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <section id='inicio' style={{ maxWidth: 1200, margin: '0 auto', padding: '140px 24px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(46px, 7vw, 76px)', lineHeight: 1.1, fontWeight: 900, marginBottom: 20 }}>
                Giseella Patricia Sanchez Rico
              </motion.h1>
              <div style={{ color: '#ff89b5', fontWeight: 800, fontSize: 32, marginBottom: 20, minHeight: 45, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span>Desarrolladora Web Full Stack —</span>
                <Typewriter items={roles} />
              </div>
              <p style={{ maxWidth: 650, lineHeight: 1.8, opacity: 0.9, fontSize: 18, marginBottom: 28 }}>
                Diseño experiencias digitales modernas con enfoque en arquitectura escalable, interfaces premium y despliegues profesionales.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 26 }}>
                <button onClick={onEnterWorld} style={primaryButtonStyle}>
                  Entrar al portafolio 3D
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {[
                  ['3+', 'Proyectos activos'],
                  ['15+', 'Implementaciones'],
                  ['8+', 'Soluciones IA/UX'],
                ].map(([n, label]) => (
                  <div key={label} style={statCardStyle}>
                    <div style={{ color: '#ff89b5', fontSize: 40, fontWeight: 900 }}>{n}</div>
                    <div style={{ opacity: 0.88, marginTop: 6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 420, height: 420, borderRadius: '50%', border: '6px solid #ff89b5', overflow: 'hidden', boxShadow: '0 0 60px rgba(255,137,181,.6)', background: '#0c1224' }}>
                <img src='/perfil_gise.png' alt='Giseella Patricia Sanchez Rico' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE MI */}
        <section id='sobre-mi' style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 80px' }}>
          <h2 style={sectionTitleStyle}>Sobre mí</h2>
          <div style={glassCardStyle}>
            <p style={{ lineHeight: 1.9, opacity: 0.92, marginBottom: 24, fontSize: 17 }}>
              Soy desarrolladora Full Stack con enfoque en arquitectura de bases de datos y despliegues. Diseñar sistemas confiables, escalables y con experiencia de usuario pulida es mi forma de convertir ideas en productos reales.
            </p>
            <div style={{ marginBottom: 30 }}>
              <a href="https://drive.google.com/file/d/1ROx-MqmIek3LLNd3mQWNljyd1Or5LJ7H/view?usp=sharing" target="_blank" rel="noreferrer" style={{ ...primaryButtonStyle, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Descargar Hoja de Vida
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
            <SkillsTabs />
          </div>
        </section>

        {/* SERVICIOS */}
        <section id='servicios' style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 80px' }}>
          <h2 style={sectionTitleStyle}>Servicios</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {[
              { title: 'Desarrollo Full Stack', text: 'Aplicaciones modernas con React, APIs y despliegues escalables.' },
              { title: 'Gestión de Bases de Datos', text: 'Diseño relacional, optimización y arquitectura segura.' },
              { title: 'Soluciones IA', text: 'Integraciones inteligentes y automatización de procesos.' },
            ].map((item) => (
              <div key={item.title} style={glassCardStyle}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#ff89b5', marginBottom: 12 }}>{item.title}</div>
                <p style={{ lineHeight: 1.8, opacity: 0.9 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROYECTOS */}
        <section id='proyectos' style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 80px', position: 'relative' }}>
          <h2 style={sectionTitleStyle}>Proyectos</h2>
          <button onClick={() => scrollCarousel('left')} style={carouselButtonLeft}>←</button>
          <button onClick={() => scrollCarousel('right')} style={carouselButtonRight}>→</button>
          <div ref={carouselRef} onMouseEnter={() => (isHoverProj.current = true)} onMouseLeave={() => (isHoverProj.current = false)} style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none', paddingBottom: 10 }}>
            {PROJECTS_DATA.map((project) => (
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }} 
                key={project.id} 
                onClick={() => setSelectedProject(project)} 
                style={{ minWidth: 380, maxWidth: 380, flexShrink: 0, cursor: 'pointer', ...glassCardStyle }}
              >
                <img src={`/assets/images/${project.id}.jpg`} alt={project.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 18, marginBottom: 16 }} />
                <div style={{ color: '#ff89b5', fontWeight: 800, fontSize: 24, marginBottom: 8, lineHeight: 1.2 }}>{project.title}</div>
                <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Clic para ver detalles y video ↗</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section id='testimonios' style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 80px', position: 'relative' }}>
          <h2 style={sectionTitleStyle}>Testimonios</h2>
          <button onClick={() => scrollTestimonials('left')} style={carouselButtonLeft}>←</button>
          <button onClick={() => scrollTestimonials('right')} style={carouselButtonRight}>→</button>
          <div ref={testimonialsRef} onMouseEnter={() => (isHoverTest.current = true)} onMouseLeave={() => (isHoverTest.current = false)} style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none', paddingBottom: 10 }}>
            {TESTIMONIALS_DATA.map((item) => (
              <div key={item.name} style={{ minWidth: 340, maxWidth: 340, flexShrink: 0, ...glassCardStyle }}>
                <p style={{ lineHeight: 1.8, opacity: 0.9, marginBottom: 20, fontStyle: 'italic' }}>
                  "{item.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img src={item.img} alt={item.name} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff89b5' }} />
                  <div>
                    <div style={{ color: '#ff89b5', fontWeight: 800 }}>{item.name}</div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section id='contacto' style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 80px' }}>
          <h2 style={sectionTitleStyle}>Contacto</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
            <div style={glassCardStyle}>
              <form onSubmit={handleContactSubmit} style={{ display: 'grid', gap: 14 }}>
                <input required placeholder='Nombre' value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
                <input required placeholder='Correo' type='email' value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
                <input required placeholder='Asunto' value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={inputStyle} />
                <textarea required placeholder='Mensaje' value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }} />
                <button type='submit' style={primaryButtonStyle}>Enviar mensaje</button>
                {formStatus && <div style={{ color: '#ff89b5', marginTop: 10, fontWeight: 600 }}>{formStatus}</div>}
              </form>
            </div>
            <div style={glassCardStyle}>
              <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 18, color: '#ff89b5' }}>
                Conecta Conmigo
              </div>
              <p style={{ opacity: 0.9, lineHeight: 1.8, marginBottom: 24 }}>
                ¿Tienes un proyecto en mente o buscas colaboración técnica? No dudes en contactarme para construir algo increíble.
              </p>
              <div style={{ display: 'grid', gap: 14 }}>
                <a href='https://github.com/gpsanchezr' target='_blank' rel='noreferrer' style={linkStyle}>GitHub ↗</a>
                <a href='https://linkedin.com/' target='_blank' rel='noreferrer' style={linkStyle}>LinkedIn ↗</a>
                <a href='mailto:gpsanchezr@ejemplo.com' style={linkStyle}>gpsanchezr@ejemplo.com</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER (Sección independiente) */}
        <footer id='footer' style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '60px 24px', textAlign: 'center', background: '#050811' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
             <h2 style={{ fontSize: 32, fontWeight: 900, color: '#ff89b5' }}>Giseella Patricia Sanchez Rico</h2>
             <p style={{ opacity: 0.8, maxWidth: 500, lineHeight: 1.6 }}>Desarrolladora Web Full Stack enfocada en crear experiencias únicas, seguras y escalables.</p>
             <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href='https://linkedin.com/' target='_blank' rel='noreferrer' style={secondaryButtonStyle}>LinkedIn ↗</a>
                <a href='https://github.com/gpsanchezr' target='_blank' rel='noreferrer' style={secondaryButtonStyle}>GitHub ↗</a>
                <a href='https://drive.google.com/file/d/1ROx-MqmIek3LLNd3mQWNljyd1Or5LJ7H/view?usp=sharing' target='_blank' rel='noreferrer' style={secondaryButtonStyle}>Hoja de Vida ↗</a>
             </div>
             <div style={{ opacity: 0.6, marginTop: 20 }}>
               © 2026 Giseella Patricia Sanchez Rico — Todos los derechos reservados.
             </div>
          </div>
        </footer>
      </div>

      {/* MODAL DE PROYECTOS */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ ...glassCardStyle, maxWidth: 800, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer' }}>✕</button>
              <h3 style={{ fontSize: 32, color: '#ff89b5', marginBottom: 10, fontWeight: 900 }}>{selectedProject.title}</h3>
              <p style={{ opacity: 0.9, marginBottom: 20, fontSize: 18 }}>{selectedProject.subtitle}</p>

              <video src={selectedProject.video} autoPlay controls style={{ width: '100%', borderRadius: 16, marginBottom: 20, background: '#000', maxHeight: 400, objectFit: 'contain' }} />

              <p style={{ lineHeight: 1.8, marginBottom: 24, fontSize: 16 }}>{selectedProject.description}</p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={selectedProject.github} target='_blank' rel='noreferrer' style={secondaryButtonStyle}>GitHub ↗</a>
                <a href={selectedProject.demo} target='_blank' rel='noreferrer' style={primaryButtonStyle}>Demo ↗</a>
                <a href={selectedProject.docs} target='_blank' rel='noreferrer' style={secondaryButtonStyle}>Documentación ↗</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 52,
  fontWeight: 900,
  marginBottom: 28,
}

const glassCardStyle: React.CSSProperties = {
  borderRadius: 28,
  border: '1px solid rgba(255,255,255,.08)',
  background: 'rgba(255,255,255,.03)',
  backdropFilter: 'blur(14px)',
  padding: 24,
}

const primaryButtonStyle: React.CSSProperties = {
  padding: '16px 24px',
  borderRadius: 16,
  border: '1px solid rgba(255,137,181,.4)',
  background: 'rgba(255,137,181,.14)',
  color: '#ff89b5',
  fontWeight: 800,
  cursor: 'pointer',
  fontSize: 16,
  textDecoration: 'none',
}

const secondaryButtonStyle: React.CSSProperties = {
  padding: '14px 20px',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,.08)',
  background: 'rgba(255,255,255,.04)',
  color: 'white',
  textDecoration: 'none',
  fontWeight: 700,
}

const statCardStyle: React.CSSProperties = {
  borderRadius: 24,
  padding: 20,
  background: 'rgba(255,255,255,.03)',
  border: '1px solid rgba(255,255,255,.08)',
}

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,.08)',
  background: 'rgba(255,255,255,.04)',
  color: 'white',
  outline: 'none',
  fontFamily: 'inherit'
}

const linkStyle: React.CSSProperties = {
  padding: '16px 18px',
  borderRadius: 16,
  background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.08)',
  color: 'white',
  textDecoration: 'none',
  fontWeight: 700,
}

const carouselButtonLeft: React.CSSProperties = {
  position: 'absolute',
  left: -10,
  top: '55%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: 60,
  height: 60,
  borderRadius: '50%',
  border: '1px solid rgba(255,137,181,.4)',
  background: 'rgba(8,12,24,.7)',
  color: '#ff89b5',
  fontSize: 28,
  cursor: 'pointer',
}

const carouselButtonRight: React.CSSProperties = {
  position: 'absolute',
  right: -10,
  top: '55%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: 60,
  height: 60,
  borderRadius: '50%',
  border: '1px solid rgba(255,137,181,.4)',
  background: 'rgba(8,12,24,.7)',
  color: '#ff89b5',
  fontSize: 28,
  cursor: 'pointer',
}