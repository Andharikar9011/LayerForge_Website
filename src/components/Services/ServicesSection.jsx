import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiLightningBolt, HiCog, HiChip, HiViewGrid,
  HiCube, HiTemplate, HiSupport, HiBeaker
} from 'react-icons/hi'
import SectionTitle from '../ui/SectionTitle'

const services = [
  {
    icon: HiLightningBolt,
    title: 'Rapid Prototyping',
    desc: 'From CAD to physical prototype in 24–48 hours. Test ideas faster with production-quality prints.',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-transparent',
  },
  {
    icon: HiCog,
    title: 'Functional Parts',
    desc: 'End-use components engineered to exacting tolerances. Materials chosen for real-world performance.',
    color: '#7B61FF',
    gradient: 'from-[#7B61FF]/20 to-transparent',
  },
  {
    icon: HiChip,
    title: 'Product Design',
    desc: 'Collaborative design-for-print optimization. We refine your geometry for superior outcomes.',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-transparent',
  },
  {
    icon: HiCube,
    title: 'Reverse Engineering',
    desc: 'Scan legacy parts, recreate precise digital models, and manufacture improved replacements.',
    color: '#7B61FF',
    gradient: 'from-[#7B61FF]/20 to-transparent',
  },
  {
    icon: HiTemplate,
    title: 'Architectural Models',
    desc: 'High-detail scale models for architects and urban planners. Stunning visual accuracy.',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-transparent',
  },
  {
    icon: HiBeaker,
    title: 'Medical Models',
    desc: 'Patient-specific anatomical models for surgical planning, education, and diagnostics.',
    color: '#7B61FF',
    gradient: 'from-[#7B61FF]/20 to-transparent',
  },
  {
    icon: HiViewGrid,
    title: 'Industrial Manufacturing',
    desc: 'Scalable production runs using FDM, SLS, and resin. Aerospace-grade tolerances.',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-transparent',
  },
  {
    icon: HiSupport,
    title: 'Custom Orders',
    desc: 'No order too unique. Miniatures, jigs, art installations — if you can design it, we print it.',
    color: '#7B61FF',
    gradient: 'from-[#7B61FF]/20 to-transparent',
  },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -12, y: dx * 12 })
  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      className="tilt-card group relative p-7 rounded-2xl bg-[#181818] border border-white/[0.06] cursor-pointer overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Glowing border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${service.color}40` }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
          style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
        >
          <motion.div
            animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon style={{ color: service.color }} size={26} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold font-sora text-[#F5F5F5] mb-3 group-hover:gradient-text transition-all duration-300">
          {service.title}
        </h3>

        {/* Desc */}
        <p className="text-sm text-[#F5F5F5]/55 font-inter leading-relaxed">
          {service.desc}
        </p>

        {/* Arrow CTA */}
        <div
          className="flex items-center gap-2 mt-5 text-xs font-semibold font-inter tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ color: service.color }}
        >
          Learn more
          <motion.span animate={hovered ? { x: [0, 5, 0] } : {}} transition={{ duration: 0.5 }}>→</motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-[#111111] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D4FF]/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="What We Do"
          title={<>Our <span className="gradient-text">Services</span></>}
          subtitle="End-to-end additive manufacturing solutions designed for engineers, designers, and innovators."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
