import { Component, createSignal, For, Setter, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { SiTopcoder } from 'solid-icons/si'
import { AiOutlineClose } from 'solid-icons/ai'
import { BiSolidSend } from 'solid-icons/bi'
import Modal from '~/components/Modal'

type Props = {
  onRefresh: () => void
  html: string
  css: string
  js: string
  setHtml: Setter<string>
  setCSS: Setter<string>
  setJS: Setter<string>
}
const ZiteChef: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(false)
  const [chat, setChat] = createSignal([])
  const [message, setMessage] = createSignal<string>('')
  const [thinking, setThinking] = createSignal<boolean>(false)

  const html = () => props.html
  const css = () => props.css
  const js = () => props.js

  const Chat: Component<{agent: 'user' | 'assistant', message: string}> = (chat) => {
    return <div class={`mt-1 flex h-fit w-full items-center ${chat.agent === 'user' && 'justify-end'}`}>
      <div class={`flex max-w-[70vw] items-center justify-center rounded-xl lg:max-w-[40vw] xl:max-w-[25vw] ${chat.agent === 'user' ? 'bg-accent text-black' : 'bg-tertiary'} p-4 lg:px-6`}>
        <p class="w-full break-words">{chat.message}</p>
      </div>
    </div>
  }

  return <>
    <div onClick={() => setOpen(true)} class="absolute bottom-10 right-10 z-40 flex size-[80px] items-center justify-center rounded-full bg-secondary text-accent">
      <SiTopcoder size={40} />
    </div>
    <Modal visible={open()}>
      <div class="flex h-5/6 w-full flex-col rounded-3xl bg-secondary md:w-3/4 lg:w-3/4 xl:w-1/2">
        <div class="flex basis-2/12">
          <div class="flex basis-11/12 items-center space-x-4 p-8">
            <SiTopcoder class="text-accent" size={40} />
            <div class="flex flex-col">
              <h1 class="text-xl">ZiteChef</h1>
              <p class="text-xs text-on-secondary">powered by Claude 3.5 Sonnet</p>
            </div>
          </div>
          <div class="flex basis-1/12 items-center">
            <div onClick={() => setOpen(false)} class="rounded-full p-2 hover:bg-on-secondary">
              <AiOutlineClose size={24} />
            </div>
          </div>
        </div>
        <div class="flex basis-11/12 flex-col overflow-y-hidden px-6" >
          <div class="h-full space-y-4 overflow-y-auto px-0 md:px-2 lg:px-6">
            <For
              fallback={<div class="flex size-full flex-col items-center justify-center px-10 text-on-secondary">
                <SiTopcoder size={150} />
                <p class="text-center">Tell zitechef what you want this site to look like. It will make the changes for you! You can then close this popup to view the changes & click on the zitechef icon again to continue this chat.</p>
              </div>} 
              each={chat()}
            >
              {(item) => {
                return <Chat agent={'assistant'} message={'hey there'} />
              }}
            </For>
            <Show when={thinking()}>
              <div class="mt-1 flex h-fit w-full items-center">
                <div class="flex max-w-[70vw] items-center justify-center rounded-xl bg-tertiary p-4 md:rounded-full lg:max-w-[40vw] xl:max-w-[25vw]">
                  <div class="flex flex-row gap-2">
                    <div class="size-2 animate-bounce rounded-full bg-accent" />
                    <div class="size-2 animate-bounce rounded-full bg-accent [animation-delay:-.3s]" />
                    <div class="size-2 animate-bounce rounded-full bg-accent [animation-delay:-.5s]" />
                  </div>
                </div>
              </div>
            </Show>
          </div>
        </div>
        <div class="flex basis-3/12 flex-col items-center px-4 pt-4 md:px-2 lg:px-0">
          <div class="flex h-5/6 w-full items-center justify-center space-x-4">
            <input
              type="text"
              class="h-4/6 w-5/6 rounded-full bg-tertiary px-6"
              placeholder="describe your ideas as a message"
              value={message()}
              onChange={ev => setMessage(ev.target.value)}
              onKeyUp={ev => {
                if (ev.key === 'Enter' && !ev.shiftKey) {
                  ev.preventDefault()
                }
              }}
            />
            <div class="flex size-[60px] items-center justify-center rounded-full bg-tertiary text-accent">
              <BiSolidSend size={30} />
            </div>
          </div>
          <A href="/api"><p class="pb-4 text-on-secondary">change anthropic account</p></A>
        </div>
      </div>
    </Modal>
  </>
}

export default ZiteChef
