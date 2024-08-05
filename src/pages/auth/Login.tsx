import { createSignal, type Component, For } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { login } from '~/api/auth'
import { OverlayLoader } from '~/components/Loader'
import Input from './components/Input'
import Header from './components/Header'
import Button from '~/components/Button'
import Footer from './components/Footer'
import Demo from './components/Demo'

type LoginField = {
  name: 'identifier' | 'password';
  placeholder: string;
}

type LoginForm = {
  [K in LoginField['name']]: string;
}

const Login: Component = () => {
  const navigate = useNavigate()
  
  const fields: LoginField[] = [
    { name: 'identifier', placeholder: 'email/username' },
    { name: 'password', placeholder: 'password?' },
  ]

  const [form, setForm] = createSignal<LoginForm>({
    identifier: '',
    password: '',
  })
  const [errors, setErrors] = createSignal<Partial<LoginForm>>({})
  const [status, setStatus] = createSignal('')
  const [error, setError] = createSignal('')

  const validateForm = () => {
    const newErrors: Partial<LoginForm> = {}
    fields.forEach(field => {
      if (!form()[field.name]) {
        newErrors[field.name] = `please enter a valid ${field.name}`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const logIn = () => {
    if (validateForm()) {
      setStatus('logging you in..')
      login(form().identifier, form().password)
        .then(() => window.location.replace('/'))
        .catch(err => {
          setStatus('')
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          setError(err.message)
          setTimeout(() => setError(''), 2000)
        })
    }
  }

  return (
    <div class="flex size-full items-center justify-center">
      <Demo />
      <OverlayLoader status={status()} error={error()} />
      <div class="flex size-full flex-col items-center justify-center space-y-4 px-4 md:w-1/3 md:px-0 lg:space-y-2">
        <Header />
        <For each={fields}>
          {(field) => (
            <Input
              placeholder={field.placeholder}
              value={form()[field.name]}
              error={errors()[field.name]}
              password={field.name === 'password'}
              onChange={(text) => setForm({...form(), [field.name]: text})}
            />
          )}
        </For>
        <Button onClick={logIn} label="Let's go" />
        <p
          class="cursor-pointer text-lg text-accent hover:font-bold"
          onClick={() => navigate('/signup')}
        >
          register instead
        </p>
        <Footer />
      </div>
    </div>
  )
}

export default Login
