import React from 'react'
import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, subtitle, centered = true, className = '' }) {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-16 ${className}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#00D4FF] mb-4 font-inter"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-sora text-[#F5F5F5] leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-lg text-[#F5F5F5]/60 max-w-2xl mx-auto font-inter leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
