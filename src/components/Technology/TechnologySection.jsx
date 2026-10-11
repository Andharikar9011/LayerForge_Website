import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

const technologies = [
  { name: 'FDM',          full: 'Fused Deposition Modeling',   color: '#00D4FF', desc: 'Most versatile. PLA, ABS, PETG' },
  { name: 'SLA',          full: 'Stereolithography',           color: '#7B61FF', desc: 'Ultra-high resolution resin' },
  { name: 'SLS',          full: 'Selective Laser Sintering',   color: '#00D4FF', desc: 'Functional nylon parts' },
  { name: 'Resin',        full: 'MSLA / LCD Resin',            color: '#7B61FF', desc: 'Jewelry, dental, miniatures' },
  { name: 'Carbon Fiber', full: 'Continuous Fiber Fab',        color: '#00D4FF', desc: 'Aerospace-grade strength' },
  { name: 'PETG',         full: 'Polyethylene Terephthalate G',color: '#7B61FF', desc: 'Chemical-resistant, durable' },
  { name: 'ABS',          full: 'Acrylonitrile Butadiene Sty.',color: '#00D4FF', desc: 'Tough, heat-resistant parts' },
  { name: 'PLA',          full: 'Polylactic Acid',             color: '#7B61FF', desc: 'Eco-friendly, high detail' },
  { name: 'Nylon',        full: 'Polyamide 12 / 11',           color: '#00D4FF', desc: 'Flexible, wear-resistant' },
]

function HexTile({ tech, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 120 }}
      className="flex items-center justify-center"
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          y: hovered ? -8 : 0,
          boxShadow: hovered
            ? `0 20px 60px ${tech.color}40, 0 0 0 2px ${tech.color}60`
            : `0 0 0 1px ${tech.color}20`,
        }}
        transition={{ duration: 0.3 }}
        className="hexagon w-36 h-40 flex flex-col items-center justify-center cursor-default relative"
        style={{ background: `linear-gradient(135deg, ${tech.color}12, ${tech.color}04)` }}
      >
        {/* Inner hex */}
        <div className="text-center px-3">
          <div
            className="text-lg font-bold font-sora mb-1"
            style={{ color: tech.color }}
          >
            {tech.name}
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] text-[#F5F5F5]/60 font-inter leading-tight text-center"
          >
            {tech.desc}
          </motion.div>
        </div>

        {/* Pulsing glow on hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 hexagon"
            style={{ background: `radial-gradient(circle, ${tech.color}30, transparent)` }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function TechnologySection() {
  return (
    <section id="technology" className="section-padding bg-[#181818] relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,212,255,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Supported Technologies"
          title={<>Print with the <span className="gradient-text">Best</span></>}
          subtitle="Nine advanced printing technologies under one roof, serving any geometry, material, or application."
        />

        {/* Hexagonal grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, i) => (
            <HexTile key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Bottom feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-14"
        >
          {['ISO 9001 Certified', 'Layer Resolution: 25μm', '50+ Materials', 'Same-Day Quoting'].map(badge => (
            <span
              key={badge}
              className="glass px-4 py-2 rounded-full text-xs font-semibold font-inter text-[#F5F5F5]/70 border border-[#00D4FF]/20"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
