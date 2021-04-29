import React, { FC, ChangeEvent, useState } from 'react';
import TodoTask from './Components/TodoTask';
import { ITask } from './interfaces';
import { Link } from 'react-router-dom';
import './Styles/App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function AddNew () {

    const [task, setTask] = useState<string>("");
    const [date, setDate] = useState<Date | null>();
    const [prio, setPrio] =useState<string>("");
    const [todoList, setTodoList] = useState<ITask[]>([]);

    // create state for active div class
    const [active, setActive] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value);
    };

    const handleDate = (event: ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.type);
    }

    const addTask = (): void => {
        const newTask = {taskName: task, myDate: date}
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
    }

    return (
        <Router>
            <div className="subHeader">
                <div className="subHeader__hamburger" onClick={() => setActive(!active)}>
                    <div className={`subHeader__hamburger__line ${active ? 'active' : ''}`}></div>
                </div>
                <div className="subHeader__inputContainer">
                    <div className="createNew">Create New Task</div>
                </div>
            </div>
            <div className="section-container">
                {/* <div className={active ? "sidebar" : "inactive"}> */}
                <div className={`sidebar ${active ? 'active' : ''}`}>
                    <div className="sidebar__wrapper">
                    <a className="sideLinks"><i className="icon--home"></i>Home</a>
                    <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                    <a className="sideLinks">Link 3</a>
                    <a className="sideLinks">Link 4</a>
                    <a className="sideLinks">Link 5</a>
                    <a className="sideLinks">Link 6</a>
                    </div>
                </div>
                <div className={ active ? "todoList" : "sidebar-inactive"}>
                <div className="form">
                    <div className="form__taskName">
                        <div className="taskName">Task name</div>
                        <input required type="text"  placeholder="Task name..." name="task" value={task} onChange={handleChange}/>{/*onKeyUp={keyUp}*/}
                    </div>
                    <div className="form__dueDate">
                        <div className="dueDate">Due Date</div>
                        <input type="date" name="date" value="date" onChange={handleDate}/>
                    </div>
                    <div className="form__priority">
                        <div className="priority">Priority</div>
                        <div className="select">
                            <select>
                                <option value="0">High</option>
                                <option value="1">Medium</option>
                                <option value="2">Low</option>
                            </select>
                        </div>
                    </div>
                    <button className="form__submitBtn" onClick={addTask}>Add Task</button>
                </div>
                {todoList.map((task: ITask, key: number) => {
                    return <TodoTask key={key} task={task} completeTask={completeTask}/>;
                })}
                </div>
            </div>
        </Router>
    )
}

export default AddNew;