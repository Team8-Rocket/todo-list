import { useState, useEffect } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon, Magnify } from '../../assets/svgs'
import { useHorizontalScroll } from './useSideScroll'
// import {cx} from '../../styles'
// import classNames from 'classnames'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const INIT_CATEGORY = ['Study', 'Business', 'Personal', 'Exercise', 'Etc']

const CATEGORY_COLOR = { Study: 'red', Business: 'blue', Personal: 'purple', Exercise: 'gold', Etc: 'orange' }

const INIT_TODO = [
  {
    id: 1,
    title: '계란 2판 사기',
    category: 'Study',
    deadLine: '2022-05-06',
    done: false,
  },
  {
    id: 2,
    title: '연봉 4000만원 받기',
    category: 'Business',
    deadLine: '2022-05-09',
    done: false,
  },
  {
    id: 3,
    title: '헬스장 가서 운동하기',
    category: 'Exercise',
    deadLine: '2022-05-11',
    done: false,
  },
  {
    id: 4,
    title: 'TypeScript 공부하기',
    category: 'Study',
    deadLine: '2022-05-30',
    done: false,
  },
  {
    id: 5,
    title: '등산 가기',
    category: 'Etc',
    deadLine: '2022-07-16',
    done: false,
  },
  {
    id: 6,
    title: '서점 가기',
    category: 'Etc',
    deadLine: '2023-05-06',
    done: false,
  },
]

const CATEGORY_WIDTH = 190

