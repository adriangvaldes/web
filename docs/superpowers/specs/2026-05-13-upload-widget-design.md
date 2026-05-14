# Upload Widget — Design Spec

**Date:** 2026-05-13  
**Status:** Approved

## Context

Build a file upload widget based on a Figma design (CSS provided by user). The project is a fresh React + TypeScript + Tailwind CSS v4 app with no existing components. The widget is purely visual — no real upload logic or timers. Interactions are limited to UI behavior: drag & drop detection, file selection, delete from list, and minimize/maximize.

## Scope

A single self-contained widget placed in `App.tsx`, centered on screen.

## Architecture

```
src/components/upload-widget/
├── UploadWidget.tsx     — container with all state
├── WidgetHeader.tsx     — header with title and minimize/maximize button
├── DropZone.tsx         — drag & drop zone with visual states
├── FileItem.tsx         — individual file row
└── index.ts             — barrel export
```

**New dependency:** `lucide-react` (ImageUp, Trash2, RefreshCw, Minimize2, Maximize2, LoaderCircle icons)

## Data Model

```ts
type FileStatus = 'uploading' | 'failed' | 'success'

interface UploadFile {
  id: string        // crypto.randomUUID()
  name: string      // from File API
  size: number      // bytes from File API
  status: FileStatus
  progress: number  // 0–100, static visual only
}
```

**State in UploadWidget:**
- `files: UploadFile[]`
- `isDragging: boolean`
- `isMinimized: boolean`

## Visual States

### Widget
- **Normal:** Header + Body (DropZone + file list)
- **Minimized:** Header only (no body), horizontal layout, maximize icon

### DropZone
- **Idle:** dashed `border-zinc-700` + `bg-zinc-950`; text "Drag & drop your files here or" + "Choose files" link
- **Dragging:** solid `border-indigo-500` + `bg-indigo-500/10`; text "Add N files to the upload queue" in `text-indigo-100`

### File list (Body)
- Empty: label "Uploaded files" + text "No uploads added to the queue" in `text-zinc-400`
- With files: label + list of FileItem rows

### FileItem states
| Status | Progress bar | Status text | Actions |
|--------|-------------|-------------|---------|
| uploading | indigo partial bar | "X% (Y sec left)" in zinc-400 | Trash |
| failed | no bar shown | "Upload failed" in red-400 | Trash + RefreshCw |
| success | no bar shown | "Upload finished" in emerald-300 | Trash |

> Since this is visual-only, new files added via UI get `status='uploading'`, `progress=0`. Files > 4 MB get `status='failed'`.

## Interactions

| Action | Result |
|--------|--------|
| Drag file over DropZone | `isDragging=true` → indigo drop state |
| Drag leaves / drop | `isDragging=false` |
| Drop files | Added to list (validated for type/size) |
| Click "Choose files" | Opens `<input type="file">` (PNG/JPG, multiple) |
| Select files | Added to list |
| Trash icon | Removes file from list |
| RefreshCw icon | No-op (visual only, no state change) |
| Minimize button | `isMinimized=true` |
| Maximize button | `isMinimized=false` |

## Design Tokens → Tailwind Mapping

| Element | Tailwind class |
|---------|----------------|
| Outer bg | `bg-zinc-950` |
| Widget bg | `bg-zinc-900` |
| Border | `border-zinc-800` |
| Divider | `border-zinc-800` / `bg-zinc-800` |
| Muted text | `text-zinc-400` |
| Body text | `text-zinc-300` |
| Heading | `text-white` |
| Accent | `bg-indigo-500` / `border-indigo-500` |
| Success | `text-emerald-300` |
| Error | `text-red-400` |
| Font | `font-[Inter]` (already loaded in index.html) |

## File Validation (visual)
- Accept: `image/png`, `image/jpeg`
- Max size: 4 MB → if `file.size > 4 * 1024 * 1024`, set `status='failed'`

## Placement

In `App.tsx`, render `<UploadWidget />` centered in a full-screen dark bg:
```tsx
<div className="min-h-screen bg-[#29292E] flex items-center justify-center">
  <UploadWidget />
</div>
```

## Out of Scope
- Real HTTP upload requests
- Progress animation / timers
- Backend integration
- Authentication
