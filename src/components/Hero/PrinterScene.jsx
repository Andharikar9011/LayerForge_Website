import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useMouseParallax } from '../../hooks/useMouseParallax'

/* ── Floating Particle System ─────────────────────────────── */
function Particles({ count = 200 }) {
  const mesh = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      // Cyan/purple accent mix
      const t = Math.random()
      colors[i * 3]     = t > 0.5 ? 0 : 0.48
      colors[i * 3 + 1] = t > 0.5 ? 0.83 : 0.38
      colors[i * 3 + 2] = t > 0.5 ? 1.0 : 1.0
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    mesh.current.rotation.x = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ── Layer-by-Layer Print Animation ───────────────────────── */
function PrintedObject({ printProgress }) {
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += 0.005
  })

  const maxHeight = 1.5
  const currentHeight = maxHeight * printProgress

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      {/* Printed layers */}
      <mesh position={[0, currentHeight / 2 - maxHeight / 2, 0]}>
        <boxGeometry args={[0.7, currentHeight, 0.7]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Nozzle glow at top of print */}
      <pointLight
        position={[0, currentHeight - maxHeight / 2, 0]}
        color="#00D4FF"
        intensity={2}
        distance={3}
      />

      {/* Ghost outline of full object */}
      <mesh>
        <boxGeometry args={[0.7, maxHeight, 0.7]} />
        <meshStandardMaterial
          color="#00D4FF"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>
    </group>
  )
}

/* ── 3D Printer Body ──────────────────────────────────────── */
function PrinterBody({ printProgress }) {
  const nozzleRef = useRef()
  const nozzleY = useRef(-0.5 + 1.5 * printProgress)

  useFrame((state) => {
    if (!nozzleRef.current) return
    // Nozzle bobs gently
    nozzleRef.current.position.y = nozzleY.current + Math.sin(state.clock.elapsedTime * 8) * 0.01
    nozzleRef.current.position.x = Math.sin(state.clock.elapsedTime * 3) * 0.08
  })

  const metalMat = {
    metalness: 0.95,
    roughness: 0.15,
    color: '#303030',
  }

  return (
    <group>
      {/* Printer base */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Build plate */}
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[2.4, 0.08, 2.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3}
          emissive="#00D4FF" emissiveIntensity={0.04} />
      </mesh>

      {/* Left vertical column */}
      <mesh position={[-1.4, 0, -1.4]}>
        <boxGeometry args={[0.12, 4, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Right vertical column */}
      <mesh position={[1.4, 0, -1.4]}>
        <boxGeometry args={[0.12, 4, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Left front column */}
      <mesh position={[-1.4, 0, 1.4]}>
        <boxGeometry args={[0.12, 4, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Right front column */}
      <mesh position={[1.4, 0, 1.4]}>
        <boxGeometry args={[0.12, 4, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Top bar */}
      <mesh position={[0, 1.9, -1.4]}>
        <boxGeometry args={[3, 0.12, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Front top bar */}
      <mesh position={[0, 1.9, 1.4]}>
        <boxGeometry args={[3, 0.12, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Side bars top */}
      <mesh position={[-1.4, 1.9, 0]}>
        <boxGeometry args={[0.12, 0.12, 3]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[1.4, 1.9, 0]}>
        <boxGeometry args={[0.12, 0.12, 3]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Horizontal gantry rail */}
      <mesh position={[0, 0.4 + printProgress * 1.2, -0.3]}>
        <boxGeometry args={[2.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Print head / nozzle carriage */}
      <group ref={nozzleRef} position={[0, 0.4 + printProgress * 1.2, -0.2]}>
        <mesh>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Nozzle tip */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.05, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1} metalness={1} roughness={0} />
        </mesh>
        {/* Nozzle glow */}
        <pointLight color="#00D4FF" intensity={3} distance={1.5} />
      </group>

      {/* Print platform */}
      <PrintedObject printProgress={printProgress} />

      {/* Filament spool */}
      <group position={[1.8, 0.2, -0.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.4, 0.12, 12, 32]} />
          <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={0.2} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Bottom LED strip glow */}
      <pointLight position={[0, -1.5, 0]} color="#00D4FF" intensity={1} distance={4} />
      <pointLight position={[-1.4, 0, 0]} color="#7B61FF" intensity={0.5} distance={3} />
      <pointLight position={[1.4, 0, 0]} color="#00D4FF" intensity={0.5} distance={3} />
    </group>
  )
}

/* ── Printer group with rotation ──────────────────────────── */
function Printer({ printProgress }) {
  const groupRef = useRef()
  const mouse = useMouseParallax()

  useFrame((state) => {
    if (!groupRef.current) return
    // Gentle auto-rotate
    groupRef.current.rotation.y += 0.003
    // Mouse parallax influence
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.12,
      0.05
    )
  })

  return (
    <group ref={groupRef} scale={0.85}>
      <PrinterBody printProgress={printProgress} />
    </group>
  )
}

/* ── Camera controller ────────────────────────────────────── */
function CameraController({ scrollY }) {
  useFrame(({ camera }) => {
    if (!scrollY || !scrollY.current) return
    const zoom = Math.max(0, scrollY.current / window.innerHeight)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 - zoom * 3, 0.05)
  })
  return null
}


/* ── Main Scene ───────────────────────────────────────────── */
export default function PrinterScene({ printProgress = 0.6, scrollY }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 8], fov: 50 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      dpr={[1, 2]}
    >
      {/* Environment */}
      <Environment preset="studio" />

      {/* Ambient */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#7B61FF" />

      {/* Scene content */}
      <Printer printProgress={printProgress} />
      <Particles count={300} />
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />

      {/* Camera zoom on scroll */}
      <CameraController scrollY={scrollY} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
      </EffectComposer>
    </Canvas>
  )
}
