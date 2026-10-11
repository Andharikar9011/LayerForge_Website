import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import SectionTitle from '../ui/SectionTitle'

/* ── Individual interactive 3D objects ────────────────────── */
function InteractiveObject({ shape, position, color, label, onClick, isSelected, material }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += hovered ? 0.02 : 0.005
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.15
    const targetScale = hovered ? 1.2 : (isSelected ? 1.3 : 1)
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08)
    )
  })

  const getMaterial = () => {
    switch(material) {
      case 'wireframe':
        return <meshBasicMaterial color={color} wireframe />
      case 'emissive':
        return <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      default:
        return <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    }
  }

  const getGeometry = () => {
    switch(shape) {
      case 'gear':
        return <torusGeometry args={[0.6, 0.25, 8, 16]} />
      case 'rocket':
        return <coneGeometry args={[0.4, 1.2, 8]} />
      case 'drone':
        return <octahedronGeometry args={[0.7]} />
      case 'arm':
        return <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
      case 'helmet':
        return <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
      case 'chess':
        return <cylinderGeometry args={[0.15, 0.4, 1, 12]} />
      case 'engine':
        return <torusKnotGeometry args={[0.4, 0.15, 64, 8]} />
      default:
        return <boxGeometry args={[0.8, 0.8, 0.8]} />
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto' }}
          castShadow
        >
          {getGeometry()}
          {getMaterial()}
        </mesh>

        {/* Glow ring when selected */}
        {isSelected && (
          <mesh>
            <torusGeometry args={[0.9, 0.02, 8, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        )}
      </group>
    </Float>
  )
}

/* ── Scene with all objects ───────────────────────────────── */
function InteractiveObjects({ selected, onSelect, material }) {
  const objects = [
    { shape: 'gear',   position: [-5, 0.5, 0],   color: '#00D4FF', label: 'Gear' },
    { shape: 'rocket', position: [-2.5, 0, 0],   color: '#7B61FF', label: 'Rocket' },
    { shape: 'drone',  position: [0, 0.3, 0],    color: '#00D4FF', label: 'Drone' },
    { shape: 'arm',    position: [2.5, 0, 0],    color: '#7B61FF', label: 'Robot Arm' },
    { shape: 'helmet', position: [5, 0.2, 0],    color: '#00D4FF', label: 'Helmet' },
    { shape: 'chess',  position: [-3.5, 0, -2],  color: '#7B61FF', label: 'Chess Piece' },
    { shape: 'engine', position: [3.5, 0.2, -2], color: '#00D4FF', label: 'Engine Part' },
  ]

  return (
    <>
      {objects.map((obj) => (
        <InteractiveObject
          key={obj.shape}
          {...obj}
          isSelected={selected === obj.shape}
          onClick={() => onSelect(selected === obj.shape ? null : obj.shape)}
          material={material}
        />
      ))}
    </>
  )
}

export default function InteractiveScene() {
  const [selected, setSelected] = useState(null)
  const [material, setMaterial] = useState('default')

  const materialOptions = [
    { id: 'default',   label: 'Metallic' },
    { id: 'wireframe', label: 'Wireframe' },
    { id: 'emissive',  label: 'Neon' },
  ]

  return (
    <section id="interactive" className="section-padding bg-[#0d0d0d] relative overflow-hidden">
      {/* Radial glow bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(0,212,255,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Explore"
          title={<>Interactive <span className="gradient-text">3D Studio</span></>}
          subtitle="Click any object to select it. Use your mouse to orbit. Change materials below."
        />

        {/* Material controls */}
        <div className="flex justify-center gap-3 mb-8">
          {materialOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setMaterial(opt.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-inter transition-all duration-300
                ${material === opt.id
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-[#111111]'
                  : 'border border-white/10 text-[#F5F5F5]/60 hover:border-[#00D4FF]/50 hover:text-[#00D4FF]'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4 text-sm text-[#00D4FF] font-inter"
          >
            Selected: <span className="font-bold capitalize">{selected}</span> — drag to rotate, scroll to zoom
          </motion.div>
        )}

        {/* 3D Canvas */}
        <div className="h-[500px] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111111]/50">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#00D4FF]/30 border-t-[#00D4FF] rounded-full animate-spin" />
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 2, 10], fov: 60 }}
              gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
              dpr={[1, 2]}
            >
              <Environment preset="studio" />
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} />
              <pointLight position={[0, 5, 0]} color="#00D4FF" intensity={1} />

              <InteractiveObjects
                selected={selected}
                onSelect={setSelected}
                material={material}
              />

              <OrbitControls
                enableZoom
                enablePan={false}
                minDistance={5}
                maxDistance={20}
                autoRotate={!selected}
                autoRotateSpeed={0.5}
              />

              <EffectComposer>
                <Bloom intensity={0.6} luminanceThreshold={0.5} luminanceSmoothing={0.9} />
              </EffectComposer>
            </Canvas>
          </Suspense>
        </div>

        {/* Hint labels */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {['Gear', 'Rocket', 'Drone', 'Robot Arm', 'Helmet', 'Chess Piece', 'Engine Part'].map(label => (
            <span key={label} className="text-xs text-[#F5F5F5]/30 font-inter border border-white/[0.05] px-3 py-1 rounded-full">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
