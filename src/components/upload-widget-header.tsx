import { LoaderCircle, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function UploadWidgetHeader({ isMinimized, onToggleMinimize }: Props) {
  if (isMinimized) {
    return (
      <div className="flex flex-row items-center justify-between px-4 py-3 bg-white/[0.02] rounded-lg gap-5">
        <div className="flex items-center gap-1.5">
          <LoaderCircle size={16} className="text-zinc-400 shrink-0" />
          <span className="text-white text-sm font-medium">Upload files</span>
        </div>
        <Maximize2
          size={16}
          className="text-zinc-400 cursor-pointer hover:text-zinc-200 shrink-0"
          onClick={onToggleMinimize}
        />
      </div>
    )
  }

  return (
    <div className="relative flex items-center px-5 py-4 bg-white/[0.02] border-b border-zinc-800 rounded-t-lg">
      <span className="text-white text-sm font-medium">Upload files</span>
      <Button>
        <Minimize2
          size={16}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:text-zinc-200"
          onClick={onToggleMinimize}
        />
      </Button>
    </div>
  )
}
