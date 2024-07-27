import { Component } from 'solid-js'

type Props = {
  label: string,
  onClick: () => void
  size?: string
}

const Button: Component<Props> = (props) => {
  return <div onClick={props.onClick} class={`flex ${props.size ? props.size : 'h-16'} w-2/3 items-center justify-center rounded-full bg-accent md:w-1/3`}>
    <p class="text-xl font-semibold text-black">{props.label}</p>
  </div>
}

export default Button
