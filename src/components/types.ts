export type FileStatus = 'uploading' | 'failed' | 'success'

export interface UploadFile {
  id: string
  name: string
  size: number
  status: FileStatus
  progress: number
}
