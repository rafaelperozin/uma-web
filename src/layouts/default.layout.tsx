import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/Navigation/NavBar'

export const Layout = () => {
  return (
    <>
      <header>
        <p>Default Header</p>
      </header>
      <Outlet />
      <NavBar />
      <footer>
        <p>Default Footer</p>
      </footer>
    </>
  )
}
