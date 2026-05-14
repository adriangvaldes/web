import { useRef, useState } from 'react'

interface Props {
  isDragging: boolean
  onFilesSelected: (files: File[]) => void
  onDragEnter: () => void
  onDragLeave: () => void
  onDrop: (files: File[]) => void
}

export function DropZone({ isDragging, onFilesSelected, onDragEnter, onDragLeave, onDrop }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [draggingCount, setDraggingCount] = useState(0)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggingCount(e.dataTransfer.items.length)
    onDragEnter()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Only trigger if leaving the container itself (not a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDraggingCount(0)
      onDragLeave()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggingCount(0)
    onDragLeave() // reset drag state
    const files = Array.from(e.dataTransfer.files).filter(
      f => f.type === 'image/png' || f.type === 'image/jpeg'
    )
    if (files.length > 0) {
      onDrop(files)
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            onFilesSelected(Array.from(e.target.files))
            e.target.value = '' // reset so same file can be re-selected
          }
        }}
      />
      <div
        className={`w-full h-[140px] flex flex-col items-center justify-center gap-3 rounded-lg p-5 ${
          isDragging
            ? 'border border-solid border-indigo-500 bg-indigo-500/10'
            : 'border border-dashed border-zinc-700 bg-zinc-950'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-indigo-100 text-xs">{`Add ${draggingCount} files to the upload queue`}</span>
            <span className="text-zinc-400 text-[11px]">Only PNG and JPG (4mb max)</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-zinc-400 text-xs">Drag &amp; drop your files here or</span>
              <button
                type="button"
                className="text-zinc-300 text-xs font-medium underline cursor-pointer bg-transparent border-none p-0"
                onClick={() => inputRef.current?.click()}
              >
                Choose files
              </button>
            </div>
            <span className="text-zinc-400 text-[11px]">Only PNG and JPG (4mb max)</span>
          </div>
        )}
      </div>
    </>
  )
}
