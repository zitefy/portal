import { Component } from 'solid-js'
import { FiCalendar } from 'solid-icons/fi'

type Props = {
  value: string,
  onChange: (selected: string) => void
}
const DatePicker: Component<Props> = (props) => {
  const value = () => props.value

  return <div class="relative w-full">
    <input
      type="date"
      value={value()}
      max={new Date().toISOString().split('T')[0]}
      onChange={ev => props.onChange(ev.target.value)}
      class="w-full appearance-none rounded-xl border border-secondary bg-primary px-4 py-2 text-on-primary focus:border-primary focus:outline-none"
    />
    <FiCalendar
      size={24}
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600"
    />
  </div>
}

export default DatePicker
