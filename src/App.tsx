import React, { FC, ChangeEvent, useState } from 'react';
import './Styles/App.scss';
import TodoTask from './Components/TodoTask';
import { ITask } from './interfaces';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  // create state for active div class
  const [active, setActive] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    const newTask = {taskName: task}
    setTodoList([...todoList, newTask]);
    //console.log(todoList);
    setTask("");
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }

  const keyUp = (e: React.KeyboardEvent) => {
    if( e.keyCode === 13) {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header__links">
          <a>Link 1</a>
          <a>Link 2</a>
          <a>Link 3</a>
          <a>Link 4</a>
        </div>
        <div className="header__hamburger" onClick={() => setActive(!active)}>
          <div className={`header__hamburger__line ${active ? 'active' : ''}`}></div>
        </div>
      </div>
      <div className="subHeader">
        <div className="subHeader__inputContainer">
          <input type="text" onKeyUp={keyUp} placeholder="Insert task..." name="task" value={task} onChange={handleChange}/>
          <button type="submit" onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="section-container">
          {/* <div className={active ? "sidebar" : "inactive"}> */}
          <div className={`sidebar ${active ? 'active' : ''}`}>
            <div className="sidebar__wrapper">
              <a>Link 1</a>
              <a>Link 2</a>
              <a>Link 3</a>
              <a>Link 4</a>
              <a>Link 5</a>
              <a>Link 6</a>
            </div>
          </div>
        <div className={ active ? "todoList" : "sidebar-inactive"}>
          {todoList.map((task: ITask, key: number) => {
            return <TodoTask key={key} task={task} completeTask={completeTask}/>;
          })}
        </div>
      </div>
      </div>
  );
}

export default App;
