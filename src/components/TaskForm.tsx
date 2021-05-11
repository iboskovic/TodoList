import React, { ChangeEvent, useEffect, useState } from 'react';
import '../styles/App.scss';
import { toast } from 'react-toastify';
import moment from 'moment';
import ITask from '../types/ITask';
import { useParams } from 'react-router-dom';
import IParams from '../types/IParams';
import TaskService from '../service/TaskService';

toast.configure()

interface IProps{
    onSubmit: (task: ITask) => void
}

const TaskForm: React.FC<IProps> = (props) => {
    
    const { id } = useParams<IParams>();

    const service = new TaskService();

    const fetchData = async () =>
    {
        const res = await service.getId(id)

        setTask(res.data.title);
        setDate(res.data.date);
        setPrio(res.data.priority);
        setIsChecked(res.data.completed);
    }
    
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, []);

    
  // create state for active div class
  const [active, setActive] = useState(false);

  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [prio, setPrio] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setTask(event.target.value);
  };

  const handleDate = function (event: ChangeEvent<HTMLInputElement>) {
      setDate(event.target.value);
  }

  return (
        <div className={ active ? "main__content" : "main__content--widthFull"}>
            <div className="card">
                <div className="field">
                    <div className="field__label">Task name</div>
                    <input className="input" required type="text"  placeholder="Task name..." name="title" value={task} onChange={handleChange}/>
                </div>
                <div className="field">
                    <div className="field__label">Due Date</div>
                    <input className="input" type="date" name="date" value={date} onChange={handleDate}/>
                </div>
                <div className="field">
                    <div className="field__label">Priority</div>
                    <div className="field__select">
                        <select className="input input--dropdown" value={prio} onChange={(e) => {
                            const selectedOption = e.target.value;
                            setPrio(selectedOption);
                        }}>
                            <option value="">-Please select-</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
                    <div className="field card__checkBox">
                        <input className="input--check spc--right--sm" type="checkbox" checked={isChecked} onChange={(e) => {setIsChecked(e.target.checked)}} id="completed"/>
                        <label htmlFor="completed">Completed</label>
                    </div>
                <button className="btn btn--big" onClick={() =>props.onSubmit({title: task, date: date, priority: prio, completed: isChecked})}>Add Task / Update</button>
            </div>
        </div>
  )}

export default TaskForm;
