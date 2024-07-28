import { clearStorage, getAccessToken, getAnthropicToken } from './storage'
import { BASE_URL } from './config'
import { AnthropicResponse, Text } from '~/types'

export interface Request {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  params?: Record<string, string>;
  multipart?: FormData;
}

export async function makeAuthRequest<T>(request: Request, responseText: boolean = false): Promise<T> {
  return makeRequest(request, true, responseText)
}
  

export async function makeRequest<T>(
  request: Request, 
  isAuth: boolean = false, 
  responseText: boolean = false,
): Promise<T> {
  const headers: HeadersInit = {
    'Accept': '*/*',
  }

  const url = new URL(`${BASE_URL}${request.url}`)

  // Add query params if they exist
  if (request.params) {
    Object.entries(request.params).forEach(([key, value]) => 
      url.searchParams.append(key, value),
    )
  }

  const config: RequestInit = {
    method: request.method,
    headers: headers,
  }
  
  if (request.multipart) {
    config.body = request.multipart
  } else if (request.data) {
    headers['Content-Type'] = 'application/json'
    config.body = JSON.stringify(request.data)
  }
  
  // If it's an AuthRequest, fetch and add the token
  if (isAuth) {
    const token = getAccessToken()
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url.toString(), config)

    if(!response.ok) {
      if(response.status === 401 && isAuth) {
        clearStorage()
        const path = window.location.pathname
        if(path != 'login' && path != 'signup') window.location.replace('/login')
        throw new Error('logout')
      } else throw new Error(`HTTP error ${response.status}`)
    }

    if(responseText) return await response.text() as T
    else return await response.json() as T
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export async function makeAnthropicRequest<T extends AnthropicResponse>(data: object): Promise<T> {
  const headers: HeadersInit = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  }

  const token = getAnthropicToken()
  if(token) headers['Authorization'] = `Bearer ${token}`

  const url = new URL(`${BASE_URL}/anthropic`)

  const config: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url.toString(), config)
    return await response.json() as T
  } catch (error) {
    const errorResponse: AnthropicResponse = {
      id: 'error',
      type: 'error',
      role: 'assistant',
      content: [{
        type: 'text',
        text: `Oops! I ran into an error. Can you please try after a while? Here are the details if you want to report this to the developers: ${error instanceof Error ? error.message : String(error)}`,
      } as Text],
      model: 'error',
      stop_reason: null,
      stop_sequence: null,
      usage: { input_tokens: 0, output_tokens: 0 },
    }
    return errorResponse as T
  }
}
