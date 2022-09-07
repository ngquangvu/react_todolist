import DashboardTemplate from '@/components/templates/Dashboard'
import { axiosTemplate } from '@/helper/axios'
import { useQuery } from 'react-query'

const Dashboard = () => {
  const fetchAPI = async () => {
    return await axiosTemplate.get('/api/todos')
  }

  const { data, error, isLoading } = useQuery('data', fetchAPI)

  // Error and Loading states
  if (error) return <div>Request Failed</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <DashboardTemplate todoList={data?.data.data} paginate={data?.data.meta} />
    </>
  )
}

export default Dashboard
