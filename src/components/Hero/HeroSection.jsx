import React, { useEffect, useRef, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { HiArrowRight } from 'react-icons/hi'
import { BsPlayCircle } from 'react-icons/bs'
import Button from '../ui/Button'

const PrinterScene = React.lazy(() => import('./PrinterScene'))

export default function HeroSection() {
  const [printProgress, setPrintProgress] = useState(0)
  const scrollY = useRef(0)
  const textRef = useRef(null)

  /* Animate print progress 0→1 */
  useEffect(() => {
    let frame
    let start = null
    const duration = 8000
    const tick = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      setPrintProgress(Math.min(elapsed / duration, 1))
      if (elapsed < duration) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  /* Track scroll for camera zoom */
  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* GSAP text reveal */
  useEffect(() => {
    if (!textRef.current) return
    const tl = gsap.timeline({ delay: 0.8 })
    tl.fromTo('.hero-eyebrow',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-title',
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-stats',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
  }, [])

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#111111]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg opacity-60" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_30%_50%,rgba(123,97,255,0.06)_0%,transparent_70%)]" />

      {/* Three.js Canvas — right side */}
      <div className="absolute inset-0 lg:left-1/3">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-[#00D4FF]/30 border-t-[#00D4FF] rounded-full animate-spin" />
            </div>
          }
        >
          <PrinterScene printProgress={printProgress} scrollY={scrollY} />
        </Suspense>
      </div>

      {/* Gradient overlay — blends canvas with left text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 lg:via-[#111111]/40 to-transparent pointer-events-none" />

      {/* Hero Text Content */}
      <div ref={textRef} className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <div className="hero-eyebrow opacity-0 flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-[#00D4FF] to-transparent" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00D4FF] font-inter">
                Premium Additive Manufacturing
              </span>
            </div>

            {/* Main Title */}
            <h1 className="hero-title opacity-0 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-sora leading-[1.05] text-[#F5F5F5] mb-6">
              Engineering the Future,{' '}
              <span className="gradient-text">One Layer</span>{' '}
              at a Time
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle opacity-0 text-lg md:text-xl text-[#F5F5F5]/60 font-inter leading-relaxed mb-10 max-w-lg">
              Precision 3D Printing for Prototypes, Manufacturing, and Innovation.
              From concept to reality — faster than ever.
            </p>

            {/* Buttons */}
            <div className="hero-buttons opacity-0 flex flex-wrap items-center gap-4 mb-16">
              <Button id="hero-get-quote" href="#contact" className="text-base px-8 py-4">
                Get a Quote <HiArrowRight className="text-lg" />
              </Button>
              <Button id="hero-explore" variant="outline" href="#services" className="text-base px-8 py-4">
                <BsPlayCircle className="text-lg" /> Explore Services
              </Button>
            </div>

            {/* Mini Stats */}
            <div className="hero-stats flex flex-wrap gap-8">
              {[
                { value: '1000+', label: 'Projects Delivered' },
                { value: '98%',   label: 'Satisfaction Rate' },
                { value: '24hrs', label: 'Rapid Turnaround' },
              ].map((stat) => (
                <div key={stat.label} className="hero-stats">
                  <div className="text-2xl font-bold font-sora gradient-text">{stat.value}</div>
                  <div className="text-xs text-[#F5F5F5]/50 font-inter tracking-wide mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Print progress indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-end gap-2">
        <div className="text-xs text-[#00D4FF]/70 font-inter tracking-widest uppercase">Printing...</div>
        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full"
            style={{ width: `${printProgress * 100}%` }}
          />
        </div>
        <div className="text-xs text-[#F5F5F5]/40 font-inter">{Math.round(printProgress * 100)}%</div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-[#F5F5F5]/30 font-inter tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#00D4FF]/60 to-transparent"
        />
      </div>
    </section>
  )
}
