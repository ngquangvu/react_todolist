export enum TodoStatus {
  'N/A',
  'New',
  'In-progress',
  'Pending',
  'Canceled',
  'Complete'
}

export type UserInfo = {
  id: number
  email: string
  user_name: string
  first_name: string
  last_name: string
  address: string
}

export type TypeResponse = {
  data: UserInfo
}



