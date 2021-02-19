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
      id: () => {return Math.floor(Math.random() * 1000000)},
      created: new Date() - 1,
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

    const {description, editStatus, onTaskChange, id} = this.props;
    let newTaskForm;

    const formStyle = {
      display: editStatus ? 'block': 'none',
    };

    const taskStyle = {
      display: editStatus ? 'none': 'block'
    };

    if (editStatus) {
      newTaskForm = <NewTaskForm editStatus = { editStatus } 
                    description = { description }  
                    onTaskChange = { onTaskChange }
                    id = { id }
                    formStyle = {formStyle} />
    } else {
      newTaskForm = null;
    }
    
    return (
      <div>
        <TaskField  { ...this.props } 
                    taskStyle ={ taskStyle }
                    id = { id }  />
                    {newTaskForm}
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
  onTaskChange: PropTypes.func.isRequired,
  onTaskStateChange: PropTypes.func,
}

export default Task;