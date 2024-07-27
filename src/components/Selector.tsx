import { Component, For } from 'solid-js'
import { HiOutlineChevronUpDown } from 'solid-icons/hi'

type Data = {
  label?: string
  value: string
}

type Props = {
  label?: string
  data: Data[]
  selected?: Data
  onSelect: (value: Data) => void
}
const Selector: Component<Props> = (props) => {

  const data = () => props.data
  const selected = () => props.selected

  return <div class="relative w-full">
    <select onChange={ev => {
      const selectedData = data().find(item => item.value === ev.target.value)
      if (selectedData) props.onSelect(selectedData)
    }}  class="w-full appearance-none rounded-md border border-secondary bg-primary px-4 py-2 text-on-primary focus:border-on-primary focus:outline-none">
      <option value="" disabled selected hidden>{selected()?.label || selected()?.value || props.label}</option>
      <For each={data()}>
        {(item) => (
          <option value={item.value}>{item.label || item.value}</option>
        )}
      </For>
    </select>
    <HiOutlineChevronUpDown
      size={24}
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600"
    />
  </div>
}

export default Selector
