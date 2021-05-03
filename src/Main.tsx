import React, { Component, useEffect } from 'react';
import { FC, useState } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ITask } from "./interfaces";
import { request } from 'node:http';
import { prependOnceListener } from 'node:process';

// Home page display
const Main: FC = () => {

    // GET 
    const [taskData, setTaskData] = useState<any[]>([])

    useEffect(() => {
        axios.get(`http://localhost:3000/tasks`).then(res => {
            // console.log(res)
            setTaskData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    function deleteTask(taskId: number) {
        axios.delete(`http://localhost:3000/tasks/` + taskId).then(res => {
            if(res.data != null) {
                console.log('Task deleted.');
                setTaskData(taskData.filter(task => task.id !== taskId));
            }
        });
    }

    let history = useHistory();

    function updateTask (id: any) {
        console.log(id);
        history.push('/edit/' + id)
    }

    // create state for active div class
    const [active, setActive] = useState(false);

    // const [checked, setChecked] = useState(false);

    return (
        <div className="App">
        <div className="subHeader">
            <div className="subHeader__hamburger" onClick={() => setActive(!active)}>
                <div className={`subHeader__hamburger__line ${active ? 'active' : ''}`}></div>
            </div>
            <div className="subHeader__inputContainer">
            <div className="created">Created Tasks</div>
            </div>
        </div>
        <div className="section-container">
            {/* <div className={active ? "sidebar" : "inactive"}> */}
            <div className={`sidebar ${active ? 'active' : ''}`}>
                <div className="sidebar__wrapper">
                    <Link className="sideLinks" to='/home'><i className="icon--home"></i>Home</Link>
                    <Link className="sideLinks" to ='/addnew'><i className="icon--add"></i>Add New</Link>
                </div>
            </div>
            <div className={ active ? "todoList" : "sidebar-inactive"}>
            {taskData.map(task =><div className="task" key={task.id}>
                <div className="task__line">
                </div>
                    <button className="task__button task__button--success" onClick={() => updateTask(task.id)}><i className="icon--edit-black"></i></button>
                <div className="content">
                    <div id="divTask">
                        <div className="prio">{task.priority}</div>
                        {/* <div className={`taskNameMiddle ${checked ? "checked" : "in-progress"}`}>{task.title}</div> */}
                        <div className="taskNameMiddle">{task.title}</div>
                        <div className="date">{task.date}</div>
                    </div>
                </div>
                <button className="task__button task__button--remove" onClick={() => deleteTask(task.id)}><i className="icon--remove"></i></button>
                {/* <input className="checkBox" type="checkbox"></input> */}
            </div>)}
            </div>
        </div>
        </div>
    );
};

  export default Main;