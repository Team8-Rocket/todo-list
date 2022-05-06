import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import TodoListContext from '../../store/todoList-context'

const TODAY = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
const CATEGORY_LIST = ['Study', 'Business', 'Personal', 'Exercise', 'Etc']

function AddTodo() {
  const { dispatchTodoList } = useContext(TodoListContext)
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState(TODAY)
  const [category, setCategory] = useState('Etc')
  const navigate = useNavigate()

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeDeadline = (e) => {
    setDeadline(e.currentTarget.value)
  }

  const handleSelectCategory = (e) => {
    setCategory(CATEGORY_LIST[e.currentTarget.value])
  }

  const handleSubmitTodo = () => {
    if (title.trim().length === 0) return

    const newTodo = {
      id: uuid(),
      title,
      deadline,
      category,
      done: false,
    }

    dispatchTodoList({ type: 'ADD_TODO', newTodo })
    navigate('/')
  }

  return (
    <>
      <h1>AddTodo</h1>
      <input type='text' placeholder='Input new Task' onChange={handleChangeTitle} />
      <input type='date' onChange={handleChangeDeadline} />
      <ul>
        {CATEGORY_LIST.map((option, index) => (
          <li
            value={index}
            key={`category-${option}`}
            onClick={handleSelectCategory}
            role='option'
            aria-selected='false'
          >
            {option}
          </li>
        ))}
      </ul>
      <button type='submit' onClick={handleSubmitTodo}>
        New task
      </button>
    </>
  )
}

export default AddTodo
