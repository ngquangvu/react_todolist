import DashboardTemplate from '@/components/templates/Dashboard'
import { axiosTemplate } from '@/helper/axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const Dashboard = () => {
  const todoList_dump = {
    data: [
      {
        id: 1,
        name: 'task 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/11/31 10:30',
        status_id: 1,
        status: 'Active',
        priority_id: 1,
        priority: 'High',
        created_at: '2022/11/31',
        updated_at: '2022/11/31',
        deleted_at: null
      },
      {
        id: 2,
        name: 'task 2 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/12/31 10:30',
        status_id: 2,
        status: 'Pending',
        priority_id: 1,
        priority: 'High',
        created_at: '2022/12/31',
        updated_at: '2022/12/31',
        deleted_at: null
      },
      {
        id: 3,
        name: 'task 3 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/10/01 10:30',
        status_id: 3,
        status: 'Done',
        priority_id: 3,
        priority: 'Low',
        created_at: '2022/10/01',
        updated_at: '2022/10/01',
        deleted_at: null
      },
      {
        id: 4,
        name: 'task 4 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/11/31 10:30',
        status_id: 4,
        status: 'Dangerous',
        priority_id: 1,
        priority: 'High',
        created_at: '2022/11/31',
        updated_at: '2022/11/31',
        deleted_at: null
      },
      {
        id: 5,
        name: 'task 5 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/12/31 10:30',
        status_id: 5,
        status: 'Warning',
        priority_id: 2,
        priority: 'Medium',
        created_at: '2022/12/31',
        updated_at: '2022/12/31',
        deleted_at: null
      }
    ],
    meta: {
      current_page: 1,
      from: 1,
      path: 'http://localhost:3000',
      per_page: 15,
      to: 6,
      total: 6
    }
  }

  const fetchAPI = () => {
    return axiosTemplate.get('/api/todos')
  }

  const { data, error, isLoading } = useQuery('data', fetchAPI)

  // Error and Loading states
  if (error) return <div>Request Failed</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {console.log(data)}
      <DashboardTemplate todoList={data.data.data} paginate={data.data.meta} />
    </>
  )
}

export default Dashboard
