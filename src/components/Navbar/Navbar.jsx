import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { gsap } from 'gsap'
import Button from '../ui/Button'

const links = [
  { label: 'Home',       href: '#home' },
  { label: 'Services',   href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Technology', href: '#technology' },
  { label: 'About',      href: '#process' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeLink,  setActiveLink]  = useState('#home')
  const navRef = useRef(null)

  /* Scroll detection ── solid navbar after 80px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* GSAP intro animation */
  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  /* Active link tracker */
  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink('#' + entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    setActiveLink(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-[#111111]/95 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={() => handleNav('#home')} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] rounded-lg opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] bg-[#111111] rounded-md flex items-center justify-center">
                <span className="text-xs font-bold gradient-text">LF</span>
              </div>
            </div>
            <span className="text-xl font-bold font-sora text-[#F5F5F5] group-hover:gradient-text transition-all">
              Layer<span className="gradient-text">Forge</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium font-inter rounded-md transition-all duration-200
                    ${activeLink === link.href
                      ? 'text-[#00D4FF]'
                      : 'text-[#F5F5F5]/70 hover:text-[#F5F5F5]'
                    }`}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[#00D4FF]/10 rounded-md"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              id="nav-get-quote"
              variant="primary"
              href="#contact"
              className="hidden lg:inline-flex text-sm px-5 py-2.5"
            >
              Get Quote
            </Button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg text-[#F5F5F5]/70 hover:text-[#00D4FF] hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#111111]/98 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNav(link.href)}
                  className={`text-3xl font-bold font-sora transition-all duration-200
                    ${activeLink === link.href ? 'gradient-text' : 'text-[#F5F5F5]/70 hover:text-[#F5F5F5]'}`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 }}
              >
                <Button id="mobile-get-quote" href="#contact" onClick={() => setMenuOpen(false)}>
                  Get Quote
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
