export function getAccessToken(): string {
  const token = localStorage.getItem('accessToken')
  if(!token) return ''
  return token
}
  
export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token)
}
  
export function clearStorage() {
  localStorage.clear()
}
  
export function setAnthropicToken(token: string) {
  localStorage.setItem('anthropic', token)
}
  
export function getAnthropicToken(): string | null {
  return localStorage.getItem('anthropic')
}
  
export function deleteAnthropicToken() {
  localStorage.removeItem('anthropic')
}
  
