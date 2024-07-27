import { Component, onMount, onCleanup, createEffect, createSignal } from 'solid-js'
import { AiOutlineZoomOut, AiOutlineZoomIn } from 'solid-icons/ai'
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/theme-github_dark'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/ext-language_tools'

type Props = {
  code: string;
  mode: string;
  onChange: (code: string) => void;
}

const TextEditor: Component<Props> = (props) => {
  let editorRef: HTMLDivElement | undefined
  let aceEditor: ace.Ace.Editor | undefined
  const [fontSize, setFontSize] = createSignal(14)

  onMount(() => {
    if (editorRef) {
      aceEditor = ace.edit(editorRef)
      aceEditor.setTheme('ace/theme/github_dark')
      aceEditor.getSession().setMode(props.mode)
      aceEditor.getSession().setValue(props.code)
      aceEditor.getSession().setUseWorker(false)
      aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: fontSize(),
      })
      aceEditor.getSession().on('change', () => {
        if (aceEditor) {
          props.onChange(aceEditor.getSession().getValue())
        }
      })
    }
  })

  createEffect(() => {
    if (aceEditor) {
      aceEditor.getSession().setMode(props.mode)
      if (aceEditor.getSession().getValue() !== props.code) {
        aceEditor.getSession().setValue(props.code)
      }
      aceEditor.setFontSize(fontSize())
    }
  })

  onCleanup(() => {
    if (aceEditor) {
      aceEditor.destroy()
    }
  })

  const zoomIn = () => setFontSize(prev => Math.min(prev + 2, 24))
  const zoomOut = () => setFontSize(prev => Math.max(prev - 2, 8))

  return (
    <div class="text-center">
      <div class="mb-2 flex justify-end space-x-2">
        <button onClick={zoomOut} class="flex items-center justify-center rounded bg-accent px-2 py-1">
          <AiOutlineZoomOut size={24} class="text-black dark:text-primary" />
        </button>
        <button onClick={zoomIn} class="flex items-center justify-center rounded bg-accent px-2 py-1">
          <AiOutlineZoomIn size={24} class="text-black dark:text-primary" />
        </button>
      </div>
      <div ref={editorRef} style={{ width: '100%', height: '60vh' }} />
    </div>
  )
}

export default TextEditor
