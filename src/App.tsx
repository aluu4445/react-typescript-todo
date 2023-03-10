import React from 'react';
import logo from './logo.svg';
import './index.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task: TaskProp) => !task.completed,
  Completed: (task: TaskProp) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

type TaskProp = {
  id: string,
  name: string,
  completed: boolean,
}

function App() {
  const [tasks, setTasks] = React.useState(
    [
      { id: "todo-0", name: "Eat", completed: true },
      { id: "todo-1", name: "Sleep", completed: false },
      { id: "todo-2", name: "Repeat", completed: false }
    ]
  )

  const [filterStatus, setFilterStatus] = React.useState('All');

  function addTask(newTaskName: string) {
    const newTask = {id: `todo-${nanoid()}`, name: newTaskName, completed: false};
    setTasks([...tasks, newTask])
  }

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  function editTask(id: string, newName: string) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTasks)
  }

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  function toggleTaskFilter(filterStatus: string) {
    setFilterStatus(filterStatus)
  }

  const FILTER_MAP : {[key: string]: (task: TaskProp) => boolean} = {
    All: (_) => true,
    Active: (task: TaskProp) => task.completed,
    Completed: (task: TaskProp) => task.completed
  };

  const taskList = tasks.filter(FILTER_MAP[filterStatus]).map(task => {
    return (
      <Todo 
        id={task.id}
        key={task.id}
        name={task.name} 
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  })

  const filterList = FILTER_NAMES.map(name => {
    return (
      <FilterButton key={name} name={name} toggleTaskFilter={toggleTaskFilter}/>
    );
  })

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{tasks.length} task{tasks.length === 1 ? '' : 's'} remaining</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}


export default App;
