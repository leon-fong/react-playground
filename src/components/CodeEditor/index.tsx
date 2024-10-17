/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import FileNameList from './FileNameList'
import Editor from './Editor'

const CodeEditor = () => {

const file = {
  name: 'demo.tsx',
  value: "import lodash from 'lodash'; \n\n const a = <div>hello</div>",
  language: 'typescript'
}

function onEditorChange(...rest:any[]) {
  console.log(rest)
}
  return (
    <div className='flex flex-col h-full'>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  )
}

export default CodeEditor
