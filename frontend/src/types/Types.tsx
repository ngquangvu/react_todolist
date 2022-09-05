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
  name: string
  created_at: Date
  deleted_at: Date
  updated_at: Date
}
