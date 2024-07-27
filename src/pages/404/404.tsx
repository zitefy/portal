import { useSearchParams } from '@solidjs/router'
import { Component } from 'solid-js'
import Content from './components/Content'

const NotFound: Component = () => {
  const [params] = useSearchParams()
  return <div class="size-full">
    <Content 
      message={`username @${params.username} is still available in zitefy!`} 
      action="Grab it now!"
      destination="/signup"
    />
  </div>
}

export default NotFound
