import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

// Generate portfolio items with gradient placeholders (no external images needed)
const portfolioItems = [
  { id: 1, name: 'Turbine Blade',         material: 'Carbon Fiber',   printer: 'SLS Pro',    time: '4h 20m', h: 'tall',   grad: 'from-[#00D4FF]/30 to-[#7B61FF]/10',  icon: '⚙️' },
  { id: 2, name: 'Architectural Model',   material: 'Resin',          printer: 'SLA 300',    time: '6h 10m', h: 'short',  grad: 'from-[#7B61FF]/30 to-[#00D4FF]/10',  icon: '🏛️' },
  { id: 3, name: 'Medical Skull',         material: 'PLA+',           printer: 'FDM Pro',    time: '8h 45m', h: 'medium', grad: 'from-[#00D4FF]/20 to-transparent',    icon: '🧠' },
  { id: 4, name: 'Drone Frame',           material: 'Nylon PA12',     printer: 'SLS 400',    time: '3h 05m', h: 'short',  grad: 'from-[#7B61FF]/20 to-transparent',    icon: '🚁' },
  { id: 5, name: 'Custom Chess Set',      material: 'Resin HD',       printer: 'LCD MAX',    time: '7h 30m', h: 'tall',   grad: 'from-[#00D4FF]/25 to-[#7B61FF]/15',  icon: '♟️' },
  { id: 6, name: 'Robot Gripper',         material: 'PETG',           printer: 'FDM Evo',    time: '2h 15m', h: 'medium', grad: 'from-[#7B61FF]/25 to-[#00D4FF]/10',  icon: '🤖' },
  { id: 7, name: 'Engine Component',      material: 'ABS-CF',         printer: 'FDM X',      time: '5h 50m', h: 'short',  grad: 'from-[#00D4FF]/20 to-transparent',    icon: '🔩' },
  { id: 8, name: 'Helmet Prototype',      material: 'SLS Nylon',      printer: 'SLS 600',    time: '9h 20m', h: 'tall',   grad: 'from-[#7B61FF]/30 to-[#00D4FF]/15',  icon: '⛑️' },
  { id: 9, name: 'Micro Gear Assembly',   material: 'Tough Resin',    printer: 'SLA 100',    time: '1h 40m', h: 'medium', grad: 'from-[#00D4FF]/25 to-transparent',    icon: '⚙️' },
]

const heights = {
  short:  'h-48',
  medium: 'h-64',
  tall:   'h-80',
}

function PortfolioCard({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`masonry-item portfolio-item relative rounded-2xl overflow-hidden cursor-pointer ${heights[item.h] || 'h-64'} border border-white/[0.05]`}
    >
      {/* Gradient background stand-in for image */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.grad} bg-[#1a1a1a]`} />
      <div className="absolute inset-0 bg-[#1a1a1a]/70" />

      {/* Large emoji icon as visual center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: hovered ? 0.8 : 1, opacity: hovered ? 0.3 : 0.6 }}
          transition={{ duration: 0.4 }}
          className="text-7xl select-none"
        >
          {item.icon}
        </motion.span>
      </div>

      {/* Overlay */}
      <div className="portfolio-overlay" />

      {/* Hover content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-end p-5"
          >
            <h3 className="text-base font-bold font-sora text-[#F5F5F5] mb-2">{item.name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[10px] font-inter px-2 py-0.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/20">
                {item.material}
              </span>
              <span className="text-[10px] font-inter px-2 py-0.5 rounded-full bg-[#7B61FF]/20 text-[#7B61FF] border border-[#7B61FF]/20">
                {item.printer}
              </span>
              <span className="text-[10px] font-inter px-2 py-0.5 rounded-full bg-white/10 text-[#F5F5F5]/70">
                ⏱ {item.time}
              </span>
            </div>
            <button className="text-xs font-semibold font-inter text-[#00D4FF] hover:text-[#F5F5F5] transition-colors flex items-center gap-1">
              View Details →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="section-padding bg-[#111111] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Our Work"
          title={<><span className="gradient-text">Portfolio</span> & Projects</>}
          subtitle="A selection of precision parts, models, and prototypes we've delivered for clients worldwide."
        />

        <div className="masonry-grid">
          {portfolioItems.map((item, i) => (
            <PortfolioCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button id="portfolio-view-all" variant="outline" href="#contact">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
