import { Show, type Component } from 'solid-js'

type Props = {
  placeholder: string,
  error?: string,
  value: string,
  onChange: (text: string) => void
  password?: boolean
}
const Input: Component<Props> = (props) => {
  const value = () => props.value

  return <div class="flex h-20 w-full">
    <div class="flex basis-1/12" />
    <div class="flex basis-10/12 flex-col justify-center">
      <input
        class="h-5/6 w-full rounded-full border-2 border-secondary bg-primary px-6"
        placeholder={props.placeholder}
        value={value()}
        type={props.password ? 'password' : 'text'}
        onChange={ev => props.onChange(ev.target.value)}
      />
      <Show when={props.error}>
        <div class="w-full px-4">
          <p class="text-red-400">{props.error}</p>
        </div>
      </Show>
    </div>
    <div class="flex basis-1/12" />
  </div>
}

export default Input
