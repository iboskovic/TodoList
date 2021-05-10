import { Fragment, useState } from 'react';
import '../styles/App.scss';
import {useHistory, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import IParams from '../types/IParams';
import TaskForm from './TaskForm';
import ITask from '../types/ITask';
import TaskService from '../service/TaskService';

toast.configure()

function Update () {

    const { id } = useParams<IParams>();

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
                <div className="subHeader__title">
                    <div>Edit task</div>
                </div>
            </div>
            <div className="main">
                <div className={`main__sidebar ${active ? 'active' : ''}`}>
                    <div className="main__sidebar__wrapper">
                    <a className="sideLinks"><i className="icon--home"></i>Home</a>
                    <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                    </div>
                </div>
                <div className={ active ? "main__content" : "main__content--widthFull"}>
                <TaskForm onSubmit={handleSubmit} />
                </div>
            </div>
        </Fragment>
    )
}

export default Update;