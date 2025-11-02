export default function Contact(){
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold mb-6 glow-text">Contatti</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a className="card p-6 hover:-translate-y-1 transition-transform" href="https://twitch.tv" target="_blank">Twitch</a>
        <a className="card p-6 hover:-translate-y-1 transition-transform" href="https://discord.gg" target="_blank">Discord</a>
        <a className="card p-6 hover:-translate-y-1 transition-transform" href="https://github.com" target="_blank">GitHub</a>
        <a className="card p-6 hover:-translate-y-1 transition-transform" href="mailto:contact@example.com">Email</a>
      </div>
    </section>
  )
}
