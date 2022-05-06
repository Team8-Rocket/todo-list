import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TodoListContext from '../../store/todoList-context'

const CATEGORY_LIST = ['Study', 'Business', 'Personal', 'Exercise', 'Etc']

function EditTodo() {
  const { dispatchTodoList } = useContext(TodoListContext)
  const { targetTodo } = useLocation().state
  const [title, setTitle] = useState(targetTodo.title)
  const [deadline, setDeadline] = useState(targetTodo.deadline)
  const [category, setCategory] = useState(targetTodo.category)
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

    dispatchTodoList({ type: 'EDIT_TODO', id: targetTodo.id, title, deadline, category, done: targetTodo.done })
    navigate('/')
  }

  return (
    <>
      <h1>AddTodo</h1>
      <input type='text' value={title} placeholder='edit your Task' onChange={handleChangeTitle} />
      <input type='date' value={deadline} onChange={handleChangeDeadline} />
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
        Edit task
      </button>
    </>
  )
}

export default EditTodo
