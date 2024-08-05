import { useNavigate } from '@solidjs/router'
import { VoidComponent } from 'solid-js'
import Button from '~/components/Button'

const Demo: VoidComponent = () => {
  const navigate = useNavigate()

  return <div class="fixed right-10 top-10 flex w-[200px] items-end justify-end sm:w-[500px]">
    <Button onClick={() => navigate('/demo')} size="h-14" label="demo >" />
  </div>
}

export default Demo
