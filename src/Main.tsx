import React, { Component, useEffect } from 'react';
import { FC, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ITask } from "./interfaces";
import { request } from 'node:http';

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
                alert("Task Deleted.");
                setTaskData(taskData.filter(task => task.id !== taskId))
            }
        });
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
                    <Link to='/'>
                        <a className="sideLinks"><i className="icon--home"></i>Home</a>
                    </Link>
                    <Link to ='/addnew'>
                        <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                    </Link>
                </div>
            </div>
            <div className={ active ? "todoList" : "sidebar-inactive"}>
            {taskData.map(task =><div className="task" key={task.id}>
                <div className="task__line">
                </div>
                <button className="task__button task__button--success"><i className="icon--edit-black"></i></button>
                <div className="content">
                    <div id="divTask">
                        <div className="prio">{task.priority}</div>
                        {/* <div className={`taskNameMiddle ${checked ? "checked" : "in-progress"}`}>{task.title}</div> */}
                        <div className="taskNameMiddle">{task.title}</div>
                        <div className="date">{task.date}</div>
                    </div>
                    
                </div>
                <button className="task__button task__button--remove" onClick={() => deleteTask(task.id)}><i className="icon--remove"></i></button>
            </div>)}
            </div>
        </div>
        </div>
    );
};

  export default Main;