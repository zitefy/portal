import { useNavigate } from '@solidjs/router'
import { Component, createSignal, For, Suspense, Show } from 'solid-js'
import { Motion } from '@motionone/solid'
import { BiRegularCopy } from 'solid-icons/bi'
import Header from '~/components/Header'
import { TemplateCard } from '../templates/Explorer'
import { Site, Template } from '~/types'
import { Loader, OverlayLoader } from '~/components/Loader'
import PreviewModal from '~/components/TemplatePreview'

const DashBoard: Component = () => {
  const navigate = useNavigate()

  const [userSites] = createSignal([])
  const [sites, setSites] = createSignal<Site[]>([])
  const [template, setTemplate] = createSignal<Template>()
  const [active, setActive] = createSignal('test')
  const [link, setLink] = createSignal('zitefy.com/username')
  const [status, setStatus] = createSignal('')
  const [error, setError] = createSignal('')

  const Card: Component<{ site: Site }> = (props) => {
    const site = () => props.site
    
    return <div class="flex h-[350px] w-[45vw] flex-col rounded-3xl bg-secondary lg:size-[280px]">
      <div onClick={() => navigate(`/editor?id=${site()._id?.$oid}&name=${site().metadata.name}`)} class="flex basis-10/12 items-center justify-center lg:basis-9/12 lg:items-end">
        <div class="flex h-5/6 w-9/12 items-center justify-center rounded-2xl lg:w-10/12">
          <Suspense fallback={<div class="skeleton-loader size-full" />}>
            <img
              class="hidden size-11/12 rounded-2xl lg:block"
              src={'https://picsum.photos/300/300'}
            />
            <img
              class="h-[250px] w-[40vw] rounded-2xl sm:w-[30vw] md:w-[20vw] lg:hidden"
              src={'https://picsum.photos/300/300'}
            />
          </Suspense>
        </div>
      </div>
      <div class="flex basis-1/12 px-4 pt-1 lg:px-8">
        <div onClick={() => navigate(`/editor?id=${site()._id?.$oid}`)} class="flex basis-10/12 flex-col truncate">
          <p class={`text-lg ${active() === site()._id?.$oid && 'text-accent'}`} >{site().metadata.name}</p>
          <p class="text-sm text-on-secondary" >
            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(site().metadata.time))}
          </p>
        </div>
        <div class="flex basis-2/12 items-center justify-center">
          <div  
            class={`size-[20px] rounded-full border-2 ${active() === site()._id?.$oid ? 'border-accent bg-accent' : 'border-on-secondary'}`} 
          />
        </div>
      </div>
    </div>
  }

  const CardStack: Component = () => {
    const [activeIndex, setActiveIndex] = createSignal(-1)
    const [templates] = createSignal([])

    return (
      <div class="relative flex size-[400px] items-center justify-center">
        <Suspense fallback={<Loader />} >
          <For each={templates()}>
            {(item, index) => (
              <Motion.div
                class="absolute left-0 top-0 cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  transform: `
                  translateX(${index() * 60}px)
                  translateY(${index() * 60}px)
                  rotate(${-5 + index() * 4}deg)
                  scale(${activeIndex() === index() ? 1.1 : 1})
                `,
                  'z-index': activeIndex() === index() ? 10 : 2 - index(),
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                <TemplateCard template={item} onClick={() => setTemplate(item)} />
              </Motion.div>
            )}
          </For>
        </Suspense>
      </div>
    )
  }

  return <div class="size-full overflow-hidden" >
    <PreviewModal visible={template() ? true : false} template={template()} onClose={() => setTemplate()}  />
    <OverlayLoader status={status()} error={error()} />
    <Header
      center={<div class="flex size-full flex-col items-center justify-center">
        <div class="flex cursor-pointer items-center space-x-2">
          <BiRegularCopy class="text-accent" />
          <p class="text-accent">{link()}</p>
        </div>
        <p class="text-xs text-on-secondary">is your zite link</p>
      </div>}
    >
      <div class="flex size-full" >
        <Show when={sites().length > 0} >
          <div class="flex basis-full items-center justify-center overflow-y-auto py-10 lg:basis-1/2">
            <div class="size-full lg:pl-8">
              <p class="ml-4 text-on-secondary lg:ml-0">your sites, click on dot to activate</p>
              <div class="grid grid-cols-2 gap-6 p-4">
                <For each={sites()}>
                  {(item) => <Card site={item} />}
                </For>
              </div>
              <div class="h-[10vh] w-full" />
            </div>
          </div>
        </Show>
        <div 
          class={sites().length > 0 ? 'hidden basis-5/6 items-center lg:flex lg:basis-1/2 2xl:basis-5/6' : 'flex basis-full items-center'} 
        >
          <div class="flex size-11/12 flex-col items-center justify-center space-y-16 border-l-2 border-secondary" >
            <p class="text-on-secondary">make a new site with the latest templates...</p>
            <CardStack />
            <div onClick={() => navigate('/explore')} class="group rounded-full px-6 py-4 hover:bg-accent">
              <p class="text-accent group-hover:text-black" >Browse more {'>'}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 z-20 flex h-[10vh] w-full flex-col items-center justify-center bg-primary text-xs text-on-secondary" >
        <Show when={sites().length > 0}>
          <p>your zite will be available in your link only if it's activated.</p>
        </Show>
        <p>made with ♡ for open source</p>
      </div>
    </Header>
  </div>
}

export default DashBoard
