'use client'
import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t, i) => (
        <div key={i} className="bg-white border border-border text-foreground px-6 py-4 rounded-xl shadow-xl font-semibold shadow-black/5" style={{ animation: 'bounce-in 0.3s ease-out forwards' }}>
          {t.description}
        </div>
      ))}
      <style>{`
        @keyframes bounce-in {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
