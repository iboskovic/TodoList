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
      <div className={ active ? "todoList" : "sidebar-inactive"}>
          <div className="form">
              <div className="form__taskName">
                  <div className="taskName">Task name</div>
                  <input required type="text"  placeholder="Task name..." name="title" value={task} onChange={handleChange}/>{/*onKeyUp={keyUp}*/}
              </div>
              <div className="form__dueDate">
                  <div className="dueDate">Due Date</div>
                  <input type="date" name="date" value={date} onChange={handleDate}/>
              </div>
              <div className="form__priority">
                  <div className="priority">Priority</div>
                  <div className="select">
                      <select value={prio} onChange={(e) => {
                          const selectedOption = e.target.value;
                          setPrio(selectedOption);
                      }}>
                          <option value="">-Please select-</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                      </select>
                  </div>
                  <div className="checkBox">
                      <input type="checkbox" checked={isChecked} onChange={(e) => {setIsChecked(e.target.checked)}} id="completed"/>
                      <label htmlFor="completed">Completed</label>
                  </div>
              </div>
              <button className="form__submitBtn" onClick={() =>props.onSubmit({title: task, date: date, priority: prio, completed: isChecked})}>Add Task / Update</button>
          </div>
      </div>
  )}

export default TaskForm;
// function TaskForm () {

  
// }

// export default TaskForm;