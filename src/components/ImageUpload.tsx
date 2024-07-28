import { createSignal, useContext, Show, Suspense } from 'solid-js'
import { Component } from 'solid-js'
import { FiEdit } from 'solid-icons/fi'
import { AuthContext, AuthContextType } from '~/contexts/AuthContext'
import { BASE_URL} from '~/api/config'
import { uploadDP } from '~/api/auth'
import { Loader } from './Loader'

const ImageUpload: Component = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  let fileInputRef: HTMLInputElement | null = null

  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]
      setIsLoading(true)
      void uploadImage(file)
    }
  }

  const uploadImage = async (file: File) => {
    try {
      await uploadDP(file)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = () => {
    fileInputRef?.click()
  }

  return (
    <Show 
      when={!isLoading()}
      fallback={
        <div class="relative flex size-full items-center justify-center">
          <Loader />
        </div>
      }
    >
      <div class="relative size-full">
        <Suspense>
          <img 
            src={`${BASE_URL}/user/dp?username=${user()?.username}&t=${new Date().getTime()}`} 
            alt="dp" 
            class="size-full rounded-full bg-[url('https://picsum.photos/id/250/250?grayscale')]" 
          />
        </Suspense>
        <div class="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">
          <button
            class="flex items-center rounded-full px-4 py-2 text-white hover:bg-accent"
            onClick={handleEditClick}
          >
            <FiEdit size={20} class="mr-2" />
            Edit Image
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          ref={(el) => (fileInputRef = el)}
          onChange={handleImageUpload}
        />
      </div>
    </Show>
  )
}

export default ImageUpload
