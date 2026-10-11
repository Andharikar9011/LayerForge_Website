import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: `
    relative inline-flex items-center justify-center gap-2 px-8 py-3.5
    bg-gradient-to-r from-[#00D4FF] to-[#7B61FF]
    text-[#111111] font-semibold font-sora tracking-wide rounded-lg
    overflow-hidden transition-all duration-300
    hover:shadow-[0_0_30px_rgba(0,212,255,0.5),0_0_60px_rgba(0,212,255,0.2)]
    hover:scale-[1.03] active:scale-[0.98]
  `,
  outline: `
    relative inline-flex items-center justify-center gap-2 px-8 py-3.5
    border border-[#00D4FF]/50 text-[#00D4FF] font-semibold font-sora tracking-wide rounded-lg
    overflow-hidden transition-all duration-300
    hover:border-[#00D4FF] hover:bg-[#00D4FF]/10
    hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]
    hover:scale-[1.03] active:scale-[0.98]
  `,
  ghost: `
    relative inline-flex items-center justify-center gap-2 px-8 py-3.5
    text-[#F5F5F5] font-semibold font-sora tracking-wide rounded-lg
    overflow-hidden transition-all duration-300
    hover:bg-white/5 active:scale-[0.98]
  `,
}

export default function Button({ children, variant = 'primary', className = '', onClick, href, id }) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    btn.style.setProperty('--mx', `${x}px`)
    btn.style.setProperty('--my', `${y}px`)
  }

  const cls = `${variants[variant] || variants.primary} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        id={id}
        ref={btnRef}
        className={cls}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      id={id}
      ref={btnRef}
      className={cls}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
