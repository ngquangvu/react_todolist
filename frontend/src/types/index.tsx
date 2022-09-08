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
