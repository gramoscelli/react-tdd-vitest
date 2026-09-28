import { TodoProvider } from './TodoContext'
import TodoApp from './TodoApp'

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  )
}

export default App
