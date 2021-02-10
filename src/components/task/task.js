import React from 'react';
import NewTaskForm from '../new-task-form';
import './task.css';
import TaskField from '../task-field'


const Task = (taskProps) => {
    const {description, editStatus, onTaskChange, id} = {...taskProps};

    const formStyle = {
      display: editStatus ? 'block': 'none',
    };

    const taskStyle = {
      display: editStatus ? 'none': 'block'
    };
    
    return (
      <div>
        <TaskField  { ...taskProps } 
                    taskStyle ={ taskStyle } />
        <NewTaskForm editStatus = { editStatus } 
                    description = { description }  
                    onTaskChange = { onTaskChange }
                    id = { id } 
                    formStyle = {formStyle}/>
        {/* <input type="text" className="edit" value="Editing task" style={style} /> */}
      </div>  
    );
};
export default Task;