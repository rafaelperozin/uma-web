import { observer } from 'mobx-react-lite'
import { useStore } from '../constexts/store.context'

export const HomePage = observer(() => {
  const {user: {isAuthenticated}} = useStore()
  return (
    <main>
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <p>{isAuthenticated ? 'You are authenticated' : 'You are not authenticated'}</p>
    </main>
  )
})
