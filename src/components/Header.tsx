import { Component, JSX, Show } from 'solid-js'
import { AiOutlineGithub } from 'solid-icons/ai'
import { A, useNavigate } from '@solidjs/router'
import Logo from './Logo'

const Image: Component = () => {
  const navigate = useNavigate()
  return <div class="flex basis-1/2 items-end justify-end space-x-3 px-10 lg:basis-1/5 lg:items-center lg:px-8" >
    <A href="https://github.com/zitefy" target="_blank">
      <div class="group rounded-full p-2 hover:bg-on-primary">
        <AiOutlineGithub class="group-hover:text-primary" size={30} />
      </div>
    </A>
    <img
      onClick={() => navigate('/profile')}
      class="size-[50px] cursor-pointer rounded-full bg-[url('https://picsum.photos/id/250/50?grayscale')]"
      src={'https://picsum.photos/300/300'}
    />
  </div>
}

type Props = {
  center?: JSX.Element,
  right?: JSX.Element,
  children: JSX.Element
}
const Header: Component<Props> = (props) => {
  return <>
    <div class={`${props.center ? 'h-[20vh] lg:h-[10vh]' : 'h-[10vh]'} sticky top-0 z-10 flex w-screen flex-wrap bg-primary lg:flex-nowrap`}>
      <div class="flex basis-1/2 space-x-4 px-8 lg:basis-1/5">
        <div class="flex items-end justify-center lg:items-center">
          <Logo width={40} height={40} />
        </div>
        <div class="flex flex-col justify-end lg:justify-center">
          <h2 class="text-2xl">zitefy</h2>
          <p class="text-xs text-neutral-500">v0.1 beta</p>
        </div>
      </div>
      <div class="order-3 flex basis-full items-center justify-center lg:order-none lg:basis-3/5">{props.center}</div>
      <Show 
        when={props.right}
        fallback={<Image />}
      >
        <div class="flex basis-1/2 lg:basis-1/5">{props.right}</div>
      </Show>
    </div>
    <div class={`size-full ${props.center ? 'pt-[20vh] lg:pt-[10vh]' : 'pt-[10vh]'} absolute top-0`}>
      {props.children}
    </div>
  </>
}

export default Header
