import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

const stats = [
  { value: 1000, suffix: '+', label: 'Projects Delivered',    sub: 'Across 30+ countries',        color: '#00D4FF' },
  { value: 98,   suffix: '%', label: 'Customer Satisfaction', sub: 'Based on 500+ reviews',        color: '#7B61FF' },
  { value: 24,   suffix: 'h', label: 'Rapid Prototype',       sub: 'From upload to shipment',      color: '#00D4FF' },
  { value: 50,   suffix: '+', label: 'Materials Supported',   sub: 'FDM, SLA, SLS and more',       color: '#7B61FF' },
]

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame
    let start = null
    const duration = 2000
    const target = stat.value

    const tick = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setCount(target)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative group text-center p-10 rounded-2xl glass border border-white/[0.06] overflow-hidden"
    >
      {/* Gradient bg glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
      />

      {/* Counter */}
      <div className="relative z-10">
        <div
          className="text-6xl md:text-7xl font-bold font-sora mb-2"
          style={{ color: stat.color, textShadow: `0 0 40px ${stat.color}60` }}
        >
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-lg font-semibold font-sora text-[#F5F5F5] mb-1">
          {stat.label}
        </div>
        <div className="text-sm text-[#F5F5F5]/40 font-inter">
          {stat.sub}
        </div>
      </div>
    </motion.div>
  )
}

export default function StatisticsSection() {
  return (
    <section id="statistics" className="section-padding bg-[#0d0d0d] relative overflow-hidden">
      {/* Grid line pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="By the Numbers"
          title={<>Proven <span className="gradient-text">Excellence</span></>}
          subtitle="Numbers that reflect our commitment to quality, speed, and innovation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
