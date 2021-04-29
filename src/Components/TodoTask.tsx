import React, { useState } from 'react';
import { ITask } from "../interfaces";

interface Props {
    task: ITask;
    completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {

    // creating state for toggling if task is checked
  const [checked, setChecked] = useState(false);

    return (
        <div className="task">
            <div className="task__line">
            </div>
            <button className="task__button task__button--success" onClick={() => setChecked(!checked)}><i className="icon--check"></i></button>
            <div className="content">
                <span id="spanTask" className={checked ? "checked" : "in-progress"}>{task.taskName}</span>
            </div>
            <button className="task__button task__button--remove" onClick={() => {completeTask(task.taskName)}}><i className="icon--remove"></i></button>
        </div>
    )
}

export default TodoTask;