import { Component, Show } from 'solid-js'
import { AiFillWarning } from 'solid-icons/ai'
import Modal from './Modal'

export const Loader: Component = () => {
  return         <svg class="size-20 animate-spin stroke-accent" viewBox="0 0 256 256">
    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" />
    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="24" />
    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" />
    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="24" />
    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" />
    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="24" />
    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" />
    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" />
  </svg>
}

type Props = {
  status?: string
  error?: string
}
export const OverlayLoader: Component<Props> = (props) => {

  const status = () => props.status || ''
  const error = () => props.error || ''

  return <Modal visible={status() || error() ? true : false} >
    <div aria-label={status()} role="status" class="flex flex-col items-center space-y-2">
      <Show when={status()} fallback={
        <>
          <AiFillWarning class="text-error" size={150} />
          <span class="text-2xl font-medium text-error">{error()}</span>
        </>
      }>
        <Loader />
      </Show>
      <span class="text-2xl font-medium text-accent">{status()}</span>
    </div>
  </Modal>
}
