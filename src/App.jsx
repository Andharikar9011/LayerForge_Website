import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/Hero/HeroSection'
import ServicesSection from './components/Services/ServicesSection'
import InteractiveScene from './components/InteractiveScene/InteractiveScene'
import IndustriesSection from './components/Industries/IndustriesSection'
import ProcessSection from './components/Process/ProcessSection'
import TechnologySection from './components/Technology/TechnologySection'
import PortfolioSection from './components/Portfolio/PortfolioSection'
import StatisticsSection from './components/Statistics/StatisticsSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
import CTASection from './components/CTA/CTASection'
import Footer from './components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const cursorRef = useRef(null)

  /* Cursor glow follow */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* GSAP ScrollTrigger: fade-in all .gs-reveal elements */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gs-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="cursor-glow hidden lg:block"
        aria-hidden="true"
      />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <InteractiveScene />
        <IndustriesSection />
        <ProcessSection />
        <TechnologySection />
        <PortfolioSection />
        <StatisticsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
