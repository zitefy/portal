import { Component, createContext, JSX, Accessor, createResource } from 'solid-js'
import { userData } from '~/api/auth'
import { clearStorage, getAccessToken } from '~/api/storage'
import { User } from '~/types'

export type AuthContextType = {
  user: Accessor<User | undefined>
  refreshUser: (info?: unknown) => User | Promise<User | undefined> | null | undefined,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>()

type Props = {
  children: JSX.Element
}
export const AuthProvider: Component<Props> = (props) => {
  
  const refresh = async() => {
    if(getAccessToken()) {
      try{
        const data = await userData()
        return data
      } catch(e) {
        if(e.message === 'logout') logout()
      }
    } else logout()
  }

  const [user, { refetch }] = createResource<User | undefined>(refresh)

  const logout = () => {
    clearStorage()
    window.location.replace('/login')
  }

  return <AuthContext.Provider value={{user, refreshUser: refetch, logout}}>
    {props.children}
  </AuthContext.Provider>
}
