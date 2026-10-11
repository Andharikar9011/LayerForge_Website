import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiMail, HiPhone, HiLocationMarker, HiArrowRight
} from 'react-icons/hi'
import {
  FaLinkedin, FaInstagram, FaYoutube, FaGithub, FaTwitter
} from 'react-icons/fa'

const navLinks = [
  { label: 'Services',   href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Technology', href: '#technology' },
  { label: 'Process',    href: '#process' },
  { label: 'Contact',    href: '#contact' },
]

const services = [
  'Rapid Prototyping',
  'Functional Parts',
  'Product Design',
  'Reverse Engineering',
  'Architectural Models',
  'Medical Models',
  'Industrial Manufacturing',
  'Custom Orders',
]

const socials = [
  { icon: FaLinkedin,  href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube,   href: '#', label: 'YouTube' },
  { icon: FaTwitter,   href: '#', label: 'Twitter' },
  { icon: FaGithub,    href: '#', label: 'GitHub' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer id="contact" className="bg-[#0d0d0d] border-t border-white/[0.05]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] rounded-xl opacity-90" />
                <div className="absolute inset-[2px] bg-[#0d0d0d] rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold gradient-text">LF</span>
                </div>
              </div>
              <span className="text-xl font-bold font-sora text-[#F5F5F5]">
                Layer<span className="gradient-text">Forge</span>
              </span>
            </div>

            <p className="text-sm text-[#F5F5F5]/50 font-inter leading-relaxed mb-6">
              Engineering the future, one layer at a time. Premium additive manufacturing for prototypes, production parts, and innovation.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass border border-white/[0.06] flex items-center justify-center text-[#F5F5F5]/50 hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold font-sora text-[#F5F5F5] tracking-widest uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#F5F5F5]/50 font-inter hover:text-[#00D4FF] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#00D4FF] transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold font-sora text-[#F5F5F5] tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map(svc => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-sm text-[#F5F5F5]/50 font-inter hover:text-[#00D4FF] transition-colors duration-200"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-sm font-semibold font-sora text-[#F5F5F5] tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-[#F5F5F5]/50 font-inter">
                <HiMail className="text-[#00D4FF] mt-0.5 flex-shrink-0" size={16} />
                <a href="mailto:hello@layerforge.in" className="hover:text-[#00D4FF] transition-colors">
                  hello@layerforge.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#F5F5F5]/50 font-inter">
                <HiPhone className="text-[#00D4FF] mt-0.5 flex-shrink-0" size={16} />
                <a href="tel:+911234567890" className="hover:text-[#00D4FF] transition-colors">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#F5F5F5]/50 font-inter">
                <HiLocationMarker className="text-[#00D4FF] mt-0.5 flex-shrink-0" size={16} />
                <span>Pune, Maharashtra, India 411001</span>
              </li>
            </ul>

            {/* Newsletter */}
            <h5 className="text-xs font-semibold font-sora text-[#F5F5F5]/70 tracking-widest uppercase mb-3">Newsletter</h5>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[#00D4FF] font-inter flex items-center gap-2"
              >
                <span>✓</span> Subscribed! Welcome to LayerForge.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-3 py-2 rounded-lg bg-[#181818] border border-white/[0.08] text-sm text-[#F5F5F5] font-inter placeholder-[#F5F5F5]/30 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-[#111111] font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all"
                >
                  <HiArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F5F5]/30 font-inter">
          <span>© 2024 LayerForge. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#00D4FF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00D4FF] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#00D4FF] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
