import { useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon } from '../../assets/svgs'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const INIT_TODO = [
  {
    id: 1,
    title: '계란 2판 사기',
    done: false,
  },
  {
    id: 2,
    title: '맥북 프로 M1 Max CTO 버전 사기',
    done: false,
  },
  {
    id: 3,
    title: '오늘의 TIL 작성하기',
    done: false,
  },
]

function TodoList() {
  const [todoList, setTodoList] = useState(INIT_TODO)
  const [isTaskLeft, setIsTaskLeft] = useState(false)
  const [taskId, setTaskId] = useState(0)

  const handleTodoClick = (e, todoId) => {
    setIsTaskLeft((prev)=>!prev)
    setTaskId(()=>todoId)
  }

  const handleEditClick = () => {
    setIsTaskLeft((prev)=>!prev)
  }
  
  const handleDeleteClick = () => {
    const deletedTodoList = todoList.filter(todo => taskId !== todo.id)
    setTimeout(() => {setTodoList(()=>deletedTodoList)}, 200)
    setIsTaskLeft((prev)=>!prev)
  }

  const handleAddClick = (e) => {
    // console.log('handleAddClick')
  }

  const handleChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setTodoList((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === Number(id))
      const newList = [...prev]
      newList[targetIndex].done = checked
      return newList
    })
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>
        <ul className={styles.tasks}>
          <p className={styles.tasksTitle}>Today&apos;s</p>
          {todoList.map((todo) => (
            <div className={styles.wrapTodo}>
              <li key={`todo-${todo.id}`} className={cx(styles.task, {[styles.slide] : isTaskLeft && taskId === todo.id})}>
                <div className={styles.checkboxWrapper}>
                  <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
                  <CheckIcon />
                </div>
                <button type='button' className={styles.wrapTouch} onClick={(e) => handleTodoClick(e, todo.id)} aria-label='Todo Slide button'/>
                <p className={styles.title}>{todo.title}</p>
              </li>
              <div className={cx(styles.taskSlide, {[styles.slide] : isTaskLeft && taskId === todo.id})}>
                <button type='button' className={styles.editButton} onClick={handleEditClick}>Edit</button>
                <button type='button' className={styles.deleteButton} onClick={handleDeleteClick}>Del </button>
              </div>
            </div>
          ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
