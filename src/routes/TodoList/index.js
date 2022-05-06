import { useState, useEffect } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon, Magnify } from '../../assets/svgs'
// import {cx} from '../../styles'
import classNames from 'classnames'

const INIT_TODO = [
  {
    id: 1,
    title: '계란 2판 사기',
    done: false,
    deadLine: '2022-05-04',
  },
  {
    id: 2,
    title: '맥북 프로 M1 Max CTO 버전 사기',
    done: false,
    deadLine: '2022-06-08',
  },
  {
    id: 3,
    title: '오늘의 TIL 작성하기',
    done: false,
    deadLine: '2023-07-08',
  },
]

function TodoList() {
  const [today, setToday] = useState(new Date())
  const [todoList, setTodoList] = useState(INIT_TODO)
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debounceTimer, setDebounceTimer] = useState(0)

  useEffect(() => {
    const now = new Date()
    setToday(() => now)
  }, [todoList])

  const getDDay = (deadLine) => {
    const goal = new Date(`${deadLine}T23:59:00+0900`)
    const difference = goal - today
    const dDay = Math.floor(difference / (1000 * 60 * 60 * 24))
    return dDay
  }

  const search = (value) => {
    const newTodo = INIT_TODO.filter((ele) => {
      const title = ele.title.replace(' ', '').toLowerCase()
      const newValue = value.replace(' ', '')[0].toLowerCase()
      return title.includes(newValue)
    })
    setTodoList(() => newTodo)
  }

  const deboucingSearch = (text) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    const newTimer = setTimeout(async () => {
      await search(text)
    }, 200)
    setDebounceTimer(newTimer)
  }

  const handleSearchClick = () => {
    clearTimeout(debounceTimer)
    setSearchValue(() => '')
    setIsSearchClicked((prev) => !prev)
    setTodoList(() => INIT_TODO)
  }

  const handleSearchChange = (event) => {
    const text = event.currentTarget.value
    setSearchValue(() => text)
    if (text !== '') {
      deboucingSearch(text)
    } else if (text === '') {
      clearTimeout(debounceTimer)
      setTodoList(() => INIT_TODO)
    }
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
      <div
        className={`${styles.searchBox} 
          ${isSearchClicked ? styles.clicked : ''}`}
      >
        <input
          className={`${styles.searchInput} 
            ${isSearchClicked ? styles.clicked : ''}`}
          type='text'
          value={searchValue}
          onChange={handleSearchChange}
          placeholder='search'
          disabled={!isSearchClicked}
        />
      </div>

      <Magnify className={styles.magnify} onClick={handleSearchClick} />
      <div className={styles.centering}>
        <h1 className={styles.greetings}>Hi! this is your assignment.</h1>
        <ul className={styles.tasks}>
          <p className={styles.tasksTitle}>Today&apos;s</p>
          {todoList.map((todo) => {
            let { deadLine } = todo

            const day = getDDay(deadLine)
            return (
              <li key={`todo-${todo.id}`} className={styles.task}>
                <div className={styles.checkboxWrapper}>
                  <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
                  <CheckIcon />
                </div>
                <p className={classNames(styles.title, { [styles.done]: todo.done })}>{todo.title}</p>
                <span className={classNames(styles.dDay, { [styles.dayRed]: day < 3 })}>
                  {day > 0 ? `D-${day}` : `D+${Math.abs(day)}`}
                </span>
              </li>
            )
          })}
        </ul>
        <button type='button' className={styles.addButton} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
