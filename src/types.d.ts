type Link = {
  selector: string,
  value?: string,
  link?: string
}

type ObjectId = {
  $oid: string
}

interface UserData {
  name?: string,
  dob?: string,
  bio?: string,
  pronouns?: string,
  phone?: string,
  links?: Link[]
}

export interface User extends UserData {
  username: string,
  email: string,
  active?: ObjectId
  quick_response?: string,
}

export type AuthReponse = {
  token: string
}

export interface Template {
  _id: ObjectId
  name: string
  author?: string
  time?: string
  author_link?: string
  category?: string
}

type MetaData = {
  name: string
  category?: string
  time: string
}

export interface Site {
  _id?: ObjectId
  path: string
  data: Link[]
  metadata: MetaData
  user: ObjectId
}

export interface SitePreview {
  mobile: string
  desktop: string  
}

export interface Source {
  html: string,
  css: string,
  js: string,
  assets: string[]
}

export interface Message {
  role: 'user' | 'assistant',
  content: string
}

interface Usage {
  input_tokens: number
  output_tokens: number
}

export type Code = {
  html: string
  css: string
  js: string
}

export type Text = {
  type: 'text'
  text: string
}

export type ToolUse = {
  type: 'tool_use'
  id: string
  name: 'set_code' | 'refresh_preview'
  input: Code
}

export interface AnthropicResponse {
  id: string
  type: string
  role: string
  content: (Text | ToolUse)[]
  model: string
  stop_reason: string | null
  stop_sequence: string | null
  usage: Usage
}
