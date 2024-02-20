import { StoreProvider } from './constexts/store.context'
import { GlobalRouter } from './routers/global.router'

function App() {
  return (
    <StoreProvider>
      <GlobalRouter />
    </StoreProvider>
  )
}

export default App
