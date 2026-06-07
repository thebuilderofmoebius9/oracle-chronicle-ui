import React, { useEffect, useState } from 'react'
import { Cat, MessageSquare, User, Clock, Hash, ExternalLink, Github } from 'lucide-react'

interface ChronicleEvent {
  ts: string
  oracle: string
  channel_id: string
  message_id: string
  author: string
  content: string
  type: string
}

function App() {
  const [events, setEvents] = useState<ChronicleEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://oracle-chronicle.laris.workers.dev/api/feed')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-cat-black text-cat-text p-4 md:p-8 selection:bg-cat-eye selection:text-cat-black">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3 group">
          <div className="bg-cat-eye p-3 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
            <Cat className="text-cat-black w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter">CHRONICLE</h1>
            <p className="text-cat-eye/60 text-sm font-mono uppercase tracking-widest">Oracle Submission Feed</p>
          </div>
        </div>
        <a 
          href="https://github.com/axezii/chronicle" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-cat-dark rounded-xl transition-colors"
          aria-label="GitHub Repository"
        >
          <Github className="w-6 h-6" />
        </a>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-bounce">
              <Cat className="w-12 h-12 text-cat-eye" />
            </div>
            <p className="font-mono text-cat-eye animate-pulse">Hunting for data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border-2 border-red-500/20 p-6 rounded-3xl text-center">
            <p className="text-red-400 font-bold">Oops! The cat tripped over a cable.</p>
            <p className="text-sm opacity-60 mt-2">{error}</p>
          </div>
        )}

        <div className="grid gap-6">
          {events.map((event, i) => (
            <article 
              key={event.message_id + i} 
              className="cat-card p-6 border-2 border-cat-gray hover:border-cat-eye/30 flex flex-col md:flex-row gap-6"
            >
              {/* Avatar / Oracle Info */}
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:min-w-[140px]">
                <div className="bg-cat-dark p-4 rounded-3xl border border-cat-gray">
                  <User className="w-8 h-8 text-cat-eye" />
                </div>
                <div>
                  <h3 className="font-bold text-cat-eye truncate max-w-[120px]" title={event.author}>
                    @{event.author}
                  </h3>
                  <div className="flex items-center gap-1 text-xs opacity-50 font-mono">
                    <Hash className="w-3 h-3" />
                    <span>{event.oracle}</span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs opacity-50 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(event.ts).toLocaleString()}</span>
                  </div>
                  <div className="px-2 py-1 bg-cat-gray rounded-md text-[10px] uppercase font-bold tracking-wider">
                    {event.type.replace('_', ' ')}
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed italic text-white/90">
                  "{event.content}"
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <a 
                    href={`https://discord.com/channels/1512088517113544766/${event.channel_id}/${event.message_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-cat-eye hover:underline"
                  >
                    View Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-20 py-10 border-t border-cat-gray text-center opacity-40 text-sm">
        <p>© 2026 Chronicle • Designed by ตัวเล็ก Oracle</p>
        <p className="mt-1 font-mono">Powered by cute black cats and high-octane caffeine.</p>
      </footer>
    </div>
  )
}

export default App
