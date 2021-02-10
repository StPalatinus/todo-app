import React from 'react';
import Task from '../task'
import './task-list.css';


const TaskList = ({ tasksList, onDelete, onEdit, taskStateChange, filterState, onTaskChange }) => {

  let classList = ""; 

  const tasks = tasksList.map((taskProps) => {

    taskProps.completed ? classList = "completed" : classList = "";
    if (filterState === "Active" && taskProps.completed) {
      return false;
    }
    if (filterState === "Completed" && !taskProps.completed) {
      return false;
    }
    
    return (
      <li className={classList} key={taskProps.id}>
          <Task 
            {... taskProps} 
            onDelete = { () => onDelete(taskProps.id) } 
            onEdit = { () => onEdit(taskProps.id) }
            onTaskStateChange = { () => taskStateChange(taskProps.id) } 
            onTaskChange = { onTaskChange } />
      </li>
    );
  });

    return (
      <ul className="todo-list">
        { tasks }
      </ul>
    );
}; 

export default TaskList;