export default function ProjectCard({ p }){
  return (
    <div className="card p-6 hover:-translate-y-1 transition-transform">
      <div className="text-xs text-gray-400">{p.tag}</div>
      <h4 className="mt-1 font-semibold">{p.name}</h4>
      <p className="mt-2 text-sm text-gray-300">{p.description}</p>
      <div className="mt-4 flex gap-3">
        {p.links?.github && <a className="link text-sm" href={p.links.github} target="_blank">GitHub</a>}
        {p.links?.demo && <a className="link text-sm" href={p.links.demo} target="_blank">Demo</a>}
      </div>
    </div>
  )
}
