import { Component, createSignal, For } from 'solid-js'
import { BiRegularCopy } from 'solid-icons/bi'
import { FiDownload } from 'solid-icons/fi'
import { AiFillDelete, AiOutlineInfoCircle } from 'solid-icons/ai'
import Button from '~/components/Button'
import { OverlayLoader } from '~/components/Loader'

const Assets: Component<{ initial: string[], site_id: string }> = (props) => {
  const [assets, setAssets] = createSignal(props.initial)
  const [status, setStatus] = createSignal('')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  const downloadFile = (url: string, filename: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const Asset: Component<{ name: string }> = (assetProps) => {

    return (
      <div class="flex h-[60px] w-full rounded-lg bg-secondary">
        <OverlayLoader status={status()} />
        <div class="flex basis-1/12 items-center justify-center">
          <BiRegularCopy onClick={() => copyToClipboard('url')} class="cursor-pointer" />
        </div>
        <div class="flex basis-10/12 flex-col justify-center overflow-hidden">
          <p class="truncate lg:text-lg">{assetProps.name}</p>
          <p class="truncate text-xs text-on-secondary">{url}</p>
        </div>
        <div class="flex basis-2/12 items-center justify-center space-x-6">
          <FiDownload size={24} onClick={() => downloadFile(url, assetProps.name)} class="cursor-pointer" />
          <AiFillDelete size={24} class="cursor-pointer text-error" onClick={() => {
            // Implement delete functionality here
            const newAssets = assets().filter(asset => asset !== assetProps.name)
            setAssets(newAssets)
          }} />
        </div>
      </div>
    )
  }

  return (
    <div class="flex size-full flex-col items-center space-y-8 p-0 lg:space-y-4 lg:p-4">
      <div class="flex w-full items-center space-x-2">
        <AiOutlineInfoCircle size={20} class="text-on-secondary" />
        <p class="text-on-secondary">{assets().length > 0 ? 'copy & paste the link to your code directly' : 'add assets to use them in your site, basically like free public cdn'}</p>
      </div>
      <For each={assets()}>
        {(asset) => <Asset name={asset} />}
      </For>
      <Button label="Add asset" size="h-12" />
    </div>
  )
}

export default Assets
