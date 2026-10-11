import React from 'react'
import { motion } from 'framer-motion'
import {
  HiTruck, HiHeart, HiHome, HiAcademicCap,
  HiCog, HiShoppingBag, HiCode, HiGlobe
} from 'react-icons/hi'
import SectionTitle from '../ui/SectionTitle'

const industries = [
  { icon: HiTruck,       label: 'Automotive',        desc: 'Prototypes to production-grade components', color: '#00D4FF' },
  { icon: HiHeart,       label: 'Medical',           desc: 'Surgical models, implants, devices',        color: '#7B61FF' },
  { icon: HiHome,        label: 'Architecture',      desc: 'Scale models with millimeter precision',     color: '#00D4FF' },
  { icon: HiAcademicCap, label: 'Education',         desc: 'Teaching tools, STEM kits, visualizations', color: '#7B61FF' },
  { icon: HiCog,         label: 'Manufacturing',     desc: 'Jigs, fixtures, tooling and assemblies',    color: '#00D4FF' },
  { icon: HiShoppingBag, label: 'Consumer Products', desc: 'Packaging, retail, lifestyle innovations',  color: '#7B61FF' },
  { icon: HiCode,        label: 'Robotics',          desc: 'Actuators, end-effectors, robot frames',    color: '#00D4FF' },
  { icon: HiGlobe,       label: 'Aerospace',         desc: 'Lightweight, high-strength aero parts',     color: '#7B61FF' },
]

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-[#181818] relative overflow-hidden">
      {/* Bg decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7B61FF]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D4FF]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Industries We Serve"
          title={<>Powering <span className="gradient-text">Every Sector</span></>}
          subtitle="From automotive to aerospace, we deliver precision-engineered solutions across industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((ind, i) => {
            const Icon = ind.icon
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="industry-card group p-6 rounded-2xl bg-[#242424] border border-white/[0.04] cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${ind.color}12`,
                    border: `1px solid ${ind.color}25`,
                  }}
                >
                  <Icon style={{ color: ind.color }} size={22} />
                </div>

                {/* Label */}
                <h3 className="text-base font-bold font-sora text-[#F5F5F5] mb-2">
                  {ind.label}
                </h3>

                {/* Desc */}
                <p className="text-sm text-[#F5F5F5]/45 font-inter leading-relaxed">
                  {ind.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${ind.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
