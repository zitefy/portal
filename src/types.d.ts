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
