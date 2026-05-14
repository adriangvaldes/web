import { useState } from 'react'
import { UploadFile } from './types'
import { WidgetHeader } from './WidgetHeader'
import { DropZone } from './DropZone'
import { FileItem } from './FileItem'

const WIDGET_SHADOW = 'shadow-[0px_8px_8px_rgba(0,0,0,0.1),0px_4px_4px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(0,0,0,0.1),inset_0px_0px_0px_1px_rgba(255,255,255,0.03),inset_0px_1px_0px_rgba(255,255,255,0.03)]'

export function UploadWidget() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  function handleFilesAdded(newFiles: File[]) {
    const mapped: UploadFile[] = newFiles.map(f => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      status: f.size > 4 * 1024 * 1024 ? 'failed' : 'uploading',
      progress: 0,
    }))
    setFiles(prev => [...prev, ...mapped])
  }

  function handleDelete(id: string) {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  if (isMinimized) {
    return (
      <div className={`bg-zinc-900 rounded-lg ${WIDGET_SHADOW}`}>
        <WidgetHeader isMinimized={true} onToggleMinimize={() => setIsMinimized(false)} />
      </div>
    )
  }

  return (
    <div className={`bg-zinc-900 rounded-lg w-[400px] ${WIDGET_SHADOW}`}>
      <WidgetHeader isMinimized={false} onToggleMinimize={() => setIsMinimized(true)} />

      <div className="flex flex-col py-4 gap-4">
        {/* Drop zone section */}
        <div className="px-5">
          <DropZone
            isDragging={isDragging}
            fileCount={files.length}
            onFilesSelected={handleFilesAdded}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFilesAdded}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 border-t border-black/25" />

        {/* Files section */}
        <div className="px-5 flex flex-col gap-3">
          <span className="text-white text-xs font-medium">Uploaded files</span>
          {files.length === 0 ? (
            <span className="text-zinc-400 text-xs">No uploads added to the queue</span>
          ) : (
            <div className="flex flex-col gap-2">
              {files.map(f => (
                <FileItem key={f.id} file={f} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
