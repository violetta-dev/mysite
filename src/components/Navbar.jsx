import { NavLink } from 'react-router-dom'
import logo from '../assets/branding/logo_main.png'

const nav = [
  {to:'/', label:'Home'},
  {to:'/about', label:'Chi sono'},
  {to:'/projects', label:'Progetti'},
  {to:'/contact', label:'Contatti'},
]

export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Vix logo" className="w-8 h-8" />
          <span className="font-extrabold tracking-wide">VIX SYSTEMS</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({isActive}) => `text-sm ${isActive ? 'text-vix-neon' : 'text-gray-300 hover:text-white'} transition-colors`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
