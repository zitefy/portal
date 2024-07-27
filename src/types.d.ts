export type Link = {
  selector: string,
  value?: string,
  link?: string
}

type ObjectId = {
  $oid: string
}

export interface Template {
  _id: ObjectId
  name: string
  author?: string
  time?: string
  author_link?: string
  category?: string
}
