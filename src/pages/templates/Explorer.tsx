import { Component, createSignal, For, Show } from 'solid-js'
import { Template } from '~/types'
import { Loader } from '~/components/Loader'
import Header from '~/components/Header'
import Search from '~/components/Search'
import PreviewModal from '~/components/TemplatePreview'

const FILTERS = ['Latest', 'a-b', 'Trending']

const Filters: Component = () => {
  const [selected, setSelected] = createSignal('')
  return <div class="flex h-20 items-center space-x-4 px-6 lg:px-10">
    <p>Sort by:</p>
    <For each={FILTERS}>
      {(item) => (
        <div
          onClick={() => setSelected(selected() === item ? '' : item)}
          class={`flex items-center justify-center rounded-full border-2 border-secondary px-4 py-2 ${selected() == item ? 'bg-accent' : 'hover:bg-secondary'}`}
        >
          <p class={`text-xs min-[400px]:text-sm ${selected() === item ? 'text-primary' : 'text-on-primary'}`} >{item}</p>
        </div>
      )}
    </For>
  </div>
}

export const TemplateCard: Component<{ template: Template, onClick: (id: Template) => void }> = (props) => {
  return <div onClick={() => props.onClick(props.template)} class="flex h-[330px] w-[344px] flex-col rounded-3xl bg-secondary">
    <div class="flex basis-3/4 items-end justify-center" >
      <div class="size-5/6 rounded-lg border-0" >
        <img
          class="h-[200px] rounded-lg"
          src={}
        />
      </div>
    </div>
    <div class="flex basis-1/4 flex-col justify-center px-8">
      <p class="text-lg">{props.template.name}</p>
      <p class="text-sm text-on-secondary">by @{props.template.author}</p>
    </div>
  </div>
}

const Explorer: Component = () => {
  const [templates] = createSignal([])
  const [popUp, setPopUp] = createSignal<Template>()

  return <div class="size-full">
    <PreviewModal
      visible={popUp() ? true : false}
      template={popUp()}
      onClose={() => setPopUp()}
    />
    <Header
      center={<Search onSearch={value => console.log(`Searched for ${value}`)} />}
    >
      <Show
        when={true}
        fallback={<div class="flex size-full items-center justify-center"><Loader /></div>}
      >
        <>
          <Filters />
          <div class="grid h-fit w-full grid-cols-[repeat(auto-fill,_minmax(344px,_1fr))] gap-4 p-4 pb-10">
            <For each={templates()} >
              {(item) => {
                return <TemplateCard template={item} onClick={template => setPopUp(template)} />
              }}
            </For>
          </div>
        </>
      </Show>
    </Header>
  </div>
}

export default Explorer
