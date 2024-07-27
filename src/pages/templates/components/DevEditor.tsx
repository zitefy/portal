import { Component, createSignal, For, JSX, Show, Setter } from 'solid-js'
import { VsCode } from 'solid-icons/vs'
import { FaSolidPaintbrush } from 'solid-icons/fa'
import { TbLogicBuffer } from 'solid-icons/tb'
import { AiFillFolderOpen } from 'solid-icons/ai'
import TextEditor from '~/components/TextEditor'
import Assets from './Assets'

type Props = {
  html: string
  setHtml: Setter<string>
  css: string
  setCSS: Setter<string>
  js: string
  setJS: Setter<string>
  assets: string[]
  id: string
}
const DevEditor: Component<Props> = (props) => {

  const htmlCode = () => props.html
  const cssCode = () => props.css
  const jsCode = () => props.js

  type TabType = 'html' | 'css' | 'js' | 'assets'
  type TabInfo = { type: TabType; icon: JSX.Element; mode?: string; label: string }

  const TABS: TabInfo[] = [
    { type: 'html', icon: <VsCode />, mode: 'ace/mode/html', label: 'HTML' },
    { type: 'css', icon: <FaSolidPaintbrush />, mode: 'ace/mode/css', label: 'CSS' },
    { type: 'js', icon: <TbLogicBuffer />, mode: 'ace/mode/javascript', label: 'JavaScript' },
    { type: 'assets', icon: <AiFillFolderOpen />, label: 'Assets' },
  ]

  const [activeTab, setActiveTab] = createSignal<TabType>('html')

  const Tab: Component<TabInfo> = (props) => {
    const selected = () => activeTab() === props.type
    return (
      <div 
        onClick={() => setActiveTab(props.type)}
        class={`flex items-center justify-center space-x-2 rounded-lg border-2 border-secondary p-4 ${selected() ? 'border-accent bg-accent-secondary' : 'hover:border-accent hover:bg-accent-secondary'}`}
      >
        {props.icon}
        <p>{props.label}</p>
      </div>
    )
  }

  return (
    <div class="flex size-full max-w-[100vw] flex-col p-6">
      <div class="overflow-x-scroll pb-2">
        <div class="flex min-w-max space-x-4 px-4">
          <For each={TABS}>
            {(tab) => <Tab {...tab} />}
          </For>
        </div>
      </div>
      <div class="basis-11/12 p-0 lg:p-6">
        <Show when={activeTab() === 'html'}>
          <TextEditor code={htmlCode()} mode="ace/mode/html" onChange={props.setHtml} />
        </Show>
        <Show when={activeTab() === 'css'}>
          <TextEditor code={cssCode()} mode="ace/mode/css" onChange={props.setCSS} />
        </Show>
        <Show when={activeTab() === 'js'}>
          <TextEditor code={jsCode()} mode="ace/mode/javascript" onChange={props.setJS} />
        </Show>
        <Show when={activeTab() === 'assets'}>
          <Assets initial={props.assets} site_id={props.id} />
        </Show>
      </div>
    </div>
  )
}

export default DevEditor
