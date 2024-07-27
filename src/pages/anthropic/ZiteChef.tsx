import { SiTopcoder } from 'solid-icons/si'
import { Component, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import Button from '~/components/Button'
import Header from '~/components/Header'
import { setAnthropicToken } from '~/api/storage'

const ZiteChef: Component = () => {
  const [key, setKey] = createSignal('')

  return <div class="size-full" >
    <Header>
      <div class="flex size-full flex-col items-center justify-center space-y-6">
        <div class="flex items-center justify-center rounded-full bg-secondary p-10 text-accent">
          <SiTopcoder size={150} />
        </div>
        <h1 class="text-3xl" >Anthropic API Key</h1>
        <input
          value={key()}
          onChange={ev => setKey(ev.target.value)}
          placeholder="your key, replaces all previous ones"
          class="w-5/6 rounded-full border-2 border-secondary bg-transparent px-6 py-4 lg:w-1/2"
        />
        <div class="flex w-3/4 items-center justify-center lg:w-1/2">
          <Button onClick={() => setAnthropicToken(key())} label="Save" />
        </div>
        <div class="w-3/4 px-1 2xl:px-80">
          <p class="text-center text-xs text-on-secondary">
            The default anthropic account for ZiteChef is on a limited plan, recharged by us.
            We humbly request you to use your API key and Anthropic account if possible.
            This helps us to cut costs and keep zitefy free for all long term.
          </p>
        </div>
        <A href="https://console.anthropic.com/settings/keys" target="_blank"><p class="text-accent">get a key here {'>'}</p></A>
      </div>
    </Header>
  </div>
}

export default ZiteChef
