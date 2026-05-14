export default function HUD() {
  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 220, color: '#f0e8dc' }}>
      <div
        style={{
          padding: '10px 14px',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(8,12,24,.6)',
          backdropFilter: 'blur(10px)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
        }}
      >
        HUD (placeholder)
      </div>
    </div>
  )
}

