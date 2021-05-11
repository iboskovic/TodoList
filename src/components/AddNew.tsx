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
            <div className="sub-header">
                <div className="sub-header__hamburger" onClick={() => setActive(!active)}>
                    <div className={`sub-header__hamburger__line ${active ? 'sub-header__hamburger--active' : ''}`}></div>
                </div>
                <div className="sub-header__title">
                    <div>Create New Task</div>
                </div>
            </div>
            <div className="main">
                <div className={`main__sidebar ${active ? 'active' : ''}`}>
                    <div className="main__sidebar__wrapper">
                    <a className="main__sidebar__wrapper__link"><i className="icon icon--home spc--bottom--sm spc--right--sm"></i>Home</a>
                    <a className="main__sidebar__wrapper__link"><i className="icon icon--add spc--bottom--sm spc--right--sm"></i>Add New</a>
                    </div>
                </div>
                <div className={ active ? "main__content" : "main__content--widthFull"}>
                    <TaskForm onSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default AddNew;