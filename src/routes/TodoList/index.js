import { useState } from 'react'

import ProgressBar from './ProgressBar'

import styles from './TodoList.module.scss'

import { CheckIcon } from '../../assets/svgs'

const INIT_CATEGORY = ['Study', 'Business', 'Personal', 'Exercise', 'Etc']

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
    category: 'Personal',
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

function TodoList() {
  const [category, setCategory] = useState(INIT_CATEGORY)
  const [selectedCategory, setSelectedCategory] = useState('')

  const [initTodo, setInitTodo] = useState(INIT_TODO)
  const [todoList, setTodoList] = useState(INIT_TODO)

  const handleClickCategory = (e) => {
    const { categoryTitle } = e.currentTarget.dataset

    // 이게 맞나...

    if (!selectedCategory) {
      setTodoList((prevState) => {
        return prevState.filter((prev) => prev.category === categoryTitle)
      })
      setSelectedCategory(categoryTitle)
    }

    if (selectedCategory && selectedCategory === categoryTitle) {
      setTodoList(initTodo)
      setSelectedCategory('')
    }

    if (selectedCategory && selectedCategory !== categoryTitle) {
      setTodoList(initTodo.filter((prev) => prev.category === categoryTitle))
      setSelectedCategory(categoryTitle)
    }
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

        <p className={styles.categoryTitle}>Categories</p>

        <ul className={styles.categories}>
          {category.map((item, index) => {
            const key = `category-${index}`
            return (
              <li key={key} className={styles.category}>
                <button type='button' data-category-title={item} onClick={handleClickCategory}>
                  <p>40</p>
                  <p className={styles.title}>{item}</p>
                </button>
                <ProgressBar todoList={initTodo} category={item} />
              </li>
            )
          })}
        </ul>

        <ul className={styles.tasks}>
          <p className={styles.tasksTitle}>Today&apos;s {selectedCategory}</p>
          {todoList.map((todo) => (
            <li key={`todo-${todo.id}`} className={styles.task}>
              <div className={styles.checkboxWrapper}>
                <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
                <CheckIcon />
              </div>
              <p className={styles.title}>{todo.title}</p>
            </li>
          ))}
        </ul>

        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
