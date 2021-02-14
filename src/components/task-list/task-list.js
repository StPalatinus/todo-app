import React from 'react';
import Task from '../task'
import './task-list.css';

export default class TaskList extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    const { tasksList, onDelete, onEdit, taskStateChange, filterState, onTaskChange } = this.props
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
  }
}