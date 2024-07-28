import { AuthReponse, User, UserData } from '~/types'
import { makeRequest, makeAuthRequest, Request } from '.'
import { setAccessToken } from './storage'
import { BASE_URL } from './config'

export const login = async(identifier: string, password: string): Promise<string> => {
  const request: Request = {
    url: '/user/login',
    method: 'POST',
    data: {
      identifier,
      password,
    },
  }

  const token = await makeRequest<AuthReponse>(request)
  setAccessToken(token.token)
  return token.token
}

export const signup = async(email: string, username: string, passwd: string) => {
  const request: Request = {
    url: '/user/signup',
    method: 'POST',
    data: {
      email,
      username,
      password: passwd,
    },
  }
  
  const token = await makeRequest<AuthReponse>(request)
  setAccessToken(token.token)
  return token.token
}

export const userData = async() => {
  const request: Request = {
    url: '/user/data',
    method: 'GET',
  }

  return await makeAuthRequest<User>(request)
}

export const editUser = async(data: UserData) => {
  const request: Request = {
    url: '/user/edit',
    method: 'PUT',
    data,
  }
  return await makeAuthRequest<string>(request, true)
}

export const uploadDP = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  
  const request: Request = {
    url: '/user/upload_dp',
    method: 'PUT',
    multipart: formData,
  }
  return await makeAuthRequest<string>(request, true)
}

export const getDP = (username: string | undefined): string => {
  return `${BASE_URL}/user/dp?username=${username}&t=${new Date().getTime()}`
}

// // For a GET request with URL params
// const getRequest: Request = {
//   url: 'users',
//   method: 'GET',
//   params: { page: '1', limit: '10' },
// }
  
// // For a POST request with JSON payload
// const postRequest: AuthRequest = {
//   url: 'posts',
//   method: 'POST',
//   isAuth: true,
//   data: { title: 'New Post', content: 'This is a new post.' },
// }
  
// // For a PUT request with multipart form data
// const formData = new FormData()
// formData.append('file', fileBlob, 'filename.jpg')
// formData.append('description', 'A new image')
  
// const putRequest: AuthRequest = {
//   url: 'user/avatar',
//   method: 'PUT',
//   isAuth: true,
//   multipart: formData,
// }
  
// // Usage
// const users = await makeRequest<User[]>(getRequest)
// const newPost = await makeRequest<Post>(postRequest)
// const updatedUser = await makeRequest<User>(putRequest)
