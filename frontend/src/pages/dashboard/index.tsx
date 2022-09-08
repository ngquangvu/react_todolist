import { useState } from 'react'
import DashboardTemplate from '@/components/templates/Dashboard'
import { axiosTemplate } from '@/helper/axios'
import { Todo, TodoResponse } from '@/types'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { CurrentPage, LoggedIn } from '@/state'

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [lastPage, setLastPage] = useState<number>(0)
  const [currentPage, _] = useRecoilState(CurrentPage)


  const fetchAPI = async () => {
    const params = new URLSearchParams()
    params.append('page', currentPage.toString())
    const res = await axiosTemplate.get('/api/todos?' + params.toString()).then((response) => response.data)
    setTodos(res.data)
    setLastPage(res.meta.last_page)
    return res
  }

  const { refetch, error, isLoading } = useQuery<TodoResponse>(['data', currentPage], fetchAPI)


  // Error and Loading states
  if (error) return <div>Request Failed</div>
  // if (isLoading) return <div>Loading...</div>

  return (
    <>
      <DashboardTemplate todos={todos} last_page={lastPage} />
    </>
  )
}

export default Dashboard
