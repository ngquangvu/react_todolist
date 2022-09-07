import UserProfileTemplate from '@/components/templates/UserProfile'
import { axiosTemplate } from '@/helper/axios'
import { useQuery } from 'react-query'

const UserProfile = () => {
  const fetchAPI = async () => {
    return await axiosTemplate.get('/api/user')
  }

  const { data, error, isLoading } = useQuery('data', fetchAPI)

  // Error and Loading states
  if (error) return <div>Request Failed</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <UserProfileTemplate isLoading={isLoading} userInfo={data?.data.data}  />
    </>
  )
}

export default UserProfile
