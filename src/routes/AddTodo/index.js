import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import { AiOutlineClose } from 'react-icons/ai'
import { MdKeyboardArrowUp, MdOutlineEditCalendar } from 'react-icons/md'
import TodoListContext from '../../store/todoList-context'
import { dateFormatter } from '../../utils'
import styles from './AddTodo.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const CATEGORY_LIST = ['Study', 'Business', 'Personal', 'Exercise', 'Etc']
const TODAY = dateFormatter(new Date())

function AddTodo() {
  const { dispatchTodoList } = useContext(TodoListContext)
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState(TODAY)
  const [category, setCategory] = useState('Etc')
  const [showOptions, setShowOptions] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => navigate(-1)

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeDeadline = (e) => {
    setDeadline(e.currentTarget.value)
  }

  const handleToggleOption = () => setShowOptions((prev) => !prev)

  const handleSelectCategory = (e) => {
    setCategory(e.currentTarget.name)
    handleToggleOption()
  }

  const handleSubmitTodo = (e) => {
    e.preventDefault()

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

  const categoryRef = useRef()
  const handleClickOutSide = (e) => {
    if (showOptions && !categoryRef.current.contains(e.target)) setShowOptions(false)
  }

  useEffect(() => {
    if (showOptions) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  return (
    <div className={styles.todoList}>
      <button type='button' className={styles.closeButton} onClick={handleClose} aria-label='close-button'>
        <AiOutlineClose />
      </button>
      <form action='' onSubmit={handleSubmitTodo}>
        <input
          className={styles.taskInput}
          type='text'
          placeholder='Enter new task'
          value={title}
          onChange={handleChangeTitle}
        />
        <button type='submit' className={styles.addButton}>
          New task
          <MdKeyboardArrowUp />
        </button>
      </form>
      <div className={styles.optionsWapper}>
        <div className={styles.calendarBox}>
          <MdOutlineEditCalendar />
          <input
            type='date'
            value={deadline}
            min={TODAY}
            onChange={handleChangeDeadline}
            className={styles.dateInput}
          />
          <span className={styles.optionTitle}>{deadline === TODAY ? 'TODAY' : deadline.slice(5)}</span>
        </div>
        <div className={styles.categoryBox} ref={categoryRef}>
          <button
            type='button'
            className={cx(styles.optionTitle, category.toLocaleLowerCase())}
            onClick={handleToggleOption}
          >
            {category}
          </button>
          {showOptions && (
            <div className={styles.optionsWrapper}>
              {CATEGORY_LIST.map((categoryName) => (
                <div key={`category-${categoryName}`} className={classNames(styles.option)}>
                  <button
                    type='button'
                    className={categoryName.toLocaleLowerCase()}
                    onClick={handleSelectCategory}
                    name={categoryName}
                  >
                    {categoryName}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddTodo
