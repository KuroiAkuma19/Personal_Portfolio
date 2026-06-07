import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  // Use Vite env var VITE_API_BASE in production, fallback to relative path for local dev
  const rawBase = import.meta.env.VITE_API_BASE || ''
  const apiBase = rawBase.replace(/\/$/, '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const endpoint = apiBase ? `${apiBase}/api/contact/` : '/api/contact/'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error('Network error')

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="card rounded-[1.25rem] border border-white/8 bg-slate-950/30 p-6 md:max-w-2xl">
      <h3 className="text-lg font-semibold text-white">Contact</h3>
      <p className="mt-2 text-sm text-slate-300">Send a message — I&apos;ll get back to you.</p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input
          className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-slate-100"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-slate-100"
          placeholder="Your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-slate-100"
          placeholder="Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>

          <div className="text-sm text-slate-300">
            {status === 'sent' && <span className="text-emerald-300">Sent — thank you!</span>}
            {status === 'error' && <span className="text-amber-300">Failed to send.</span>}
          </div>
        </div>
      </form>
    </div>
  )
}
