import { observer } from 'mobx-react-lite'
import { useStore } from '../constexts/store.context'

export const LoginPage = observer(() => {
  const {user: {isAuthenticated, setIsAuthenticated}} = useStore()
  return (
    <>
      <h1>Login Page</h1>
      <p>Welcome to the login page</p>
      <p>{isAuthenticated ? 'You are authenticated' : 'You are not authenticated'}</p>
      <button onClick={() => setIsAuthenticated(true)}>Authenticate</button>
    </>
  )
})
