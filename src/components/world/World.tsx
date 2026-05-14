import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useWorldStore } from '../../stores/worldStore'

const SUPABASE_BASE_URL =
  'https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg'


function getModelUrl(filePath: string) {
  const base = SUPABASE_BASE_URL.replace(/\/$/, '')
  return `${base}/${filePath.replace(/^\//, '')}`
}


function Ground() {
  return (
    <RigidBody type="fixed" friction={1} restitution={0}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color={'#c6a36b'} />
      </mesh>
      <CuboidCollider args={[110, 0.5, 110]} position={[0, 0, 0]} />
    </RigidBody>
  )
}

function TownColliders() {
  return (
    <group>
      <CuboidCollider args={[18, 2, 12]} position={[0, 1, -30]} />
      <CuboidCollider args={[10, 2, 10]} position={[-12, 1, -30]} />
      <CuboidCollider args={[10, 2, 10]} position={[12, 1, -30]} />

      <CuboidCollider args={[7, 2, 7]} position={[20, 1, 0]} />
      <CuboidCollider args={[3, 1.5, 4]} position={[17, 0.9, 2]} />
      <CuboidCollider args={[3, 1.5, 4]} position={[23, 0.9, -2]} />
    </group>
  )
}

function IsometricCameraFollow({ avatarGroupRef }: { avatarGroupRef: React.RefObject<THREE.Group> }) {
  const { camera } = useThree()
  const isoOffset = useMemo(() => new THREE.Vector3(15, 15, 15), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const desiredCamPos = useMemo(() => new THREE.Vector3(), [])
  const currentAt = useMemo(() => new THREE.Vector3(), [])
  const nextAt = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const obj = avatarGroupRef.current
    if (!obj) return

    target.set(obj.position.x, obj.position.y + 1.1, obj.position.z)
    desiredCamPos.copy(target).add(isoOffset)

    camera.position.lerp(desiredCamPos, 0.08)

    // lookAt suave
    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    currentAt.copy(camera.position).add(dir)
    nextAt.copy(currentAt).lerp(target, 0.08)
    camera.lookAt(nextAt)
  })

  return null
}

type KeyboardKeys = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  run: boolean
  interact: boolean
}

function Avatar({ avatarGroupRef }: { avatarGroupRef: React.RefObject<THREE.Group> }) {
  const bodyRef = useRef<any>(null)
  const [, getState] = useKeyboardControls<keyof KeyboardKeys & string>()

  const avatarPrimaryUrl = getModelUrl('models/characters/Avatar/Gise.glb')
  const avatarFallbackUrl = getModelUrl('models/characters/Avatar/ChicaVestidoRojo.glb')

  let avatarUrl = avatarFallbackUrl
  try {
    avatarUrl = avatarPrimaryUrl
    // If the model does not exist, drei will throw in Suspense/error boundary.
    // We keep fallback url variables for next attempts.
    // (At runtime, suspense will cover loading.)
  } catch {
    avatarUrl = avatarFallbackUrl
  }

  const { scene } = useGLTF(avatarUrl, true) as any


  useFrame((state, delta) => {
    const body = bodyRef.current
    if (!body) return

    const keysState = getState() as unknown as KeyboardKeys


    const forward = new THREE.Vector3()
    state.camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3()
      .crossVectors(forward, new THREE.Vector3(0, 1, 0))
      .normalize()
      .multiplyScalar(-1)

    const move = new THREE.Vector3()
    if (keysState.forward) move.add(forward)
    if (keysState.backward) move.add(forward.clone().multiplyScalar(-1))
    if (keysState.left) move.add(right)
    if (keysState.right) move.add(right.clone().multiplyScalar(-1))

    if (move.lengthSq() > 0.0001) move.normalize()

    const speed = keysState.run ? 12 : 7
    const impulse = move.multiplyScalar(speed * 8)

    if (impulse.lengthSq() > 0) {
      body.applyImpulse({ x: impulse.x * delta, y: 0, z: impulse.z * delta }, true)
    }

    const linvel = body.linvel()
    const damp = move.lengthSq() > 0.0001 ? 0.92 : 0.85
    body.setLinvel({ x: linvel.x * damp, y: linvel.y, z: linvel.z * damp }, true)

    const p = body.translation()
    if (avatarGroupRef.current) avatarGroupRef.current.position.set(p.x, p.y, p.z)
  })

  return (
    <>
      <RigidBody ref={bodyRef} position={[0, 0.9, 10]} type="dynamic" lockRotations friction={1} restitution={0}>
        <primitive object={scene} scale={0.9} />
        {/* colision simple: cuboide aproximado */}
        <CuboidCollider args={[0.35, 0.9, 0.35]} position={[0, 0.45, 0]} />
      </RigidBody>

      <group ref={avatarGroupRef} position={[0, 0.9, 10]} />
    </>
  )
}

