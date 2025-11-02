export default function About(){
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold mb-6 glow-text">Chi sono</h2>
      <p className="text-gray-300 leading-relaxed">
        Sono Vix: Discord dev, bot dev, video editor, graphic & branding designer. 
        Progetto sistemi con un approccio neurale: analisi, funzionalità, estetica. 
        L'obiettivo? Far vedere cosa so fare — con progetti solidi e usabili.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        <div className="card p-6">
          <h3 className="font-semibold text-vix-neon mb-2">System Design & Bot Dev</h3>
          <p className="text-sm text-gray-300">Architetture Discord/Backend, automazioni, permessi, flussi.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-vix-neon mb-2">Branding & Visual</h3>
          <p className="text-sm text-gray-300">Identità, UI, overlay streaming, materiali per creator.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-vix-neon mb-2">Automation & Infra</h3>
          <p className="text-sm text-gray-300">Pipeline, CI/CD, deploy Netlify/Vercel, integrazioni GitHub.</p>
        </div>
      </div>
    </section>
  )
}
