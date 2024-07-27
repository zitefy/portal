import { Component, JSX, Show } from 'solid-js'

type Props = {
  children?: JSX.Element,
  visible: boolean,
  lower?: boolean
}
const Modal: Component<Props> = (props) => {
  const visible = () => props.visible
  return (
    <Show when={visible()}>
      <div class={`absolute left-0 top-0 ${props.lower ? 'z-40' : 'z-50'} flex h-screen w-screen`}>
        <div class="absolute left-0 top-0 size-full bg-black opacity-50" />

        <div class="z-50 m-auto flex size-full items-center justify-center rounded-lg p-6 shadow-lg">
          {props.children}
        </div>
      </div>
    </Show>
  )
}

export default Modal
