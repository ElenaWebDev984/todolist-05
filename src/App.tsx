import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export const App = () => {

  // TODO DATA (model, BLL) => action
  const [todolist, setTodolist] = useState<Todolist[>([
    {id: v1(), title: 'What to learn', filter: 'all',},
    {id: v1(), title: 'What to buy', filter: 'all',},
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  // TODO delete
  const deleteTask = (taskId: string) => {
    const nextState: Task[] = tasks.filter((task: Task) => task.id !== taskId)
    setTasks(nextState)
  }

  // TODO create
  const createTask = (title: string) => {
    setTasks([...tasks, {id: v1(), title, isDone: false}])
  }

  // TODO update task => update task status (isDone)
  const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
    const nextState: Task[] = (tasks.map(task => task.id === taskId ? { ...task, newIsDoneValue} : task))
    setTasks(nextState)

    setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task))
  }

  //  TODO UI (view) => element for action ('form', 'button') +
  const [filter, setFilter] = useState<FilterValues>('all')
  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
    let filteredTasks: Task[] = tasks
    if (filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }
    return filteredTasks
  }



  return (
      <div className="app">
        <TodolistItem title={todolistTitle}
                      tasks={getFilteredTasks((tasks, filter))}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
      </div>
  )
}
