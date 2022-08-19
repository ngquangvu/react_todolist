import Home from '@/components/templates/Home'

const Main = () => {
  const todoList = {
    data: [
      {
        id: 1,
        name: 'task 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/11/31',
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
        due_date: '2022/12/31',
        status_id: 1,
        status: 'Active',
        priority_id: 1,
        priority: 'High',
        created_at: '2022/12/31',
        updated_at: '2022/12/31',
        deleted_at: null
      },
      {
        id: 3,
        name: 'task 3 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/10/01',
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
        due_date: '2022/11/31',
        status_id: 1,
        status: 'Active',
        priority_id: 1,
        priority: 'High',
        created_at: '2022/11/31',
        updated_at: '2022/11/31',
        deleted_at: null
      },
      {
        id: 5,
        name: 'task 5 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        due_date: '2022/12/31',
        status_id: 1,
        status: 'Active',
        priority_id: 1,
        priority: 'High',
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

  return (
    <>
      <Home todoList={todoList.data} paginate={todoList.meta} />
    </>
  )
}

export default Main
