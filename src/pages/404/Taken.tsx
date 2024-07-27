import { useParams } from '@solidjs/router'
import { Component } from 'solid-js'
import Content from './components/Content'

const UserTaken: Component = () => {
  const { username } = useParams()
  return <div class="size-full">
    <Content 
      message={`Either @${username} doesn't have an active zite or the username hasn't been taken yet. If you are them, consider activating a site by clicking on the dot in the card.`} 
      action="Go to dashboard >"
      destination="/"
    />
  </div>
}

export default UserTaken
