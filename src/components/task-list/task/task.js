import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from './new-task-form';
import './task.css';
import TaskField from './task-field';

class Task extends React.Component {
  constructor(props) {
    super(props);

    Task.defaultProps = {
      description: "Default task",
      editStatus: false,
      completed: false,
      id: () => Math.floor(Math.random() * 1000000),
      onDelete: () => {},
      onEdit: () => {},
      onTaskChange: {},
      onTaskStateChange: () => {},
    }
  }
  

  focusTaskInput = () => {
    if (this.taskInput) this.taskInput.focus();
  }
  
  render() {

    const {description, editStatus, onTaskChange, id, onDelete} = this.props;
    let newTaskFieldOrForm;

    if (editStatus) {
      newTaskFieldOrForm = <NewTaskForm editStatus = { editStatus } 
                    description = { description }  
                    onTaskChange = { onTaskChange }
                    id = { id } 
                    deleteEmptyTask = { onDelete }/>
    } else {
      newTaskFieldOrForm = <TaskField  { ...this.props } 
                    id = { id } 
                    onDelete = { onDelete } />
    }
    
    return (
      <div>
        {newTaskFieldOrForm}
      </div>  
    );
  }
}

Task.propTypes = {
  description: PropTypes.string,
  editStatus: PropTypes.bool,
  id: PropTypes.number,
  created: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onTaskChange: PropTypes.func,
  onTaskStateChange: PropTypes.func,
  completed: PropTypes.bool,
}

export default Task;