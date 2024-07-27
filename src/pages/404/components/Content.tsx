import { Component } from 'solid-js'
import { useNavigate, A } from '@solidjs/router'
import Button from '~/components/Button'
import Logo from '~/components/Logo'

const Content: Component<{message: string, action: string, destination: string}> = (props) => {
  const navigate = useNavigate()

  return <div class="flex size-full flex-col items-center justify-center space-y-2" >
    <div class="basis-1/12" />
    <div class="flex basis-10/12 flex-col items-center justify-center">
      <div class="flex items-end py-4">
        <Logo width={100} height={100} />
        <h1 class="text-9xl text-[#a48989]">itefy</h1>
      </div>
      <p class="text-xl text-accent">the link-in-bio tool for 2024</p>
      <div class="flex w-full flex-col items-center space-y-10 px-4 pt-10 text-center lg:w-full">
        <h2 class="text-xl">{props.message}</h2>
        <Button onClick={() => navigate(props.destination)} label={props.action} />
      </div>
    </div>
    <div class="flex w-full basis-1/12 flex-col items-center justify-center text-xs text-on-secondary">
      <p>made with ♡ for open source at <A href="https://fossunited.org/fosshack/2024">FOSS Hack 4.0</A></p>
      <A href="https://github.com/zitefy"><p><u>source code</u></p></A>
    </div>
  </div>
}

export default Content
