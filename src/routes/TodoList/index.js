import { useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon } from '../../assets/svgs'
import { useHorizontalScroll } from './useSideScroll'
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
    deadLine: '2022-05-06',
    done: false,
  },
  {
    id: 5,
    title: '등산 가기',
    category: 'Etc',
    deadLine: '2022-05-06',
    done: false,
  },
  {
    id: 6,
    title: '서점 가기',
    category: 'Etc',
    deadLine: '2022-05-06',
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
  const scrollRef = useHorizontalScroll()

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>

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
            ? todoList.map((todo) => (
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

                    <p className={styles.title}>{todo.title}</p>
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
              ))
            : todoList.map((todo) => {
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

                      <p className={styles.title}>{todo.title}</p>
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

        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
