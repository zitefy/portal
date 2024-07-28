import { Component, createSignal, useContext, For, createEffect } from 'solid-js'
import { useNavigate, useSearchParams } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import { AiOutlineLink } from 'solid-icons/ai'
import { FiLinkedin, FiPhone, FiTwitter, FiGithub, FiInstagram } from 'solid-icons/fi'
import { SOCIALS, PRONOUNS } from '~/api/base'
import { AuthContext, AuthContextType } from '~/contexts/AuthContext'
import { editUser } from '~/api/auth'
import { OverlayLoader } from '~/components/Loader'
import { type Link, type User } from '~/types'
import Header from '~/components/Header'
import DatePicker from '~/components/DatePicker'
import Selector from '~/components/Selector'
import ImageUpload from '~/components/ImageUpload'
import Button from '~/components/Button'
import Input from './components/Input'

type EditableUserFields = Pick<User, 'name' | 'dob' | 'pronouns' | 'bio' | 'phone'>

const Profile: Component = () => {
  const { refreshUser, user, logout } = useContext(AuthContext) as AuthContextType

  const [formData, setFormData] = createStore<EditableUserFields>({
    name: '',
    dob: '',
    pronouns: '',
    bio: '',
    phone: '',
  })

  const [socialLinks, setSocialLinks] = createSignal<Link[]>(SOCIALS)

  const [status, setStatus] = createSignal<string>('')
  const [error, setError] = createSignal<string>('')

  const [params] = useSearchParams()
  const navigate = useNavigate()

  const setters: Record<keyof EditableUserFields, (value: string) => void> = {
    name: (value: string) => setFormData('name', value),
    dob: (value: string) => setFormData('dob', value),
    pronouns: (value: string) => setFormData('pronouns', value),
    bio: (value: string) => setFormData('bio', value),
    phone: (value: string) => setFormData('phone', value),
  }

  createEffect(() => {
    const userData = user()
    if (userData) {
      for (const key of Object.keys(setters) as Array<keyof EditableUserFields>) {
        setters[key](userData[key] || '')
      }
    }
  })

  createEffect(() => {
    const links = user()?.links || []
    if (links) 
      setSocialLinks(SOCIALS.map(social => links.find(link => link.selector === social.selector) || social))
  })

  const handleSave = () => {
    setStatus('saving your data...')
    editUser({
      ...formData,
      links: socialLinks().filter(link => link.value != undefined),
    })
      .then(async() => {
        setStatus('saved! just a moment..')
        await refreshUser()
        if(params.redirect) navigate('/')
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      .catch(err => setError(err.message))
      .finally(() => {
        setStatus('')
        setTimeout(() => setError(''), 2000)
      })
  }

  const getSocialIcon = (selector: string) => {
    switch (selector) {
      case 'instagram': return <FiInstagram size={30} class="text-neutral-600" />
      case 'twitter': return <FiTwitter size={30} class="text-neutral-600" />
      case 'github': return <FiGithub size={30} class="text-neutral-600" />
      case 'linkedin': return <FiLinkedin size={30} class="text-neutral-600" />
      default: return <AiOutlineLink size={30} class="text-neutral-600" />
    }
  }

  return (
    <div class="size-full">
      <OverlayLoader status={status()} error={error()} />
      <Header
        right={
          <div onClick={logout} class="group flex size-full cursor-pointer items-center justify-end px-10">
            <p class="text-error group-hover:font-semibold">logout</p>
          </div>
        }
      >
        <div class="flex size-full flex-col">
          <div class="flex h-fit w-full flex-col lg:h-full lg:flex-row">
            <div class="flex basis-1/2 flex-col items-center justify-center space-y-4 px-4 py-8 lg:items-start lg:px-0 lg:pl-60">
              <div class="mb-4 size-[25vh] rounded-full">
                <ImageUpload />
              </div>
              <div class="flex flex-col items-center lg:items-start">
                <input
                  class="border-0 bg-primary text-center text-3xl text-on-primary focus:outline-none lg:text-left"
                  value={formData.name}
                  onInput={(e) => setters.name(e.currentTarget.value)}
                  placeholder="display name"
                />
                <h2 class="text-xl text-neutral-400">@{user()?.username}</h2>
                <h2 class="text-neutral-400">{user()?.email}</h2>
              </div>
              <div class="flex w-full items-center space-x-2 lg:w-1/2">
                <p class="text-neutral-500">DOB</p>
                <DatePicker value={formData.dob || ''} onChange={setters.dob} />
              </div>
              <div class="flex w-full lg:w-1/2">
                <Selector
                  data={PRONOUNS}
                  label="pronouns"
                  selected={{value: formData.pronouns || ''}}
                  onSelect={value => setters.pronouns(value.value)}
                />
              </div>
              <div class="mb-4 flex w-full justify-center lg:justify-start">
                <Button label="Save" onClick={handleSave} size={'h-12'} />
              </div>
            </div>
            <div class="flex basis-1/2 flex-col items-center justify-center space-y-4 px-4 lg:px-0">
              <textarea
                aria-multiline
                class="w-full rounded-xl border-2 border-secondary bg-primary p-4 lg:w-3/4"
                placeholder="more about you..."
                value={formData.bio}
                onInput={(e) => setters.bio(e.currentTarget.value)}
              />
              <div class="flex w-full flex-col items-center justify-center space-y-4 lg:w-3/4">
                <Input value={formData.phone || ''} onChange={setters.phone} label="phone number" icon={<FiPhone size={30} class="text-neutral-600" />} />
                <For each={socialLinks()}>
                  {(social, index) => (
                    <Input
                      label={social.selector}
                      icon={getSocialIcon(social.selector)}
                      value={social.value || ''}
                      onChange={(text) => {
                        const updatedLinks = [...socialLinks()]
                        updatedLinks[index()].value = text
                        setSocialLinks(updatedLinks)
                      }}
                    />
                  )}
                </For>
              </div>
            </div>
          </div>
          <div class="flex w-full flex-col items-center justify-center py-4">
            <p class="text-neutral-600"><u>source code</u></p>
            <p class="text-neutral-600">made with love for open source</p>
          </div>
        </div>
      </Header>
    </div>
  )
}

export default Profile
