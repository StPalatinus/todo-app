import React from 'react';
import Task from '../task'
import './task-list.css';


const TaskList = ({ tasksList, onDelete, taskStateChange, filterState }) => {

  let classList = ""; 

  const tasks = tasksList.map((taskProps) => {

    taskProps.completed ? classList = "completed" : classList = "";
    if (filterState === "Active" && taskProps.completed) {
      return;
    }
    if (filterState === "Completed" && !taskProps.completed) {
      return;
    }
    
    return (
      <li className={classList} key={taskProps.id}>
          <Task 
            {... taskProps} 
            onDelete = { () => onDelete(taskProps.id) } 
            // onTaskStateChange = { () => console.log(taskProps.id) } />
            onTaskStateChange = { () => taskStateChange(taskProps.id) } />
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