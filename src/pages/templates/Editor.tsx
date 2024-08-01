import { Component, createSignal, createEffect, createResource, onMount, onCleanup, Show, useContext, lazy } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { VsCode } from 'solid-icons/vs'
import { AuthContext, AuthContextType } from '~/contexts/AuthContext'
import { activateSite, getCodePreview, getSource, renameSite, saveCode, setSiteData } from '~/api/site'
import { clearChatSession, clearSelections, getEditorPreference, setEditorPreference } from '~/api/cache'
import { Source, Link } from '~/types'
import { OverlayLoader } from '~/components/Loader'
import Button from '~/components/Button'
import Header from '~/components/Header'
import Switch from '~/components/Switch'
import Preview from './components/Preview'
import DevEditor from './components/DevEditor'
const NormalEditor = lazy(() => import('./components/NormalEditor'))
const ZiteChef = lazy(() => import('./components/ZiteChef'))

const Editor: Component = () => {

  const { user } = useContext(AuthContext) as AuthContextType

  const [isWide, setView] = createSignal(window.innerWidth > 1024)
  const [isLeftPane, showLeftPane] = createSignal(true)
  const [status, setStatus] = createSignal('')
  const [error, setError] = createSignal('')
  const [data, setData] = createSignal<Link[]>([])
  
  const [htmlCode, setHtmlCode] = createSignal('')
  const [cssCode, setCssCode] = createSignal('')
  const [jsCode, setJsCode] = createSignal('')
  const [assets, setAssets] = createSignal<string[]>([])

  const [mobilePreview, setMobilePreview] = createSignal('')
  const [desktopPreview, setDesktopPreview] = createSignal('')

  const [params] = useSearchParams()
  const [source] = createResource<Source>(params.id, getSource)
  const [name, setName] = createSignal(params.name)
  
  onMount(() => {
    window.addEventListener('resize', () => {
      setView(window.innerWidth > 1024)
    })
  })
  onCleanup(() => {
    window.removeEventListener('resize', () => {})
    clearSelections()
    clearChatSession()
  })

  createEffect(() => {
    if (source()) {
      setHtmlCode(source().html)
      setCssCode(source().css)
      setJsCode(source().js)
      setAssets(source().assets)
    }
  })

  const refreshPreview = async() => {
    // temporary fix for showing dp in preview because of https://github.com/zitefy/server/pull/9
    // this will be removed in the future.
    setStatus('encoding data...')
    const updatedData: Link[] = await Promise.all(data().map(async (item: Link) => {
      if (item.selector === 'image' && item.value) {
        // if it's the dp, then encode it to base64 for the preview
        try {
          const response = await fetch(item.value)
          const blob = await response.blob()
          return new Promise<Link>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                resolve({
                  ...item,
                  value: reader.result,
                })
              } else {
                console.error(`Failed to encode image: ${item.value}`)
                resolve(item)
              }
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
        } catch (err) {
          console.error(`Failed to encode image: ${item.value}`, err)
          return item
        }
      }
      return item
    }))
    setStatus('refreshing preview...')
    getCodePreview(htmlCode(), cssCode(), jsCode(), updatedData)
      .then(previews => {
        setMobilePreview(previews.mobile)
        setDesktopPreview(previews.desktop)
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      .catch(err => setError(err.message))
      .finally(() => {
        setStatus('')
        setError('')
      })
  }

  const save = async () => {
    setStatus('Saving changes...')
    setError('')

    const html = new File([htmlCode()], 'index.html', { type: 'text/html' })
    const css = new File([cssCode()], 'styles.css', { type: 'text/css' })
    const js = new File([jsCode()], 'script.js', { type: 'application/javascript' })

    try {
      await Promise.all([
        (async () => {
          setStatus('Saving code changes...')
          await saveCode(html, css, js, params.id || '')
          setStatus('Code changes saved successfully!')
        })(),
        (async () => {
          setStatus('Saving preferences...')
          await setSiteData(params.id || '', data() || [])
          setStatus('Preferences saved successfully!')
        })(),
      ])

      setStatus('All changes saved successfully!')
    } catch (error) {
      console.error('Error during save:', error)
      setError('There was an error saving your changes. Please try again.')
    } finally {
      setTimeout(() => {
        setStatus('')
        setError('')
      }, 1000)
    }

    // server only updates the currently active site if it's reactivated
    if(user()?.active?.$oid === params.id) void activateSite(params.id || '')
  }

  const rename = () => {
    renameSite(params.id, name())
      .then(newName => setName(newName))
      .catch(err => console.error(err))
  }

  onMount(() => {
    setStatus('just a moment')
    setTimeout(() => void refreshPreview(), 2000)
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
      onRefresh={() => void refreshPreview()}
    />
    <Header
      center={isWide() ? <div class="flex size-full flex-col items-center justify-center">
        <input
          type="text"
          value={name()}
          placeholder="Name this site for quick access"
          onChange={ev => setName(ev.target.value)}
          onBlur={rename}
          class="w-full border-0 bg-transparent text-center focus:outline-none"
        />
        <p class="text-xs text-on-secondary">all unsaved changes will be lost if you leave this page</p>
      </div> : undefined}
      right={<div class="flex size-full items-end justify-end px-6 lg:items-center">
        <Button onClick={() => void save()} size="h-12" label="Save" />
      </div>}
    >
      <div class="flex size-full flex-col" >
        <div class="flex basis-11/12" >
          <Show when={isWide() || isLeftPane()}>
            <Editor />
          </Show>
          <Show when={isWide() || !isLeftPane()}>
            <Preview onRefresh={() => void refreshPreview()} mobile={mobilePreview()} desktop={desktopPreview()} />
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
