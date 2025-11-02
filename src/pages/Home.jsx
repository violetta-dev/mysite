import { motion } from 'framer-motion'
import bg from '../assets/branding/background_hero.svg'
import logo from '../assets/branding/logo_main.png'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="neural-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
      <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
        <motion.img
          src={logo}
          alt="Vix Systems"
          className="mx-auto mb-6 w-24 h-24 drop-shadow"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Developer · Designer · System Architect
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Creo bot, interfacce e sistemi che funzionano davvero. Porpora nel cuore, precisione nel codice.
        </motion.p>
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <Link to="/projects" className="btn-primary">Vedi i progetti</Link>
          <a href="/Vix_CV.pdf" className="btn-primary" download>Scarica CV</a>
        </motion.div>
      </div>
    </section>
  )
}
