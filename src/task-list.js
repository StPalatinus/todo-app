import React from 'react';
import Task from './task'
import './task-list.css';


const TaskList = ({ tasksList }) => {

  const tasks = tasksList.map((taskProps) => {
    return (
      <li className="completed">
          {/* <Task description={taskProps.description} created={taskProps.created} /> */}
          <Task {... taskProps} />
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