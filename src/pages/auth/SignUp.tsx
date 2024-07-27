import { createSignal, type Component, For } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { OverlayLoader } from '~/components/Loader'
import Input from './components/Input'
import Header from './components/Header'
import Button from '~/components/Button'
import Footer from './components/Footer'

type SignUpField = {
  name: 'username' | 'email' | 'password';
  placeholder: string;
}

type SignUpForm = {
  [K in SignUpField['name']]: string;
}

const SignUp: Component = () => {
  const navigate = useNavigate()

  const fields: SignUpField[] = [
    { name: 'username', placeholder: 'choose a username?' },
    { name: 'email', placeholder: "what's your email?" },
    { name: 'password', placeholder: "what'll be your password?" },
  ]

  const [form, setForm] = createSignal<SignUpForm>({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = createSignal<Partial<SignUpForm>>({})
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
              onChange={(text) => setForm({ ...form(), [field.name]: text })}
            />
          )}
        </For>
        <Button label="Register" />
        <p onClick={() => navigate('/login')} class="cursor-pointer text-lg text-accent hover:font-bold">
          login instead
        </p>
        <Footer />
      </div>
    </div>
  )
}

export default SignUp
