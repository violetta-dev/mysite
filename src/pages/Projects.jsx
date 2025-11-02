import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import data from '../data/projects.json'
import { StatusBadge, Tag } from '../components/Badges.jsx'
import Modal from '../components/Modal.jsx'

export default function Projects(){
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('Tutti')
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)

  const allTags = useMemo(() => {
    const set = new Set()
    data.forEach(p => (p.tags||[]).forEach(t => set.add(t)))
    return ['Tutti', ...Array.from(set).sort()]
  }, [])

  const filtered = useMemo(() => {
    return data
      .filter(p => tag === 'Tutti' ? true : (p.tags||[]).includes(tag))
      .filter(p => {
        if(!query.trim()) return true
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          (p.description||'').toLowerCase().includes(q) ||
          (p.tags||[]).some(t => t.toLowerCase().includes(q))
        )
      })
      .sort((a,b) => (b.year||0) - (a.year||0))
  }, [tag, query])

  const openModal = (p) => { setCurrent(p); setOpen(true) }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4 glow-text">Progetti</h2>
      <p className="text-gray-300 mb-6">Oltre 30 progetti tra bot, web, branding e automazioni. Filtra per tag o cerca per parola chiave.</p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {allTags.map(t => (
            <Tag key={t} t={t} selected={t===tag} onClick={setTag} />
          ))}
        </div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Cerca progetto..."
          className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-vix-primary/50"
        />
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                className="card p-6 cursor-pointer hover:-translate-y-1 transition-transform"
                onClick={() => openModal(p)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{p.year}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h4 className="mt-2 font-semibold">{p.title}</h4>
                <p className="mt-2 text-sm text-gray-300 line-clamp-3">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(p.tags||[]).slice(0,4).map(t => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded bg-white/5 border border-white/10">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Modal details */}
      <Modal open={open} onClose={() => setOpen(false)}>
        {current && (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gray-400">{current.year}</div>
                <h3 className="text-xl font-bold mt-1">{current.title}</h3>
              </div>
              <StatusBadge status={current.status} />
            </div>
            <p className="mt-3 text-gray-200">{current.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(current.tags||[]).map(t => <span key={t} className="text-[11px] px-2 py-1 rounded bg-white/5 border border-white/10">{t}</span>)}
            </div>
            <div className="mt-5 flex gap-3">
              {current.link && <a className="btn-primary" href={current.link} target="_blank">Apri link</a>}
              <button className="btn-primary" onClick={() => setOpen(false)}>Chiudi</button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
