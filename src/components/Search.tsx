import { Component, createSignal, Show } from 'solid-js'
import { AiOutlineSearch } from 'solid-icons/ai'
import { TiBackspaceOutline } from 'solid-icons/ti'

type Props = {
  onSearch: (value: string) => void
  label?: string
}

const Search: Component<Props> = (props) => {

  const [value, setValue] = createSignal('')

  return <div class="flex h-14 w-5/6 rounded-full bg-secondary lg:w-4/6">
    <div class="flex basis-2/12 items-center justify-center lg:basis-1/12">
      <AiOutlineSearch size={20} />
    </div>
    <div class="flex basis-10/12">
      <input
        class="w-full bg-transparent outline-none"
        placeholder={props.label || 'type to search'}
        value={value()}
        onInput={ev => setValue(ev.target.value)}
        onChange={ev => props.onSearch(ev.target.value)}
      />
    </div>
    <div class="flex basis-2/12 lg:basis-1/12">
      <Show when={value()}>
        <div onClick={() => {
          setValue('')
          props.onSearch('')
        }} class="flex size-full items-center justify-center">
          <TiBackspaceOutline size={20} />
        </div>
      </Show>
    </div>
  </div>
}

export default Search
