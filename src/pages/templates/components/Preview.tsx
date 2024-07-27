import { Component, createSignal, JSX, Show, Suspense } from 'solid-js'
import { IoRefreshOutline } from 'solid-icons/io'
import { AiOutlineSwap, AiOutlineInfoCircle } from 'solid-icons/ai'
import { Loader } from '~/components/Loader'

const Preview: Component<{onRefresh: () => void, mobile?: string, desktop?: string}> = (props) => {
  const [isWide, toggleWide] = createSignal<boolean>(false)

  const Button: Component<{icon?: JSX.Element, onClick: () => void, label: string}> = (button) => {
    return (
      <div onClick={button.onClick} class="flex space-x-1 rounded-lg px-6 py-2 text-on-secondary hover:bg-secondary">
        {button.icon}
        <p>{button.label}</p>
      </div>
    )
  }

  return (
    <div class="flex basis-full flex-col lg:basis-1/2">
      <div class="flex basis-1/12 items-center justify-center space-x-1">
        <Button onClick={props.onRefresh} label="Refresh" icon={<IoRefreshOutline size={20} />} />
        <Button onClick={() => toggleWide(!isWide())} label="Toggle" icon={<AiOutlineSwap size={20} />} />
      </div>
      <div class="flex w-full items-center justify-center space-x-2">
        <AiOutlineInfoCircle size={20} class="text-on-secondary" />
        <p class="text-on-secondary">hit refresh to see your changes without reloading</p>
      </div>
      <div class="flex basis-11/12 items-center justify-center p-8">
        <Show
          when={isWide()}
          fallback={
            <Suspense fallback={<Loader />}>
              <div class="relative aspect-[412/915] w-5/6 max-w-md overflow-hidden rounded-lg lg:w-2/6">
                <img
                  class="absolute inset-0 size-full object-cover"
                  src={'https://picsum.photos/300/300'}
                  alt="Mobile preview"
                />
              </div>
            </Suspense>
          }
        >
          <Suspense fallback={<Loader />}>
            <div class="relative aspect-[8/5] w-full max-w-4xl overflow-hidden rounded-lg">
              <img
                class="absolute inset-0 size-full object-cover"
                src={'https://picsum.photos/300/300'}
                alt="Desktop preview"
              />
            </div>
          </Suspense>
        </Show>
      </div>
    </div>
  )
}

export default Preview
