import { createSignal, type Component, For } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { OverlayLoader } from '~/components/Loader'
import Input from './components/Input'
import Header from './components/Header'
import Button from '~/components/Button'
import Footer from './components/Footer'

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

  return (
    <div class="flex size-full items-center justify-center">
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
        <Button label="Let's go" />
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
