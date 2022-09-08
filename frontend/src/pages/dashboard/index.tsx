import { useState } from 'react'
import DashboardTemplate from '@/components/templates/Dashboard'
import { axiosTemplate } from '@/helper/axios'
import { Todo, TodoResponse } from '@/types'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { CurrentPage } from '@/state'
import { IsLoading } from '@/state/IsLoading'

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [lastPage, setLastPage] = useState<number>(0)
  const [currentPage, _] = useRecoilState(CurrentPage)
  const [isLoadingState, SetIsLoadingState] = useRecoilState(IsLoading)

  const fetchAPI = async () => {
    const params = new URLSearchParams()
    params.append('page', currentPage.toString())
    const res = await axiosTemplate.get('/api/todos?' + params.toString()).then((response) => response.data)
    setTodos(res.data)
    setLastPage(res.meta.last_page)
    return res
  }

  const { error, isLoading } = useQuery<TodoResponse>(['data', currentPage], fetchAPI)

  // Error and Loading states
  if (error) return <div>Request Failed</div>
  // if (isLoading) {
  //   SetIsLoadingState(true)
  // }

  return (
    <>
      {SetIsLoadingState(false)}
      <DashboardTemplate todos={todos} last_page={lastPage} />
    </>
  )
}

export default Dashboard
