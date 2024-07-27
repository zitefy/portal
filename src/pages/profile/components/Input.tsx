import { JSX, type Component } from 'solid-js'

type Props = {
  icon: JSX.Element,
  label: string,
  value: string,
  onChange: (text: string) => void
  type?: 'text' | 'tel' | 'email' | 'url'
}
const Input: Component<Props> = (props) => {
  const value = () => props.value
  
  return <div class="flex w-full items-center rounded-xl border-2 border-secondary px-4 py-1 has-[:focus]:border has-[:focus]:border-white">
    {props.icon}
    <input
      class="size-full bg-primary p-4 focus:outline-0"
      value={value()}
      onChange={ev => props.onChange(ev.target.value)}
      type={props.type || 'text'}
      placeholder={props.label}
    />
  </div>
}

export default Input

