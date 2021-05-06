import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import '../styles/App.scss';
import {useHistory, useParams} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import IParams from '../types/IParams';
import TaskForm from './TaskForm';
import ITask from '../types/ITask';
import TaskService from '../service/TaskService';

toast.configure()

function Update () {

    const { id } = useParams<IParams>();
    
    const [task, setTask] = useState<string>("");
    const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [prio, setPrio] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const service = new TaskService();

    function updateData (data: ITask)
    {
        const res = service.put(id, data);
        console.log('Changes Saved.')
        history.push("/");
    }
    // PUT
    let history = useHistory();
    const handleSubmit = (data: ITask) => {
        updateData(data);
        // axios.put(`http://localhost:3000/tasks/` + id, data)
        // .then(res => {
        //     console.log(res.data)
        //     console.log("Changes Saved.")
        //     setTask('');
        //     setDate('');
        //     setPrio('');
        //     setIsChecked(isChecked);
        //     history.push("/")
        // }).catch(err => {
        //     console.log(err)
        // })
        toast.info('Task Updated.', {
            autoClose: 2000
        });
    }
        

    // create state for active div class
    const [active, setActive] = useState(false);

    return (
        <Fragment>
            <div className="subHeader">
                <div className="subHeader__hamburger" onClick={() => setActive(!active)}>
                    <div className={`subHeader__hamburger__line ${active ? 'active' : ''}`}></div>
                </div>
                <div className="subHeader__inputContainer">
                    <div className="createNew">Create New Task</div>
                </div>
            </div>
            <div className="flex">
                <div className={`sidebar ${active ? 'active' : ''}`}>
                    <div className="sidebar__wrapper">
                    <a className="sideLinks"><i className="icon--home"></i>Home</a>
                    <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                    </div>
                </div>
                <div className={ active ? "todoList" : "sidebar-inactive"}>
                <TaskForm onSubmit={handleSubmit} />
                </div>
            </div>
        </Fragment>
    )
}

export default Update;