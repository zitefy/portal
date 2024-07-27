import { Component, createSignal, onMount, onCleanup, Show, lazy } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { VsCode } from 'solid-icons/vs'
import { Link } from '~/types'
import { OverlayLoader } from '~/components/Loader'
import { setEditorPreference, getEditorPreference } from '~/api/cache'
import Button from '~/components/Button'
import Header from '~/components/Header'
import Switch from '~/components/Switch'
import Preview from './components/Preview'
import DevEditor from './components/DevEditor'
const NormalEditor = lazy(() => import('./components/NormalEditor'))
const ZiteChef = lazy(() => import('./components/ZiteChef'))

const Editor: Component = () => {

  const [isWide, setView] = createSignal(window.innerWidth > 1024)
  const [isLeftPane, showLeftPane] = createSignal(true)
  const [status, setStatus] = createSignal('')
  const [error, setError] = createSignal('')
  const [data, setData] = createSignal<Link[]>()
  
  const [htmlCode, setHtmlCode] = createSignal('')
  const [cssCode, setCssCode] = createSignal('')
  const [jsCode, setJsCode] = createSignal('')
  const [assets, setAssets] = createSignal<string[]>([])

  const [mobilePreview, setMobilePreview] = createSignal('')
  const [desktopPreview, setDesktopPreview] = createSignal('')

  const [params] = useSearchParams()
  const [name, setName] = createSignal(params.name)
  
  onMount(() => {
    window.addEventListener('resize', () => {
      setView(window.innerWidth > 1024)
    })
  })
  onCleanup(() => {
    window.removeEventListener('resize', () => {})
  })

  const Editor: Component = () => {
    const [isDevMode, setDevMode] = createSignal(false)

    onMount(() => {
      if(getEditorPreference()) setDevMode(true)
    })
    return <div class="flex basis-full flex-col lg:basis-1/2" >
      <div class="flex basis-1/12">
        <div class="flex basis-10/12 flex-col justify-center px-8">
          <p class="text-lg">{isDevMode() ? 'Developer mode' : 'Normal mode'}</p>
          <p class="text-xs text-on-secondary">{isDevMode() ? 'follow the template guide on github to edit' : 'select all that you want to be in this site'}</p>
        </div>
        <div class="flex basis-2/12 items-center justify-end px-6">
          <Switch 
            onChange={() => {
              setDevMode(!isDevMode())
              setEditorPreference(isDevMode())
            }}
            state={isDevMode()}
            onColor="bg-accent"
            offColor="bg-on-secondary"
            icon={<div class="flex size-full items-center justify-center"><VsCode size={20} class="text-on-secondary" /></div>}
          />
        </div>
      </div>
      <div class="basis-11/12" >
        <Show 
          when={isDevMode()}
          fallback={<NormalEditor 
            id={params.id} onChange={data => setData(data)} 
          />}
        >
          <DevEditor
            assets={assets()} id={params.id || ''}
            html={htmlCode()} css={cssCode()} js={jsCode()}
            setHtml={setHtmlCode} setCSS={setCssCode} setJS={setJsCode} 
          />
        </Show>
      </div>
    </div>
  }

  return <div class="size-full">
    <OverlayLoader status={status()} error={error()} />
    <ZiteChef 
      html={htmlCode()} setHtml={setHtmlCode}
      css={cssCode()} setCSS={setCssCode}
      js={jsCode()} setJS={setJsCode}
    />
    <Header
      center={isWide() ? <div class="flex size-full flex-col items-center justify-center">
        <input
          type="text"
          value={name()}
          placeholder="Name this site for quick access"
          onChange={ev => setName(ev.target.value)}
          class="w-full border-0 bg-transparent text-center focus:outline-none"
        />
        <p class="text-xs text-on-secondary">all unsaved changes will be lost if you leave this page</p>
      </div> : undefined}
      right={<div class="flex size-full items-end justify-end px-6 lg:items-center">
        <Button onClick={() => {}} size="h-12" label="Save" />
      </div>}
    >
      <div class="flex size-full flex-col" >
        <div class="flex basis-11/12" >
          <Show when={isWide() || isLeftPane()}>
            <Editor />
          </Show>
          <Show when={isWide() || !isLeftPane()}>
            <Preview mobile={mobilePreview()} desktop={desktopPreview()} />
          </Show>
        </div>
        <div class="basis-1/12">
          <div class="flex size-full items-center justify-center">
            <p class="text-neutral-600">made with love for open source</p>
          </div>
          <div class="absolute bottom-20 left-0 z-20 flex w-full items-center justify-center lg:hidden">
            <Button onClick={() => showLeftPane(!isLeftPane())} size="h-10" label={isLeftPane() ? 'Preview site' : 'Show editor'} />
          </div>
        </div>
      </div>
    </Header>
  </div>
}

export default Editor
