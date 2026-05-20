import * as Collapsible from '@radix-ui/react-collapsible'
import { motion, useCycle } from 'motion/react'
import { UploadWidgetDropzone } from './upload-widget-dropzone'
import { UploadWidgetHeader } from './upload-widget-header'
import { UploadWidgetMinimizedButton } from './upload-widget-minimized-button'
import { UploadWidgetUploadList } from './upload-widget-upload-list'

const uploadWidgetClassName = [
  'bg-zinc-900',
  'overflow-hidden',
  'w-[360px]',
  'rounded-xl',
  'border',
  'border-transparent',
  'animate-border',
  'data-[state=open]:shadow-shape',
  'data-[state=closed]:rounded-3xl',
  'data-[state=closed]:data-[progress=false]:shadow-shape',
  'data-[state=closed]:data-[progress=true]:[background:linear-gradient(45deg,#09090B,var(--color-zinc-900)_50%,#09090B)_padding-box,conic-gradient(from_var(--border-angle),color-mix(in_oklab,var(--color-zinc-700)_48%,transparent)_80%,var(--color-indigo-500)_86%,var(--color-indigo-300)_90%,var(--color-indigo-500)_94%,color-mix(in_oklab,var(--color-zinc-600)_48%,transparent))_border-box]',
].join(' ')

export function UploadWidget() {
  const isThereAnyPendingUploads = true
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  return (
    <Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
      <motion.div
        data-progress={isThereAnyPendingUploads}
        className={uploadWidgetClassName}
        animate={isWidgetOpen ? 'open' : 'closed'}
        variants={{
          closed: {
            width: 'max-content',
            height: 44,
            transition: {
              type: 'inertia',
            },
          },
          open: {
            width: 360,
            height: 'auto',
            transition: {
              duration: 0.1,
            },
          },
        }}
      >
        {!isWidgetOpen && <UploadWidgetMinimizedButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />

            <UploadWidgetUploadList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  )
}
