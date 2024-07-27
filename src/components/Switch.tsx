import { Component, JSX } from 'solid-js'

type Props = {
  onChange: (state: boolean) => void
  state: boolean
  onColor: string
  offColor: string
  icon?: JSX.Element
}
const Switch: Component<Props> = (props) => {

  const isOn = () => props.state

  const handleToggle = () => {
    if (props.onChange) {
      props.onChange(!isOn())
    }
  }

  return (
    <div 
      class={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${isOn() ? props.onColor : props.offColor}`} 
      onClick={handleToggle}
    >
      <span 
        class={`inline-block size-6 rounded-full bg-white transition-transform duration-300 ${isOn() ? 'translate-x-9' : 'translate-x-1'}`}
      >
        {props.icon}
      </span>
    </div>
  )
}

export default Switch
