import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiUpload, HiDocumentText, HiCog, HiCheckCircle, HiTruck } from 'react-icons/hi'
import SectionTitle from '../ui/SectionTitle'

const steps = [
  {
    num: '01',
    icon: HiUpload,
    title: 'Upload CAD',
    desc: 'Submit your 3D design files in any standard format: STL, OBJ, STEP, or SolidWorks.',
    color: '#00D4FF',
  },
  {
    num: '02',
    icon: HiDocumentText,
    title: 'Quotation',
    desc: 'Receive an instant automated quote with material options, timelines, and pricing.',
    color: '#7B61FF',
  },
  {
    num: '03',
    icon: HiCog,
    title: 'Printing',
    desc: 'Our precision machines start printing your design using the chosen technology and material.',
    color: '#00D4FF',
  },
  {
    num: '04',
    icon: HiCheckCircle,
    title: 'Quality Check',
    desc: 'Every part is measured and inspected against your specifications before shipping.',
    color: '#7B61FF',
  },
  {
    num: '05',
    icon: HiTruck,
    title: 'Delivery',
    desc: 'Securely packaged and shipped worldwide. Track your order in real time.',
    color: '#00D4FF',
  },
]

function StepCard({ step, index }) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center min-w-[220px] max-w-[240px] flex-shrink-0"
    >
      {/* Number */}
      <div className="text-7xl font-bold font-sora absolute -top-6 left-1/2 -translate-x-1/2 opacity-[0.06] text-[#F5F5F5] select-none pointer-events-none">
        {step.num}
      </div>

      {/* Icon circle */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 z-10"
        style={{
          background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
          border: `2px solid ${step.color}40`,
          boxShadow: `0 0 30px ${step.color}20`,
        }}
      >
        <Icon style={{ color: step.color }} size={32} />

        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          className="absolute inset-0 rounded-2xl"
          style={{ border: `1px solid ${step.color}` }}
        />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-bold font-sora text-[#F5F5F5] mb-3">
        {step.title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-[#F5F5F5]/50 font-inter leading-relaxed px-2">
        {step.desc}
      </p>
    </motion.div>
  )
}

export default function ProcessSection() {
  const containerRef = useRef(null)

  return (
    <section id="process" className="section-padding bg-[#111111] relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="How It Works"
          title={<>Our <span className="gradient-text">Process</span></>}
          subtitle="From upload to delivery in five simple steps. Engineered for speed and precision."
        />

        {/* Desktop: horizontal layout */}
        <div ref={containerRef} className="hidden md:flex items-start justify-between gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-10 right-10 h-px z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#00D4FF]/60 via-[#7B61FF]/60 to-[#00D4FF]/60 origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Mobile: vertical layout */}
        <div className="md:hidden flex flex-col items-center gap-12 relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-[#00D4FF]/60 via-[#7B61FF]/60 to-[#00D4FF]/60" />

          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
