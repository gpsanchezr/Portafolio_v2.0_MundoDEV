import { PROJECTS } from './PortfolioData'
import { useWorldStore } from '../../stores/worldStore'

export default function PanelOverlay() {
  const activeProjectId = useWorldStore((s) => s.activeProject)

  if (!activeProjectId) return null

  const proyecto = PROJECTS.find((p) => p.id === activeProjectId)
  if (!proyecto) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: 16,
        bottom: 16,
        zIndex: 210,
        width: 360,
        maxWidth: 'calc(100vw - 32px)',
        padding: 14,
        borderRadius: 18,
        border: '1px solid rgba(255,137,181,.28)',
        background: 'rgba(8,12,24,.42)',
        backdropFilter: 'blur(14px)',
        color: '#ff89b5',
        fontFamily: 'Inter, sans-serif',
        boxShadow:
          '0 24px 64px rgba(0,0,0,.32), inset 0 0 0 1px rgba(255,255,255,.04)',
      }}
    >
      <div
        style={{
          fontWeight: 950,
          fontSize: 15,
          marginBottom: 6,
          color: '#ffd0e6',
          textShadow: '0 0 18px rgba(255,137,181,.14)',
        }}
      >
        {proyecto.title}
      </div>

      <div style={{ color: '#f0e8dc', opacity: 0.86, lineHeight: 1.55, fontSize: 13 }}>
        {proyecto.description}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
        <a
          href={proyecto.github}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 12px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,.12)',
            background: 'rgba(255,255,255,.04)',
            color: '#f0e8dc',
            fontWeight: 900,
            textDecoration: 'none',
            fontSize: 12.6,
            opacity: 0.95,
          }}
        >
          GitHub ↗
        </a>

        {proyecto.deploy ? (
          <a
            href={proyecto.deploy}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 12px',
              borderRadius: 14,
              border: '1px solid rgba(255,137,181,.32)',
              background:
                'linear-gradient(180deg, rgba(255,137,181,.18), rgba(255,137,181,.06))',
              color: '#ff89b5',
              fontWeight: 950,
              textDecoration: 'none',
              fontSize: 12.6,
              opacity: 0.98,
            }}
          >
            Deploy ↗
          </a>
        ) : null}
      </div>
    </div>
  )
}

