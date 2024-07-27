import { Component, createSignal, createEffect, onCleanup } from 'solid-js'
import Logo from '~/components/Logo'

const Header: Component = () => {
  const phrases = [
    'grab your spot on the web',
    'with your very own unique site',
    'start from a default template',
    'make it yours by changing all the code',
    'or simply ask ai zitechef to cook for you!',
    "world's first ai-powered link-in-bio tool",
    'fully open-source, no secrets',
  ]

  const [currentPhrase, setCurrentPhrase] = createSignal('')
  const [phraseIndex, setPhraseIndex] = createSignal(0)

  const typePhrase = async (phrase: string) => {
    for (let i = 0; i <= phrase.length; i++) {
      setCurrentPhrase(phrase.slice(0, i))
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  const erasePhrase = async () => {
    const phrase = currentPhrase()
    for (let i = phrase.length; i >= 0; i--) {
      setCurrentPhrase(phrase.slice(0, i))
      await new Promise(resolve => setTimeout(resolve, 30))
    }
  }

  const cyclePhrase = async () => {
    const phrase = phrases[phraseIndex()]
    await typePhrase(phrase)
    await new Promise(resolve => setTimeout(resolve, 2000))
    await erasePhrase()
    setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
  }

  createEffect(() => {
    let isCancelled = false
    
    const animationLoop = async () => {
      while (!isCancelled) {
        await cyclePhrase()
      }
    }

    void animationLoop()

    onCleanup(() => {
      isCancelled = true
    })
  })

  return (
    <>
      <Logo />
      <h1 class="mb-4 text-6xl">zitefy</h1>
      <div class="h-8">
        <h4 class="text-xl">
          {currentPhrase()}
          <span class="animate-blink">|</span>
        </h4>
      </div>
    </>
  )
}

export default Header
