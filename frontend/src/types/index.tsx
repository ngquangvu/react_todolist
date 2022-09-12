export enum TodoStatus {
  NA = 'N/A',
  New = 'New',
  InProgress = 'In-progress',
  Pending = 'Pending',
  Canceled = 'Canceled',
  Complete = 'Complete'
}

export enum TodoPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export type Todo = {
  id: number
  title: string
  content: string
  status: string
  priority: string
  due_date: Date
  deleted_at: Date | null
}

export type TodoState = {
  all: number
  onlyTrashed: number
  scheduled: number
}

export type UserInfo = {
  id: number
  email: string
  user_name: string
  first_name: string
  last_name: string
  address: string
}

export type UserInfoResponse = {
  data: UserInfo[]
  last_page: number
}

export type TodoResponse = {
  data: Todo[] | null
  link: any
  meta: any
}

export type TodoTemplate = {
  data: Todo[] | null
  last_page: number
}
