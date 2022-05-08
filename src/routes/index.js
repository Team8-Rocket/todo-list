import { useMemo, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoListContext from '../store/todoList-context'
import { todoListReducer } from '../utils/reducer'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import styles from './Routes.module.scss'
import TodoList from './TodoList'

const INIT_TODO = [
  {
    id: '1',
    title: '계란 2판 사기',
    category: 'Study',
    deadline: '2022-05-06',
    done: false,
  },
  {
    id: '2',
    title: '연봉 4000만원 받기',
    category: 'Business',
    deadline: '2022-05-09',
    done: false,
  },
  {
    id: '3',
    title: '헬스장 가서 운동하기',
    category: 'Exercise',
    deadline: '2022-05-11',
    done: false,
  },
  {
    id: '4',
    title: 'TypeScript 공부하기',
    category: 'Study',
    deadline: '2022-05-30',
    done: false,
  },
  {
    id: '5',
    title: '등산 가기',
    category: 'Etc',
    deadline: '2022-07-16',
    done: false,
  },
  {
    id: '6',
    title: '서점 가기',
    category: 'Etc',
    deadline: '2023-05-06',
    done: false,
  },
]

function App() {
  const [todoList, dispatchTodoList] = useReducer(todoListReducer, INIT_TODO)

  return (
    <div className={styles.app}>
      <TodoListContext.Provider
        value={useMemo(
          () => ({
            todoList,
            dispatchTodoList,
          }),
          [todoList]
        )}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TodoList />} />
            <Route path='add' element={<AddTodo />} />
            <Route path='edit' element={<EditTodo />} />
          </Routes>
        </BrowserRouter>
      </TodoListContext.Provider>
    </div>
  )
}

export default App
