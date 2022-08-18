import { Icon } from '../atoms/Icon'

const Header = () => {
  const headerIco = 'https://cdn-icons-png.flaticon.com/512/3472/3472580.png'

  return (
    <div className="h-14 py-2 px-3 bg-slate-200 sticky top-0">
      <Icon url={headerIco} alt="header-icon" />
      <div></div>
    </div>
  )
}

export default Header
