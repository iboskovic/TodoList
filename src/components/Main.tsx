import { useEffect } from 'react';
import { FC, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';

toast.configure()

// Home page display
const Main: FC = () => {

    // GET 
    const [taskData, setTaskData] = useState<any[]>([])

    useEffect(() => {
        axios.get(`http://localhost:3000/tasks`).then(res => {
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
        toast.error('Task Deleted.', {
            autoClose: 2000
        });
    }

    let history = useHistory();

    function updateTask (id: any) {
        console.log(id);
        history.push('/edit/' + id)
    }

    // create state for active div class
    const [active, setActive] = useState(false);

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
            <div className={`sidebar ${active ? 'active' : ''}`}>
                <div className="sidebar__wrapper">
                    <a className="sideLinks"><i className="icon--home"></i>Home</a>
                    <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                </div>
            </div>
            <div className={ active ? "todoList" : "sidebar-inactive"}>
            {taskData.map(task =><div className={`task ${task.completed === true ? 'completed' : ''}`} key={task.id}>
                <div className="task__line">
                </div>
                    <button className="task__button task__button--success" onClick={() => updateTask(task.id)}><i className="icon--edit-black"></i></button>
                <div className="content">
                    <div id="divTask">
                        <div className="prio">{task.priority}</div>
                        <div className="taskNameMiddle">{task.title}</div>
                        <div className="date">{task.date}</div>
                    </div>
                </div>
                {task.completed === false ? <button className="task__button task__button--remove" onClick={() => deleteTask(task.id)}><i className="icon--remove"></i></button>
                : <button className="task__button task__button--remove"><i className="icon--remove"></i></button>}
            </div>)}
            </div>
        </div>
        </div>
    );
};

export default Main;