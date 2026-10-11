import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section id="cta" className="relative py-40 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg" />

      {/* Layered radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(0,212,255,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_30%_70%,rgba(123,97,255,0.08)_0%,transparent_60%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#00D4FF]/05 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-[#7B61FF]/05 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00D4FF]/20 text-xs font-semibold font-inter text-[#00D4FF] tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          Ready to Build?
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sora text-[#F5F5F5] leading-tight mb-6"
        >
          Ready to Build Your{' '}
          <span className="gradient-text">Next Innovation?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[#F5F5F5]/60 font-inter mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Upload your design today and receive an instant quote. From prototype to production — we make it seamless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button id="cta-request-quote" href="#contact" className="text-lg px-10 py-5 animate-glow-pulse">
            Request Instant Quote <HiArrowRight />
          </Button>
          <Button id="cta-learn-more" variant="ghost" href="#services" className="text-base">
            Learn About Our Process
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-14 text-sm text-[#F5F5F5]/30 font-inter"
        >
          {['No commitment required', 'Quote in under 60 seconds', 'Worldwide shipping', 'ISO 9001 certified'].map(item => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="text-[#00D4FF]/60">✓</span> {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
