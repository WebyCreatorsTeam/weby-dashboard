export interface ICallUser {
  _id: string,
  __v?: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  userHelp: string,
  archive?: boolean
  favorite?: boolean
}

export interface IProject {
  description: string
  name:string
  urlImage:string
  urlSite: string
  __v?: string
  _id: string
  draft: boolean
}