import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/Navigation/NavBar'

export const Layout = () => {
  return (
    <>
      <div className='container default-theme'>
        <div className='container__left-bar'></div>
        <header className='container__header header'>
          <h1 className='header__title txt-xxl txt-bold txt-uppercase'>{'Welcome'}</h1>
          <p className='header__text txt-l'>{'Register or login to see the magic happen!'}</p>
          <NavBar />
        </header>
        <main className='container__main'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
