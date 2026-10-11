# LayerForge Website — Implementation Plan

## Overview

A premium, production-ready website for **LayerForge**, a 3D Printing & Additive Manufacturing company. The site will rival Apple, Tesla, SpaceX, and NVIDIA in visual quality using React (Vite), Three.js via React Three Fiber, GSAP, Framer Motion, and Tailwind CSS.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | Framework & bundler |
| @react-three/fiber | Three.js in React |
| @react-three/drei | 3D helpers (HDRI, OrbitControls, etc.) |
| @react-three/postprocessing | Bloom, DOF, AO |
| GSAP + ScrollTrigger | Scroll animations, timelines |
| Framer Motion | UI micro-animations |
| Tailwind CSS | Utility-first styling |
| React Icons | Icon library |
| leva | 3D debug controls (dev) |

---

## Folder Structure

```
layerforge/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   │   ├── HeroSection.jsx
│   │   │   └── PrinterScene.jsx
│   │   ├── Services/
│   │   ├── InteractiveScene/
│   │   ├── Industries/
│   │   ├── Process/
│   │   ├── Technology/
│   │   ├── Portfolio/
│   │   ├── Statistics/
│   │   ├── Testimonials/
│   │   ├── CTA/
│   │   ├── Footer/
│   │   └── ui/           ← Reusable: Button, Card, SectionTitle
│   ├── hooks/
│   │   ├── useMouseParallax.js
│   │   └── useScrollAnimation.js
│   ├── utils/
│   │   └── gsap.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Page Sections (Build Order)

### 1. Project Scaffold
- `npm create vite@latest` → React
- Install all dependencies
- Configure Tailwind, GSAP, aliases

### 2. Design System (index.css + tailwind.config.js)
- Color palette: `#111111`, `#181818`, `#242424`, `#F5F5F5`
- Accent: `#00D4FF`, secondary: `#7B61FF`
- Custom fonts: Sora (Google Fonts)
- Custom animations, glassmorphism utilities

### 3. Navbar
- Transparent → solid on scroll (GSAP ScrollTrigger)
- Mobile hamburger menu
- CTA "Get Quote" button with glow

### 4. Hero Section
- Full-screen Three.js canvas (React Three Fiber)
- Metallic 3D printer mesh (built procedurally via Three.js geometries)
- Layer-by-layer printing animation (animated plane growing upward)
- Floating particles system
- Post-processing: Bloom, Depth of Field
- Mouse parallax camera rotation
- Scroll-to-zoom
- GSAP text fade-in from left
- Two CTA buttons with glow hover

### 5. Services Section
- 8 animated cards with 3D tilt (CSS perspective + JS)
- Icon animation on hover
- Staggered entrance via GSAP ScrollTrigger

### 6. Interactive Three.js Section
- Full-width R3F canvas
- Floating geometric objects representing printable items
- OrbitControls
- Click → wireframe explosion
- Material switcher

### 7. Industries Section
- 8 cards with glowing border hover
- Framer Motion entrance animations

### 8. Our Process
- Horizontal scrolling timeline
- 5 steps with animated connectors (SVG lines)
- GSAP ScrollTrigger horizontal scroll

### 9. Technology Section
- Animated floating hexagons grid
- 9 printing technologies

### 10. Portfolio
- Masonry grid (CSS columns)
- Hover overlay reveal
- Image zoom effect

### 11. Statistics
- 4 animated counters (CountUp on scroll)

### 12. Testimonials
- Glassmorphism cards
- Auto-sliding carousel (Framer Motion)

### 13. CTA Section
- Animated gradient background
- Pulsing glow button

### 14. Footer
- Logo + nav links + social icons + newsletter form

---

## Three.js Effects Details

- Environment: HDRI preset (studio/city)  
- Post-processing: `@react-three/postprocessing` (Bloom, DepthOfField, SSAO)
- Particles: custom `Points` geometry with animated positions
- Printer nozzle: animated y-movement + emissive glow
- Layer animation: `boxGeometry` that scales on Y axis per frame
- Mouse parallax: `useFrame` + lerped camera rotation
- Wireframe transition: material morphing on click

---

## Verification Plan

1. `npm run dev` — verify all sections render without errors
2. Check Three.js canvas performance (target 60fps)
3. Verify scroll animations trigger correctly
4. Test mobile responsiveness (hamburger, stacked layout)
5. Verify Tailwind purging works in production build
