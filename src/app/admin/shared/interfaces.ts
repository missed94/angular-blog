
export interface User {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface Post {
  name?: fbCreateResponse,
  title: string,
  text: string,
  author: string,
  date: Date
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string,
}

export interface fbCreateResponse {
  name: string,
}

