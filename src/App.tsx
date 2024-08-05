import { lazy, Suspense, type Component } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import { AuthProvider } from './contexts/AuthContext'

const Login = lazy(() => import('~/pages/auth/Login'))
const SignUp = lazy(() => import('~/pages/auth/SignUp'))
const Dashboard = lazy(() => import('~/pages/dashboard/Dashboard'))
const Profile = lazy(() => import('~/pages/profile/Profile'))
const Explorer = lazy(() => import('~/pages/templates/Explorer'))
const Editor = lazy(() => import('~/pages/templates/Editor'))
const ZiteChef = lazy(() => import('~/pages/anthropic/ZiteChef'))
const UserTaken = lazy(() => import('~/pages/404/Taken'))
const NotFound = lazy(() => import('~/pages/404/404'))
const Demo = lazy(() => import('~/pages/demo/Arcade'))

const App: Component = () => {
  return (
    <AuthProvider>
      <div class="h-screen w-screen">
        <Router root={props => <Suspense>{props.children}</Suspense>}>
          <Route path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route path="/explore" component={Explorer} />
          <Route path="/editor" component={Editor} />
          <Route path="/api" component={ZiteChef} />
          <Route path="/demo" component={Demo} />
          <Route path="/404" component={NotFound} />
          <Route path="/:username" component={UserTaken} />
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
