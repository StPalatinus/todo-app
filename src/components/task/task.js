import React from 'react';
import NewTaskForm from '../new-task-form';
import './task.css';
import TaskField from '../task-field'

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    Task.defaultProps = {
      description: "Default task",
      editStatus: false,
      completed: false,
      id: 777,
      created: new Date() - 1,
      onDelete: () => {},
      onEdit: () => {},
      onTaskChange: {},
      onTaskStateChange: () => {},
    }
  }
  

  focusTaskInput = (_) => {
    if (this.taskInput) this.taskInput.focus();
  }
  
  render() {

    const {description, editStatus, onTaskChange, id} = this.props;

    let newTaskForm 

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