import { useState } from 'react'

import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import type { TodoResponse, TodoState } from '@/types'

import DashboardTemplate from '@/components/templates/Dashboard'
import { axiosTemplate } from '@/helper/axios'
import { CurrentPage, PerPage, TodoList } from '@/state'
import { IsLoadingContent } from '@/state/IsLoadingContent'
import { Todo } from '@/types'

const Dashboard = () => {
  const [, setTodos] = useRecoilState(TodoList)
  const [todosStates, setTodosStates] = useState<TodoState | null>(null)
  const [lastPage, setLastPage] = useState<number>(0)
  const [currentPage] = useRecoilState(CurrentPage)
  const [perPage] = useRecoilState(PerPage)
  const [isLoadingContentState, SetIsLoadingState] = useRecoilState(IsLoadingContent)

  const fetchTodoAPI = async () => {
    const params = new URLSearchParams()
    params.append('page', currentPage.toString())
    params.append('per_page', perPage.toString())
    const resTodos = await axiosTemplate.get('/api/todos?' + params.toString()).then((response) => response.data)
    setTodos(resTodos.data)
    setLastPage(resTodos.meta.last_page)

    const resCount = await axiosTemplate.get('/api/todos_states').then((response) => response)
    setTodosStates(resCount.data)
    return resTodos
  }

  const { error, isLoading } = useQuery<TodoResponse>(['data', currentPage, perPage], fetchTodoAPI)

  // Error and Loading states
  if (error) return <div>Request Failed</div>
  // if (isLoadingContentState) {
  //   SetIsLoadingState(true)
  // }

  return (
    <>
      {SetIsLoadingState(false)}
      <DashboardTemplate todos_states={todosStates} last_page={lastPage} />
    </>
  )
}

export default Dashboard
