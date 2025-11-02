export function StatusBadge({ status }){
  const map = {
    active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    in_development: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    completed: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    updated: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    deprecated: 'bg-gray-500/20 text-gray-300 border-gray-500/40',
    annullato: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    posticipated: 'bg-yellow-600/20 text-yellow-200 border-yellow-600/40'
  }
  return (
    <span className={`px-2 py-1 rounded-lg text-xs border ${map[status] || 'bg-white/10 text-gray-200 border-white/20'}`}>
      {String(status).replace('_',' ')}
    </span>
  )
}

export function Tag({ t, selected, onClick }){
  return (
    <button
      onClick={() => onClick?.(t)}
      className={`px-3 py-1 rounded-xl text-xs border transition-colors ${selected ? 'bg-vix-primary/30 border-vix-primary/50 text-white' : 'bg-black/30 border-white/10 text-gray-300 hover:border-vix-primary/40'}`}
    >
      {t}
    </button>
  )
}
