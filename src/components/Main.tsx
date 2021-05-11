import { useEffect } from 'react';
import { FC, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TaskService from '../service/TaskService';
import { ChangeEvent } from 'react';
import _, { filter } from "lodash";
import ITask from '../types/ITask';
const Moment = require('moment');

toast.configure()

enum SortDirection
{
    None = "",
    Asc = "asc",
    Desc = "desc"
}

// Home page display
const Main: FC = () => {

    // GET 
    const [search, setSearch] = useState("");
    const [taskData, setTaskData] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<SortDirection>(SortDirection.None);
    const service = new TaskService();

    const handlechange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    }

    const filterBy = (val: any) => {
        if (search == '') {
            return val;
        } else if (val.priority.toLowerCase().includes(search) || val.title.toLowerCase().includes(search) || val.priority.includes(search) || val.title.includes(search)) {
            return val;
        }
    }

    const fetchData = async () =>
    {
        const res = await service.get();
        setTaskData(res)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let currentData: ITask[] = _.cloneDeep(taskData);
        let sortedArray = currentData.sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'));
        if(sortBy === SortDirection.Desc){
            sortedArray.reverse()
        }
        setTaskData(sortedArray);
    }, [sortBy])

    function deleteTask(taskId: number) {
        const res = service.delete(taskId);
        if (res !== null) {
            setTaskData(taskData.filter(task => task.id !== taskId))
            console.log('Task Deleted.')
            toast.error('Task Deleted.', {
                autoClose: 2000
            });
        }
    }

    let history = useHistory();

    function updateTask (id: any) {
        console.log(id);
        history.push('/edit/' + id)
    }

    const [active, setActive] = useState(false);

    const toggleSortDate = () => {
        const val = sortBy === SortDirection.None || sortBy  === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc;
        setSortBy(val);
    }

    return (
        <div className="App">
        <div className="sub-header">
            <div className="sub-header__hamburger" onClick={() => setActive(!active)}>
                <div className={`sub-header__hamburger__line ${active ? 'sub-header__hamburger--active' : ''}`}></div>
            </div>
            <div className="sub-header__title">
                <div>Created Tasks</div>
            </div>
        </div>
        <div className="main">
            <div className={`main__sidebar ${active ? 'active' : ''}`}>
                <div className="main__sidebar__wrapper">
                    <Link className="main__sidebar__wrapper__link" to='/'><i className="icon icon--home spc--bottom--sm spc--right--sm"></i>Home</Link>
                    <Link className="main__sidebar__wrapper__link" to='/add'><i className="icon icon--add spc--bottom--sm spc--right--sm"></i>Add New</Link>
                </div>
            </div>
            <div className={ active ? "main__content" : "main__content--widthFull"}>
                <div className="main__content__filters">
                    <div className="main__content__filters__search">
                        <input type="text" placeholder="Search..." className="input--filter" onChange={handlechange}/>
                    </div>
                    <div className="main__content__filters__sort">
                        <button className="btn btn--transparent btn--med" onClick={toggleSortDate}>Sort by date</button>
                    </div>
                </div>
                {taskData.filter(filterBy).map(task => <div className={`task ${task.completed === true ? 'task--completed' : ''}`} key={task.id}>
                    <button className="btn task__button btn--success" onClick={() => updateTask(task.id)}><i className="icon icon--edit-black"></i></button>
                <div className="task__content">
                    <div className="task__content__item">{task.priority}</div>
                    <div className="task__content__item--center">{task.title}</div>
                    <div className="task__content__item">{task.date}</div>
                </div>
                {task.completed === false ? <button className="btn task__button btn--remove" onClick={() => deleteTask(task.id)}><i className="icon icon--remove"></i></button>
                : <button className="btn task__button btn--remove"><i className="icon icon--remove"></i></button>}
            </div>)}
            </div>
        </div>
        </div>
    );
};

export default Main;