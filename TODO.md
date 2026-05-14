# TODO - Portafolio unificado (giseella-world-portfolio)

## Fase 1 — Flujo de experiencia (Intro/Loading)
- [ ] Actualizar `src/stores/worldStore.ts`: `isLoaded`/`introComplete` con setters.
- [ ] Actualizar `LoadingScreen.tsx`: marcar `isLoaded=true` cuando corresponda.
- [ ] Actualizar `IntroScreen.tsx`: botón/auto-skip para `introComplete=true`.

## Fase 2 — Mundo 3D funcional (zonas + interacción)
- [ ] Copiar/asegurar modelos GLB en `giseella-world-portfolio/public/models/`.
- [ ] Implementar `src/components/world/World.tsx`: iluminación, suelo terracota, cielo + elementos.
- [ ] Crear 6 zonas interactivas con posiciones/labels:
  - [ ] Zona 1: (0,0,-30) fantasy_eco_city.glb
  - [ ] Zona 2: (10,0,10) house_in_lavender_field.glb
  - [ ] Zona 3: (-10,2,10) "Gestión de parqueo en red."
  - [ ] Zona 4: (10,2,-10) Terrasoft - Inmobiliaria MonteVerde
  - [ ] Zona 5: (-10,2,-10) Cine-Verse: Gestión de Cine + CineBot
  - [ ] Zona 6: (0,2,-15) Zona IA - Contador de Personas & GlowCode
- [ ] Implementar interacción E/Enter con panel overlay de proyecto.
- [ ] Asegurar que Rapier colisiona y no se atraviesa.

## Fase 3 — UI “Bruno Simon” (coherente y hermoso)
- [ ] Implementar glassmorphism real en `HUD`, `PanelOverlay`, `Minimap`.
- [ ] `AchievementToast`: mostrar logros al entrar a zonas nuevas.
- [ ] `MobileControls`: joystick táctil virtual funcional.

## Fase 4 — Portafolio normal 2D (landing premium)
- [ ] Mejorar `src/pages/Portfolio.tsx`: preloader sakura, cursor glow, typewriter hero, stats animados.
- [ ] Tabs para filtrar habilidades.
- [ ] Barra de progreso de scroll.
- [ ] (Performance) Optimizar listeners `pointermove`/`scroll` con throttling/RAF.
- [ ] (Robustez) Corregir gestión de timers en `Typewriter` para evitar leaks.
- [ ] (A11y) Respetar `prefers-reduced-motion` para efectos de movimiento.

## Fase 5 — Pruebas y ajuste
- [ ] `npm install` y `npm run dev` en `giseella-world-portfolio`.
- [ ] Verificar performance (DPR, loading, assets).
- [ ] Validar interacción teclado/móvil.

## Checklist (actual)
- [ ] confirmar y aplicar optimizaciones en `src/pages/Portfolio.tsx` (cursor glow + scroll bar + typewriter)

