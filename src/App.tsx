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

type TasksState = {
    [todolistId: string]: Task[]
}

export const App = () => {

    // TODO DATA (model, BLL) => action
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all',},
        {id: todolistId_2, title: 'What to buy', filter: 'all',},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Tomatoes', isDone: true},
            {id: v1(), title: 'Oranges', isDone: false},
        ],
    })

    // TODO delete
    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter((task: Task) => task.id !== taskId)
        })
    }

    // TODO create
    const createTask = (title: string, todolistId: string) => {
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        })
    }

    // TODO update task => update task status (isDone)
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newIsDoneValue} : task)
        })
    }

    // TODO update todolist => update todolist filter
    const changeFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    // TODO delete todolist
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId ))
        delete tasks[todolistId]
    }

    //  TODO UI (view) => element for action ('form', 'button') +


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

    const todolistComponents = todolists.map(todolist => {
        return (
            <TodolistItem
                key={todolist.id}
                todolistId={todolist.id}
                title={todolist.title}
                tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                filter={todolist.filter}
                deleteTodolist={deleteTodolist}/>
        )
    })


    return (
        <div className="app">
            {todolistComponents}
        </div>
    )
}
