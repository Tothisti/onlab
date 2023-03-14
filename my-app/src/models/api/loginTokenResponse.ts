export interface LoginTokenResponse {
  username: string | null
  plant: string
  password: null
  isTerminalUser: boolean
  token: string
  roles: string[]
}
