import { ImageUp, Trash2, RefreshCw } from 'lucide-react'
import { UploadFile } from './types'

interface Props {
  file: UploadFile
  onDelete: (id: string) => void
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} mb`
}

function getStatusDisplay(status: UploadFile['status'], progress: number) {
  switch (status) {
    case 'uploading':
      return {
        text: `${progress}% uploaded`,
        className: 'text-zinc-400'
      }
    case 'failed':
      return {
        text: 'Upload failed',
        className: 'text-red-400'
      }
    case 'success':
      return {
        text: 'Upload finished',
        className: 'text-emerald-300'
      }
  }
}

export function FileItem({ file, onDelete }: Props) {
  const statusDisplay = getStatusDisplay(file.status, file.progress)

  return (
    <div className="bg-white/[0.02] rounded-lg p-3 relative shadow-[0px_0px_0px_1px_rgba(0,0,0,0.25),inset_0px_1px_0px_rgba(255,255,255,0.02),inset_0px_0px_0px_1px_rgba(255,255,255,0.02)]">
      <div className="flex flex-col gap-1">
        {/* Row 1: icon + filename */}
        <div className="flex items-center gap-1 pr-10">
          <ImageUp size={12} className="text-zinc-300 shrink-0" />
          <span className="text-white font-medium text-xs leading-none truncate">
            {file.name}
          </span>
        </div>

        {/* Row 2: size + divider + status */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 text-[11px] leading-none shrink-0">
            {formatSize(file.size)}
          </span>
          <div className="w-px h-2.5 bg-zinc-700 shrink-0" />
          <span className={`text-[11px] leading-none ${statusDisplay.className}`}>
            {statusDisplay.text}
          </span>
        </div>

        {/* Progress bar (only when uploading) */}
        {file.status === 'uploading' && (
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {file.status === 'failed' && (
          <RefreshCw size={14} className="text-zinc-400 cursor-pointer hover:text-zinc-200" />
        )}
        <Trash2
          size={14}
          className="text-zinc-400 cursor-pointer hover:text-zinc-200"
          onClick={() => onDelete(file.id)}
        />
      </div>
    </div>
  )
}
