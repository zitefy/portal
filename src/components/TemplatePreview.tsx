import { Component, createSignal, Suspense } from 'solid-js'
import { AiOutlineClose } from 'solid-icons/ai'
import { Template } from '~/types'
import Button from '~/components/Button'
import Modal from '~/components/Modal'
import { newSite } from '~/api/site'
import { useNavigate } from '@solidjs/router'
import { getTemplatePreview } from '~/api/template'
import { Loader, OverlayLoader } from './Loader'

const PreviewModal: Component<{ visible: boolean, template: Template | undefined, onClose: () => void }> = (props) => {

  const navigate = useNavigate()
  const [status, setStatus] = createSignal('')
  const [error, setError] = createSignal('')

  const buildSite = () => {
    setStatus('creating site...')
    newSite(props.template?._id.$oid || '')
      .then(id => {
        navigate(`/editor?id=${id}&name=${props.template?.name}`)
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      .catch(err => setError(err.message))
      .finally(() => {
        setStatus('')
        setError('')
      })
  }

  return <Modal visible={props.visible} lower >
    <OverlayLoader status={status()} error={error()} />
    <div class="flex h-5/6 w-[95vw] flex-col rounded-xl bg-secondary lg:w-3/4 " >
      <div class="flex basis-2/12 items-center justify-center">
        <div class="basis-1/12" />
        <div class="flex basis-10/12 flex-col items-center justify-center">
          <h2 class="text-xl">{props.template?.name}</h2>
          <p class="text-on-secondary">by @{props.template?.author}</p>
        </div>
        <div onClick={props.onClose} class="flex basis-1/12 items-center justify-center">
          <AiOutlineClose size={24} />
        </div>
      </div>
      <div class="flex basis-8/12 flex-col lg:flex-row" >
        <div class="flex basis-4/6 items-center justify-center p-8">
          <Suspense fallback={<Loader />}>
            <img
              class="h-[20h] rounded-lg lg:h-[50vh]"
              src={getTemplatePreview(props.template?._id.$oid || '', true)}
            />
          </Suspense>
        </div>
        <div class="flex basis-2/6 items-center justify-center px-36 py-8 lg:px-2">
          <Suspense fallback={<Loader />}>
            <img
              class="h-[25h] rounded-lg lg:h-[50vh]"
              src={getTemplatePreview(props.template?._id.$oid || '', false)}
            />
          </Suspense>
        </div>
      </div>
      <div class="flex basis-2/12 items-center justify-center">
        <div class="flex size-full items-center justify-center lg:w-3/4">
          <Button label="Use template" size="h-12" onClick={() => void buildSite()} />
        </div>
      </div>
    </div>
  </Modal>
}

export default PreviewModal
