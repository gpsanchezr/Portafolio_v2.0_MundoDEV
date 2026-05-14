export function Minimap() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 205,
        width: 160,
        height: 160,
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'rgba(8,12,24,.55)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 12, color: '#f0e8dc', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
        Minimap (placeholder)
      </div>
    </div>
  )
}

