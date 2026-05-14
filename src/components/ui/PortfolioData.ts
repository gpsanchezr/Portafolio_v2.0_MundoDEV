export type ProjectCard = {
  id: string
  title: string
  subtitle: string
  description: string
  github: string
  deploy: string | null
}

export const PROJECTS: ProjectCard[] = [
  {
    id: 'happy-farm',
    title: 'Del Campo a Tu Mesa (Happy-Farm)',
    subtitle: 'Plataforma e-commerce para Barranquilla',
    description: 'Carrito con persistencia local y pedidos automatizados vía WhatsApp Business.',
    github: 'https://github.com/gpsanchezr/HAPPY-FARM.git',
    deploy:
      'https://del-campo-a-tu-mesa-1v4j73q0e-gpsanchezrs-projects.vercel.app/',
  },
  {
    id: 'parknidus',
    title: 'ParkNidus (Sistema de Control de Parqueadero)',
    subtitle: 'Diseño Neon Pulse',
    description: 'Gestión eficiente de cupos en tiempo real. Tarifas por tipo de vehículo y asignación automática (30 autos, 15 motos).',
    github: 'https://github.com/gpsanchezr/ParkNidus',
    deploy: 'https://park-nidus-lm89f36ur-gpsanchezrs-projects.vercel.app/',
  },
  {
    id: 'terrasoft',
    title: 'Terrasoft - Inmobiliaria MonteVerde',
    subtitle: 'Gestión inmobiliaria',
    description: 'Gestión inmobiliaria, pagos y PQRS.',
    github: 'https://github.com/gpsanchezr/Terrasoft-Inmobiliaria.git',
    deploy:
      'https://terrasoft-inmobiliaria-git-main-gpsanchezrs-projects.vercel.app/',
  },
  {
    id: 'cine-verse',
    title: 'Cine-Verse',
    subtitle: 'Gestión integral de sala de cine',
    description: 'Gestión integral de sala de cine para 150 personas. Fase de ajustes finales. Integrando CineBot y asientos VIP.',
    github: 'https://github.com/gpsanchezr/Cine-Verse.git',
    deploy: 'https://cine-verse-git-main-gpsanchezrs-projects.vercel.app/',
  },
]
