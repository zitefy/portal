import { A } from '@solidjs/router'
import { Component } from 'solid-js'

const Footer: Component = () => {
  return <div class="absolute bottom-0 flex h-[60px] w-full items-center justify-center text-xs text-on-secondary">
    <p>built with 𖹭 for open-source at <A href="https://fossunited.org/fosshack/2024" >FOSS Hack 4.0</A></p>
  </div>
}

export default Footer
