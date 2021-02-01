import React from 'react';
import NewTaskForm from '../new-task-form';
import './task.css';
import TaskField from '../task-field'


const Task = (taskProps) => {
    let {showField} = {...taskProps};

    return (
      <div>
        <TaskField  {...taskProps}/>
        {/* <TaskField {...showField}/> */}
        <NewTaskForm fieldStatus = {showField} />
        {/* <input type="text" className="edit" value="Editing task" style={style} /> */}
      </div>  
    );
};
export default Task;