import { lazy, Suspense, type Component } from 'solid-js'
import { Router, Route } from '@solidjs/router'

const Login = lazy(() => import('~/pages/auth/Login'))
const SignUp = lazy(() => import('~/pages/auth/SignUp'))
const Dashboard = lazy(() => import('~/pages/dashboard/Dashboard'))
const Profile = lazy(() => import('~/pages/profile/Profile'))

const App: Component = () => {
  return (
    <div class="h-screen w-screen">
      <Router root={props => <Suspense>{props.children}</Suspense>}>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
      </Router>
    </div>
  )
}

export default App
