import { Component } from 'solid-js'
import light from '~/assets/light.svg'
import dark from '~/assets/dark.svg'

type Props = {
  width?: number
  height?: number
}
const Logo: Component<Props> = (props) => {
  return <>
    <img
      src={light}
      class="dark:hidden"
      height={props.height || 150}
      width={props.width || 150}
    />
    <img
      src={dark}
      class="hidden dark:block"
      height={props.height || 150}
      width={props.width || 150}
    />
  </>
}


export default Logo
