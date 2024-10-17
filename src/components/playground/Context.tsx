import { createContext } from "react"

export interface File {
  name: string
  value: string
  language: string
}

export interface Files {
  [key: string] : File
}

interface PlaygroundContext {
  files: Files
  selectedFileName: string
  setSelectedFileName: (fileName: string) => void
  setFiles: (files:Files) => void
  addFile: (fileName: string)=> void
  removeFile: (fileName: string)=> void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

export const PlayGroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx'
} as PlaygroundContext)