function ProjectTriggers() {
  const setActiveProject = useWorldStore((s) => s.setActiveProject)

  return (
    <>
      <CuboidCollider
        sensor
        args={[6, 3, 2]}
        position={[-22, 1.5, -30]}
        onIntersectionEnter={() => setActiveProject('happy-farm')}
        onIntersectionExit={() => setActiveProject(null)}
      />
      <CuboidCollider
        sensor
        args={[6, 3, 2]}
        position={[0, 1.5, -24]}
        onIntersectionEnter={() => setActiveProject('parknidus')}
        onIntersectionExit={() => setActiveProject(null)}
      />
      <CuboidCollider
        sensor
        args={[6, 3, 2]}
        position={[22, 1.5, -10]}
        onIntersectionEnter={() => setActiveProject('terrasoft')}
        onIntersectionExit={() => setActiveProject(null)}
      />
      <CuboidCollider
        sensor
        args={[6, 3, 2]}
        position={[15, 1.5, 10]}
        onIntersectionEnter={() => setActiveProject('cine-verse')}
        onIntersectionExit={() => setActiveProject(null)}
      />
      <CuboidCollider
        sensor
        args={[6, 3, 2]}
        position={[25, 1.5, -2]}
        onIntersectionEnter={() => setActiveProject('contador-personas')}
        onIntersectionExit={() => setActiveProject(null)}
      />
    </>
  )
}


function AssetsAndZones() {
  const cityUrl = getModelUrl('models/buildings/scene-v1.glb')

  const oficinaUrl = getModelUrl('models/characters/NPC/oficina.glb')

  const city = useGLTF(cityUrl, true) as any
  const oficina = useGLTF(oficinaUrl, true) as any

  const birchUrl = getModelUrl('models/props/Nature/BirchTree_1.gltf')
  const bushUrl = getModelUrl('models/props/Nature/Bush_Flowers.gltf')

  const birch = useGLTF(birchUrl, true) as any
  const bush = useGLTF(bushUrl, true) as any

  return (
    <group>
      <group position={[0, 0, -30]}>
        <primitive object={city.scene} />
      </group>

      <primitive
        object={oficina.scene}
        position={[20, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Nature */}
      <group>
        <FallingSakura />
        <primitive object={birch.scene} position={[-8, 0, -22]} />
        <primitive object={birch.scene} position={[-14, 0, -18]} />
        <primitive object={birch.scene} position={[2, 0, -20]} />
        <primitive object={bush.scene} position={[-10, 0, -10]} />
        <primitive object={bush.scene} position={[0, 0, -12]} />
        <primitive object={bush.scene} position={[10, 0, -8]} />
      </group>

      <TownColliders />
      <ProjectTriggers />

      <audio
        src="/audio/background.mp3"
        loop
        preload="auto"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
      />
    </group>
  )
}

function FallingSakura({ count = 250 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])


  const geometry = useMemo(() => {
    // geometry base para las instancias (una “hoja” delgada)
    const g = new THREE.PlaneGeometry(0.18, 0.32, 1, 1)
    return g
  }, [])

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffb7d5'),
      transparent: true,
      opacity: 0.9,
      roughness: 0.9,
      metalness: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    return m
  }, [])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const time = performance.now() * 0.001
    for (let i = 0; i < count; i++) {
      // seeded-ish motion
      const t = i / count
      const baseX = -28 + t * 56
      const x = baseX + Math.sin(time * 0.8 + i) * 0.8

      // “caída” con loop
      const y = 10 - ((time * 2.2 + i * 0.17) % 20)

      // ligera deriva en z
      const z = -28 + ((i * 17) % 56)
      const angle = (time * 1.8 + i) % (Math.PI * 2)

      dummy.position.set(x, y, z)
      dummy.rotation.set(0, 0, angle)
      dummy.scale.setScalar(0.9 + (i % 7) * 0.03)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      position={[0, 0, 0]}
      frustumCulled={false}
    />
  )
}

export default function World() {

  const avatarGroupRef = useRef<THREE.Group>(null!)

  return (
    <group>
      <Ground />
      <AssetsAndZones />

      {/* Avatar playable */}
      <Avatar avatarGroupRef={avatarGroupRef} />

      {/* Isometric camera follow */}
      <IsometricCameraFollow avatarGroupRef={avatarGroupRef} />

      {/* Physics wrapper is in src/pages/World3D.tsx */}
    </group>
  )
}



