import { useState } from 'react';
import '../styles/App.scss';
import { toast } from 'react-toastify';
import moment from 'moment';
import TaskForm from './TaskForm';
import ITasks from '../types/ITask';
import TaskService from '../service/TaskService';
import ITask from '../types/ITask';

toast.configure()

function AddNew () {

    // create state for active div class
    const [active, setActive] = useState(false);

    const [task, setTask] = useState<string>("");
    const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [prio, setPrio] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const service = new TaskService();

    const postData = async (data: ITask) =>
    {
        const res = await service.post(data);
        console.log(res.data);
        setTask('');
        setDate('');
        setPrio('');
        setIsChecked(isChecked);
        toast.success('Task Created.', {
            autoClose: 2000
        });
    }
    
    // POST
    const handleSubmit = (data: ITasks) => {
        postData(data);
    }

    return (
        <div>
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
                    <TaskForm onSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default AddNew;