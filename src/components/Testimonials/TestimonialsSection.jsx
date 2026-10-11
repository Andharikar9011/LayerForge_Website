import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import SectionTitle from '../ui/SectionTitle'

const testimonials = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Lead Engineer',
    company: 'AutoDrive Systems',
    initials: 'AM',
    stars: 5,
    color: '#00D4FF',
    text: "LayerForge delivered our turbine prototype in under 24 hours. The carbon fiber finish and dimensional accuracy were extraordinary. We've made them our exclusive 3D printing partner.",
  },
  {
    id: 2,
    name: 'Dr. Sarah Chen',
    role: 'Surgical Director',
    company: 'MedTech Innovations',
    initials: 'SC',
    stars: 5,
    color: '#7B61FF',
    text: 'The patient-specific anatomical models we receive from LayerForge have transformed our pre-surgical planning. Detail is flawless at every layer. Truly exceptional quality.',
  },
  {
    id: 3,
    name: 'Marcus Richter',
    role: 'Design Principal',
    company: 'Orbital Architects',
    initials: 'MR',
    stars: 5,
    color: '#00D4FF',
    text: "We've printed over 40 architectural scale models through LayerForge. Each one is a conversation piece. The resin models in particular have a glass-like quality that impresses every client.",
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    company: 'RoboEdge Labs',
    initials: 'PS',
    stars: 5,
    color: '#7B61FF',
    text: "As a robotics startup, speed and cost matter. LayerForge's rapid prototyping cut our development cycle by 60%. Their engineering team is as good as the machines they run.",
  },
  {
    id: 5,
    name: 'James O\'Brien',
    role: 'Product Manager',
    company: 'Nova Consumer Goods',
    initials: 'JO',
    stars: 5,
    color: '#00D4FF',
    text: 'From concept to consumer-ready prototype in 3 days. LayerForge made the impossible routine. Their online quoting system is the fastest in the industry — we love working with them.',
  },
]

function Stars({ count = 5, color = '#00D4FF' }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <HiStar key={i} style={{ color }} size={16} />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((dir) => {
    setDirection(dir)
    setActive(prev => (prev + dir + testimonials.length) % testimonials.length)
  }, [])

  /* Auto-slide every 5s */
  useEffect(() => {
    const id = setInterval(() => go(1), 5000)
    return () => clearInterval(id)
  }, [go])

  const t = testimonials[active]

  const variants = {
    enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  }

  return (
    <section id="testimonials" className="section-padding bg-[#181818] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Client Stories"
          title={<>What Our <span className="gradient-text">Clients Say</span></>}
          subtitle="Trusted by engineers, doctors, architects, and innovators worldwide."
        />

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative h-72 sm:h-64 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 glass-strong rounded-2xl p-8 flex flex-col justify-between"
                style={{ borderColor: `${t.color}20` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold font-sora flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.color}30, ${t.color}10)`, border: `2px solid ${t.color}40`, color: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold font-sora text-[#F5F5F5]">{t.name}</div>
                      <div className="text-sm text-[#F5F5F5]/50 font-inter">{t.role} · {t.company}</div>
                    </div>
                  </div>
                  <Stars count={t.stars} color={t.color} />
                </div>

                {/* Quote */}
                <p className="text-[#F5F5F5]/80 font-inter leading-relaxed text-sm sm:text-base italic">
                  "{t.text}"
                </p>

                {/* Accent line */}
                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${t.color}40, transparent)` }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === active ? '#00D4FF' : 'rgba(245,245,245,0.2)',
                    width: i === active ? '24px' : '8px',
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F5]/60 hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-200"
              >
                <HiChevronLeft size={20} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F5]/60 hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-200"
              >
                <HiChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Secondary cards (peek preview) */}
          <div className="grid grid-cols-2 gap-4 mt-8 opacity-40">
            {[
              testimonials[(active + 1) % testimonials.length],
              testimonials[(active + 2) % testimonials.length],
            ].map((t2, i) => (
              <div key={t2.id} className="glass rounded-xl p-4 border border-white/[0.04]">
                <Stars count={5} color={t2.color} />
                <p className="text-xs text-[#F5F5F5]/60 font-inter mt-2 line-clamp-2">"{t2.text}"</p>
                <div className="text-xs font-sora text-[#F5F5F5]/40 mt-2">{t2.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
