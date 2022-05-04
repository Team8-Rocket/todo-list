import styles from './ProgressBar.module.scss'

function ProgressBar({ todoList, category }) {
  const todoListLength = todoList.length
  const arrayByCategory = todoList.filter((todo) => {
    return todo.category === category
  })

  const percent = Math.round((arrayByCategory.length / todoListLength) * 100)
  // return <progress className='progressRedBar' value={percent} max='100' />

  // return (
  //   <div className='progress-container'>
  //     <progress max='100' value={percent}>
  //       65%
  //     </progress>
  //   </div>
  // )

  return <div className={styles.progressBar} style={{ width: `${percent}%` }} />
}

export default ProgressBar
