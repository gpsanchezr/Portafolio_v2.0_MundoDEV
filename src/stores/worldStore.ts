import { create } from 'zustand'

type WorldStore = {
  isLoaded: boolean
  introComplete: boolean
  isMobile: boolean
  activeProject: string | null
}

type WorldActions = {
  setLoaded: (v: boolean) => void
  setIntroComplete: (v: boolean) => void
  setActiveProject: (id: string | null) => void
}

type WorldState = WorldStore & WorldActions


function detectMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(max-width: 768px)')?.matches ?? false
}

export const useWorldStore = create<WorldState>((set) => ({
  isLoaded: false,
  introComplete: false,
  isMobile: detectMobile(),
  activeProject: null,

  setLoaded: (v) => set({ isLoaded: v }),
  setIntroComplete: (v) => set({ introComplete: v }),
  setActiveProject: (id) => set({ activeProject: id }),
}))



