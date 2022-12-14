import { NavLink } from 'react-router-dom'

const LeftMenu = () => {
  const NavList: any = [
    {
      parent: 'ユーザー管理',
      children: [
        {
          display: 'ユーザー情報',
          path: '/user'
        }
      ]
    },
    {
      parent: 'タスク管理',
      children: [
        {
          display: 'タスク一覧',
          path: '/dashboard/todo/list'
        },
        {
          display: 'タスク新規作成',
          path: '/dashboard/todo/add'
        },
        {
          display: 'タスク検索',
          path: '/dashboard/todo/search'
        }
      ]
    }
  ]

  return (
    <>
      <ul className="">
        {
          NavList.map((item: any, index: number) => (
            <div className="mt-5" key={index}>
              <span className="text-xs text-black font-semibold">{item.parent}</span>
              <ul className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                {item.children.map((item_child: any, index_child: number) => (
                  <li className="relative" key={index_child}>
                    <NavLink
                      // className={`${
                      //   isActive && 'mb-9'
                      // } block w-full text-sm pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block`}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? 'hover:text-sky-500 font-semibold text-sky-500 before:bg-sky-500'
                            : 'not-active-class'
                        } block w-full text-sm pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block`
                      }
                      key={index_child}
                      to={item_child.path}
                    >
                      {item_child.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))
          // <NavItem key={index} parent={item.parent} children={item.children} />
        }
      </ul>
    </>
  )
}

export default LeftMenu
