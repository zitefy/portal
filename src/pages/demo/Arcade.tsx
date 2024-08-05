import { useNavigate } from '@solidjs/router'
import { Component, Suspense } from 'solid-js'
import { Loader } from '~/components/Loader'

const Demo: Component = () => {
  const navigate = useNavigate()

  return <div class="flex size-full items-center justify-center">
    <button onClick={() => navigate('/')} class="fixed left-10 top-10 rounded-full bg-accent px-5 py-2">{'< Back'}</button>
    <div class="flex size-5/6 items-center justify-center">
      <Suspense fallback={<Loader />}>
        <div style={{'position':'relative','padding-bottom':'calc(53.63247863247863% + 41px)','height':'0','width':'100%'}}>
          <iframe src="https://demo.arcade.software/9WurR7ejQZLsBNjHFrJa?embed&show_copy_link=true" title="zitefy.com"
            frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen
            allow="clipboard-write"
            style={{'position':'absolute','top':'0','left':'0','width':'100%','height':'100%','color-scheme':'light'}} />
        </div>
      </Suspense>
    </div>
  </div>
}

export default Demo
