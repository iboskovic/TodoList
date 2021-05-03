import React, { ChangeEvent, useState } from 'react';
import { ITask } from './interfaces';
import './Styles/App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
//import axios from './axios';

function AddNew () {

    const [task, setTask] = useState<string>("");
    const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [prio, setPrio] = useState("");
    const [todoList, setTodoList] = useState<ITask[]>([]);

    // POST
    const handleSubmit = () => {
        const data = {
            title: task,
            date: date,
            priority: prio 
        };
        axios.post(`http://localhost:3000/tasks`, data)
        .then(res => {
            console.log(res.data)
            console.log("TASK ADDED!")
            setTask('');
            setDate('');
            setPrio('');
        }).catch(err => {
            console.log(err)
        })
    }
        

    // create state for active div class
    const [active, setActive] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value);
    };

    const handleDate = function (event: ChangeEvent<HTMLInputElement>) {
        //console.log(event.target.value);
        setDate(event.target.value);
    }


    // const keyUp = (e: React.KeyboardEvent) => {
    //     if( e.keyCode === 13) {
    //         addTask();
    //     }
    // }

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
                    </div>
                </div>
                <div className={ active ? "todoList" : "sidebar-inactive"}>
                <div className="form">
                    <div className="form__taskName">
                        <div className="taskName">Task name</div>
                        <input required type="text"  placeholder="Task name..." name="title" value={task} onChange={handleChange}/>{/*onKeyUp={keyUp}*/}
                    </div>
                    <div className="form__dueDate">
                        <div className="dueDate">Due Date</div>
                        <input type="date" name="date" value={date} onChange={handleDate}/>
                    </div>
                    <div className="form__priority">
                        <div className="priority">Priority</div>
                        <div className="select">
                            <select value={prio} onChange={(e) => {
                                const selectedOption = e.target.value;
                                setPrio(selectedOption);
                            }}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    {/* <button className="form__submitBtn" onClick={addTask}>Add Task</button> */}
                    <button className="form__submitBtn" onClick={handleSubmit}>Add Task</button>
                </div>
                
                </div>
            </div>
        </Router>
    )
}

export default AddNew;