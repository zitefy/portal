import { Component, createSignal, For, createEffect, Show } from 'solid-js'
import { AiFillCheckCircle, AiOutlineInfoCircle } from 'solid-icons/ai'
import { Link } from '~/types'

const NormalEditor: Component<{ id?: string, onChange: (data: Link[]) => void }> = (props) => {

  const [selected, setSelected] = createSignal<string[]>([])
  const [links, setLinks] = createSignal<Link[]>([])

  createEffect(() => {
    const selectedLinks = links().filter(link => selected().includes(link.selector))
    props.onChange(selectedLinks)
  })

  const toggleSelection = (selector: string) => {
    setSelected(prev => 
      prev.includes(selector) ? prev.filter(s => s !== selector) : [...prev, selector],
    )
  }

  const secondaryLinks = () => links().filter(link => !['username', 'name', 'email', 'bio', 'pronouns', 'image'].includes(link.selector))

  const Option: Component<{ selector: string; value?: string; link?: string }> = (props) => {
    const isSelected = () => selected().includes(props.selector)
    return (
      <div
        onClick={() => toggleSelection(props.selector)}
        class={`group flex w-full rounded-lg ${isSelected() ? 'border-2 border-accent bg-accent-secondary' : 'hover:border-2 hover:border-accent hover:bg-accent-secondary'}`}
      >
        <div class="flex basis-5/6 flex-col px-4 py-3">
          <p class="text-xs text-on-secondary">{props.selector}</p>
          <p class={isSelected() ? 'text-accent' : 'group-hover:text-accent'}>{props.value || props.link}</p>
        </div>
        <div class="flex basis-1/6 items-center justify-center">
          <AiFillCheckCircle size={24} class={`${isSelected() ? 'block': 'hidden'} text-accent group-hover:block`} />
        </div>
      </div>
    )
  }

  const Image: Component = () => {
    const isSelected = () => selected().includes('image')

    return <div
      onClick={() => toggleSelection('image')} 
      class={`flex size-full items-center justify-center rounded-xl hover:border-2 hover:border-accent hover:bg-accent-secondary ${isSelected() && 'border-2 border-accent bg-accent-secondary'}`}
    >
      <img
        src={'https://picsum.photos/300/300'}
        class="size-[40vw] rounded-full md:size-[25vw] lg:size-[15vw]"
      />
    </div>
  }

  return (
    <div class="flex size-full flex-col">
      <div class="flex basis-1/2">
        <div class="flex basis-1/2 items-center justify-center p-8">
          <Image />
        </div>
        <div class="flex basis-1/2 flex-col justify-center space-y-2 p-4">
          <For each={links().filter(link => ['username', 'name', 'email', 'bio', 'pronouns'].includes(link.selector))}>
            {(item) => <Option selector={item.selector} value={item.value} />}
          </For>
        </div>
      </div>
      <div class="flex basis-1/2 flex-col">
        <Show when={secondaryLinks().length > 0}>
          <div class={`grid ${secondaryLinks().length < 3 ? 'basis-1/3' : secondaryLinks().length < 5 ? 'basis-2/3' : 'basis-full'} grid-cols-2 gap-4`}>
            <For each={secondaryLinks()}>
              {(item) => (
                <div class="flex w-full items-center justify-center p-6">
                  <Option selector={item.selector} value={item.value} link={item.link} />
                </div>
              )}
            </For>
          </div>
        </Show>
        <div class={`flex items-center justify-center space-x-2 ${ secondaryLinks().length < 2 ? 'basis-full' :secondaryLinks().length < 3 ? 'basis-2/3' : secondaryLinks().length < 5 ? 'basis-1/3' : 'hidden'}`}>
          <AiOutlineInfoCircle size={20} class="text-on-secondary" />
          <p class="text-on-secondary" >add more stuff in your profile to add them here</p>
        </div>
      </div>
    </div>
  )
}

export default NormalEditor