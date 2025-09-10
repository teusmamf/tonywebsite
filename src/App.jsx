import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import profilephoto  from './assets/tony_profile.png'
const LazySpline = lazy(() => import('@splinetool/react-spline'))
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faGlobe, faBolt , faTrophy} from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? 'bg-white/80 backdrop-blur shadow-soft' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl font-semibold text-black">Tony Teshara</a>
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <a href="#about" className="hover:text-black">About</a>
          <a href="#vision" className="hover:text-black">Vision</a>
          <a href="#media" className="hover:text-black">Media</a>
          <a href="#contact" className="hover:text-black">Contact</a>
          <a href="#contact" className="ml-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">Let's Connect</a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  const [mountSpline, setMountSpline] = useState(false)
  const [inView, setInView] = useState(true)
  const [nearTop, setNearTop] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)

    // Defer initial Spline mount to idle to avoid blocking first paint
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 800))
    const id = idle(() => setMountSpline(true))

    // Track scroll to pause Spline when user scrolls down the page
    const onScroll = () => setNearTop(window.scrollY < 96)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if ('cancelIdleCallback' in window) {
        // @ts-ignore - not in all TS libs
        window.cancelIdleCallback(id)
      } else {
        clearTimeout(id)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const el = document.getElementById('hero')
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setInView(entry.isIntersecting)
      },
      { root: null, threshold: 0.15, rootMargin: '100px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const showSpline = mountSpline && inView && nearTop && !isMobile

  
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden" style={{ contain: 'layout paint' }}>
      {/* Soft pastel background as placeholder while Spline mounts */}
      <div className="absolute inset-0 pastel-gradient" aria-hidden="true" />
      {showSpline && (
        <Suspense fallback={null}>
          <LazySpline
            scene="https://prod.spline.design/RbvKftgEgl9Hz5Ph/scene.splinecode" 
            aria-label="Interactive background animation"
            className="absolute inset-0"
          />
        </Suspense>
      )}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center text-left px-6 md:pl-70 pointer-events-none">
        <img
          src={profilephoto}
          alt="Tony Teshara"
          loading="lazy"
          className="w-40 h-40 rounded-full shadow-soft mb-6 animate-fade-in"
        />
        <h1 className="text-4xl md:text-6xl font-display font-bold text-black animate-slide-up">Tony Teshara</h1>
        <h2 className="mt-2 text-xl md:text-2xl text-gray-700 animate-fade-in-delay">CEO & Co-Founder of Handle</h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl overflow-hidden whitespace-nowrap border-r-2 border-gray-500 animate-typewriter">
          Helping U.S. companies hire the best LATAM talent.
        </p>
        <a href="#contact" className="mt-8 px-6 py-3 bg-black text-white rounded-full shadow-soft hover:bg-gray-800 transition pointer-events-auto">
          Letâ€™s Connect
        </a>
      </div>
    </section>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function About() {
  return (
    <section id="about" className="relative py-24 bg-white">
      <div className="absolute inset-0 pastel-gradient opacity-60 -z-10" aria-hidden />
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="bg-white rounded-2xl shadow-soft p-8 md:p-10"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-black mb-3">About Tony</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dad and CEO of Handle. Tony is reshaping recruitmentâ€”transparent, efficient, and human-first.
            He bridges the gap between U.S. companies and LATAM talent.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Vision() {
  
  const cards = useMemo(
    () => [
      { title: 'Transparency', text: 'No markups. No wasted time.', icon: <FontAwesomeIcon icon={faHandshake} style={{ color: "#000000" }} />},
      { title: 'Global Reach', text: 'Bridging U.S. companies and LATAM talent.', icon: <FontAwesomeIcon icon={faGlobe} style={{ color: "#000000" }} /> },
      { title: 'Efficiency', text: 'Fast, reliable recruiting for growing teams.', icon:<FontAwesomeIcon icon={faBolt} style={{ color: "#000000" }} /> },
    ],
    []
  )
  const extraCard = { title: '150+ companies helped', text: 'We\u2019ve partnered across industries.', icon: <FontAwesomeIcon icon={faTrophy} style={{ color: "#000000" }} /> }
  return (
    <section id="vision" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="font-display text-3xl md:text-4xl font-semibold text-black mb-10 text-center"
        >
          Recruitment Reinvented
        </motion.h3>
        
        <div className="mt-8 relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            initial={{ x: '0%' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            aria-label="Auto-scrolling highlights"
          >
            {[...cards, extraCard, ...cards, extraCard].map((c, i) => (
              <div
                key={`${c.title}-${i}`}
                className="w-72 flex-shrink-0 bg-white rounded-2xl shadow-soft p-8"
              >
                <div className="text-3xl mb-4" aria-hidden>{c.icon}</div>
                <h4 className="text-xl font-semibold text-black mb-2">{c.title}</h4>
                <p className="text-gray-700">{c.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MediaCarousel() {
    const items = [
    { title: 'Podcast: Building Transparent Recruiting', source: 'Podcast — 2024', quote: "Loved Tony's clear model for hiring across LATAM." },
    { title: 'Press: Handle Raises Awareness', source: 'Tech News', quote: 'A fresh take on technical recruiting.' },
    { title: 'Podcast: Hiring Playbook', source: 'Founder Show', quote: 'Actionable steps for fast, fair hiring.' },
  ]
  return (
    <section id="media" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="font-display text-3xl md:text-4xl font-semibold text-black mb-8 text-center"
        >
          Media & Podcasts
        </motion.h3>
        <div className="relative">
          <div
            className="flex gap-6  snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {items.map((it, idx) => (
              <motion.div
                key={idx}
                className="min-w-[85%] md:min-w-[32%] snap-center flex items-center justify-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <p className="title">{it.title}</p>
                    </div>
                    <div className="flip-card-back">
                      <p className="text-sm text-white/90">{it.source}</p>
                      <p className="mt-2 max-w-[14rem] px-4 italic">&ldquo;{it.quote}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="font-display text-3xl md:text-4xl font-semibold text-black mb-8 text-center"
        >
          Need hiring advice
        </motion.h3>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-cyan-500 p-[2px] shadow-soft mb-10">
          <div className="bg-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-display font-semibold text-black">Talk to Tony in Hubble</h4>
              <p className="mt-2 text-gray-700 max-w-xl">Quick guidance on roles, pipelines, or compensation. Tap the icon to open the chat.</p>
            </div>
            <a
              href="http://app.hubble.social/tonyteshara"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-black text-white shadow-lg hover:scale-105 transition will-change-transform"
              aria-label="Open Hubble chat"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9.8l-3.4 2.6A1 1 0 0 1 5 16.9V15H7a3 3 0 0 1-3-3V5Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Thanks! We will get in touch shortly.')
          }}
          className="bg-white rounded-2xl shadow-soft p-8 grid gap-6"
        >
          <div className="relative">
            <input id="name" name="name" type="text" placeholder=" " required className="peer w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black" />
            <label htmlFor="name" className="absolute left-3 top-3 px-1 bg-white text-gray-500 transition-transform origin-left">Name</label>
          </div>
          <div className="relative">
            <input id="email" name="email" type="email" placeholder=" " required className="peer w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black" />
            <label htmlFor="email" className="absolute left-3 top-3 px-1 bg-white text-gray-500 transition-transform origin-left">Email</label>
          </div>
          <div className="relative">
            <textarea id="message" name="message" rows={5} placeholder=" " className="peer w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"></textarea>
            <label htmlFor="message" className="absolute left-3 top-3 px-1 bg-white text-gray-500 transition-transform origin-left">How can we help?</label>
          </div>
          <button type="submit" className="justify-self-start px-6 py-3 bg-black text-white rounded-full shadow-soft hover:bg-gray-800 transition">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="font-sans">
      <div className="noise-texture" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <MediaCarousel />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function Footer() {
  const socials = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tonyteshara', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zm7.5 0h5V14.3c0-2.06.78-3.47 2.73-3.47 1.48 0 2.23 1 2.23 3.47V24h5V13.5C22.46 8.56 20.06 7 17.5 7c-2.16 0-3.6 1.18-4.2 2.3h-.06V7H7.5v17z" fill="currentColor"/>
      </svg>
    )},
    { name: 'Email', href: 'mailto:tony@handle.lat', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm3-.5h14c.28 0 .5.22.5.5v.37l-7.5 5.2-7.5-5.2V5c0-.28.22-.5.5-.5Zm14.5 3.3v10.2c0 .28-.22.5-.5.5H5c-.28 0-.5-.22-.5-.5V7.8l7.1 4.92c.25.17.6.17.85 0l7.1-4.92Z" fill="currentColor"/>
      </svg>
    )},
  ]

  return (
    <footer className="bg-gray-900/95 relative">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-white/10 via-white/5 to-white/10" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 py-12 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="font-display text-xl font-semibold text-white">Tony Teshara</p>
            <p className="mt-1"><a href="mailto:tony@handle.lat" className="text-white hover:text-white/80">tony@handle.lat</a></p>
            <p className="text-gray-600">CEO & Coâ€‘Founder of Handle</p>
          </div>
          <nav className="flex gap-6 text-gray-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#vision" className="hover:text-white">Vision</a>
            <a href="#media" className="hover:text-white">Media</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-gray-500 text-sm">Â© {new Date().getFullYear()} Tony Teshara â€¢ Handle</div>
      </div>
    </footer>
  )
}