function TodoList() {
  const [category, setCategory] = useState(INIT_CATEGORY)
  const [todoList, setTodoList] = useState(INIT_TODO)
  const [filterCategory, setFilterCategory] = useState('All')

  const [isTaskLeft, setIsTaskLeft] = useState(false)
  const [taskId, setTaskId] = useState(0)

  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debounceTimer, setDebounceTimer] = useState(0)

  const [today, setToday] = useState(new Date())

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

  const handleFilterCategory = (e) => {
    const { dataset } = e.currentTarget
    const { value } = dataset
    filterCategory === value ? setFilterCategory('All') : setFilterCategory(value)
  }

  const handleTodoClick = (e, todoId) => {
    setIsTaskLeft((prev) => !prev)
    setTaskId(() => todoId)
  }

  const handleEditClick = () => {
    setIsTaskLeft((prev) => !prev)
  }

  const handleDeleteClick = () => {
    const deletedTodoList = todoList.filter((todo) => taskId !== todo.id)
    setTimeout(() => {
      setTodoList(() => deletedTodoList)
    }, 200)
    setIsTaskLeft((prev) => !prev)
  }

  const checkArrayCategory = (arr, keyword) => {
    return arr.filter((obj) => obj.category === keyword)
  }
  const checkArrayDone = (arr, keyword) => {
    const newArr = checkArrayCategory(arr, keyword)
    return (newArr.filter((obj) => obj.done).length / newArr.length) * 100
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

  const getDDay = (deadLine) => {
    const goal = new Date(`${deadLine}T23:59:00+0900`)
    const difference = goal - today
    const dDay = Math.floor(difference / (1000 * 60 * 60 * 24))
    return dDay
  }

  const scrollRef = useHorizontalScroll()

  useEffect(() => {
    const now = new Date()

    setToday(() => now)
  }, [todoList])

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

        <p className={styles.categoryTitle}>Categories</p>
        <div className={styles.categoriesWrapper} ref={scrollRef}>
          <ul className={styles.categories} style={{ width: `${CATEGORY_WIDTH * category.length + 70}px` }}>
            {category.map((item, idx) => (
              <li
                key={`category-${category[idx]}`}
                className={styles.category}
                data-value={item}
                onClick={handleFilterCategory}
                role='presentation'
              >
                <p className={styles.categoriesCount}>{checkArrayCategory(todoList, item).length} tasks</p>
                <p className={styles.categoriesTitle}>{item}</p>
                <div
                  className={styles.progressBar}
                  style={{ width: `${checkArrayDone(todoList, item)}%`, backgroundColor: `${CATEGORY_COLOR[item]}` }}
                >
                  <span style={{ backgroundColor: `${CATEGORY_COLOR[item]}` }}> </span>
                </div>
                <div className={styles.bar} />
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.tasksTitle}>
          Today&apos;s <span>{filterCategory}</span>
        </p>
        <ul className={styles.tasks}>
          {filterCategory === 'All'
            ? todoList.map((todo) => {
                const { deadLine } = todo

                const day = getDDay(deadLine)
                return (
                  <div key={`todoWrap-${todo.id}`} className={styles.wrapTodo}>
                    <li
                      key={`todo-${todo.id}`}
                      className={cx(styles.task, { [styles.slide]: isTaskLeft && taskId === todo.id })}
                    >
                      <div className={styles.checkboxWrapper}>
                        <input
                          type='checkbox'
                          checked={todo.done}
                          data-id={todo.id}
                          onChange={handleChange}
                          className={todo.category.toLowerCase()}
                          style={
                            todo.done
                              ? { backgroundColor: `${CATEGORY_COLOR[todo.category]}` }
                              : { border: `2px solid ${CATEGORY_COLOR[todo.category]}` }
                          }
                        />
                        <CheckIcon />
                      </div>
                      <button
                        type='button'
                        className={styles.wrapTouch}
                        onClick={(e) => handleTodoClick(e, todo.id)}
                        aria-label='Todo Slide button'
                      />

                      <p className={classNames(styles.title, { [styles.done]: todo.done })}>{todo.title}</p>
                      <span className={classNames(styles.dDay, { [styles.dayRed]: day < 3 })}>
                        {day > 0 ? `D-${day}` : `D+${Math.abs(day)}`}
                      </span>
                    </li>
                    <div className={cx(styles.taskSlide, { [styles.slide]: isTaskLeft && taskId === todo.id })}>
                      <button type='button' className={styles.editButton} onClick={handleEditClick}>
                        Edit
                      </button>
                      <button type='button' className={styles.deleteButton} onClick={handleDeleteClick}>
                        Del{' '}
                      </button>
                    </div>
                  </div>
                )
              })
            : todoList.map((todo) => {
                const { deadLine } = todo

                const day = getDDay(deadLine)
                return filterCategory === todo.category ? (
                  <div key={`todoWrap-${todo.id}`} className={styles.wrapTodo}>
                    <li
                      key={`todo-${todo.id}`}
                      className={cx(styles.task, { [styles.slide]: isTaskLeft && taskId === todo.id })}
                    >
                      <div className={styles.checkboxWrapper}>
                        <input
                          type='checkbox'
                          checked={todo.done}
                          data-id={todo.id}
                          onChange={handleChange}
                          className={todo.category.toLowerCase()}
                          style={
                            todo.done
                              ? { backgroundColor: `${CATEGORY_COLOR[todo.category]}` }
                              : { border: `2px solid ${CATEGORY_COLOR[todo.category]}` }
                          }
                        />
                        <CheckIcon />
                      </div>
                      <button
                        type='button'
                        className={styles.wrapTouch}
                        onClick={(e) => handleTodoClick(e, todo.id)}
                        aria-label='Todo Slide button'
                      />

                      <p className={classNames(styles.title, { [styles.done]: todo.done })}>{todo.title}</p>
                      <span className={classNames(styles.dDay, { [styles.dayRed]: day < 3 })}>
                        {day > 0 ? `D-${day}` : `D+${Math.abs(day)}`}
                      </span>
                    </li>
                    <div className={cx(styles.taskSlide, { [styles.slide]: isTaskLeft && taskId === todo.id })}>
                      <button type='button' className={styles.editButton} onClick={handleEditClick}>
                        Edit
                      </button>
                      <button type='button' className={styles.deleteButton} onClick={handleDeleteClick}>
                        Del{' '}
                      </button>
                    </div>
                  </div>
                ) : null
              })}
        </ul>

        <button type='button' className={styles.addButton} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
