import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    TaskList.defaultProps = {
      filterState: "All",
    }
  }

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

TaskList.propTypes = {
  tasksList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number, 
    PropTypes.bool,
    PropTypes.instanceOf(Date),
  ]))).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  taskStateChange: PropTypes.func.isRequired,
  filterState: PropTypes.string,
  onTaskChange: PropTypes.func,
}

export default TaskList;
