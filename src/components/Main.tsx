import { useEffect } from 'react';
import { FC, useState } from "react";
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TaskService from '../service/TaskService';
import { ChangeEvent } from 'react';
import _, { filter } from "lodash";
import ITask from '../types/ITask';

toast.configure()

enum SortDirection
{
    Asc = "asc",
    Desc = "desc"
}

// Home page display
const Main: FC = () => {

    // GET 
    const [search, setSearch] = useState("");
    const [taskData, setTaskData] = useState<any[]>([]);
    const service = new TaskService();

    const handlechange = (event: ChangeEvent<HTMLInputElement>): void => {
        // console.log(event.target.value);
        setSearch(event.target.value);
        // let currentData: ITask[] = _.cloneDeep(taskData);
        // setSearch(event.target.value);
        // const data = currentData.filter(val => {
        //     if (search == '') {
        //         return val;
        //     } else if (val.priority.toLowerCase().includes(search) || val.title.toLowerCase().includes(search)) {
        //         return val;
        //     }
        // });

        // console.log(data);
        // setTaskData(data); 
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
    
    // create state for active div class
    const [active, setActive] = useState(false);
    
    const Moment = require('moment');
    let currentData: ITask[] = _.cloneDeep(taskData);
    let sortedArrayDesc = currentData.sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'));
    let sortedArrayAsc = sortedArrayDesc.reverse();
    const sortDateNew = () => {
        setTaskData(sortedArrayDesc);
    }

    const sortDateOld = () => {
        setTaskData(sortedArrayAsc);
    }
    // let sortDirection  = SortDirection.Desc;
    // const toggleSortDate = () => {
    //     const Moment = require('moment');
    //     let currentData: ITask[] = _.cloneDeep(taskData);
    //     let sortedArray = currentData.sort((a, b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'));
    //     if(sortDirection === SortDirection.Asc)
    //         sortedArray.reverse()

    //     // console.log(sortDirection);
    //     console.log(sortedArray);
    //     // setTaskData(sortedArray);
    //     sortDirection = sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc; 
    // }

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
        <div className="flex">
            <div className={`sidebar ${active ? 'active' : ''}`}>
                <div className="sidebar__wrapper">
                    <a className="sideLinks"><i className="icon--home"></i>Home</a>
                    <a className="sideLinks"><i className="icon--add"></i>Add New</a>
                </div>
            </div>
            <div className={ active ? "todoList" : "sidebar-inactive"}>
            <div className="filterContainer">
                <div className="filterContainer__filter">
                    <input type="text" placeholder="Search..." className="filter--input" onChange={handlechange}/>
                </div>
                <div className="filterContainer__sort">
                    <button className="sort--input" onClick={sortDateNew}>Sort by newer</button>
                    <button className="sort--input" onClick={sortDateOld}>Sort by older</button>
                </div>
            </div>
            {taskData.filter(filterBy).map(task =><div className={`task ${task.completed === true ? 'completed' : ''}`} key={task.id}>
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