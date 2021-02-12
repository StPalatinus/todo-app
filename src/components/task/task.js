import React from 'react';
import NewTaskForm from '../new-task-form';
import './task.css';
import TaskField from '../task-field'

export default class Task extends React.Component {
  // constructor(props) {
  //   super(props);

  // }
  
  render() {
    const {description, editStatus, onTaskChange, id} = {...this.props};

    const formStyle = {
      display: editStatus ? 'block': 'none',
    };

    const taskStyle = {
      display: editStatus ? 'none': 'block'
    };
    
    return (
      <div>
        <TaskField  { ...this.props } 
                    taskStyle ={ taskStyle } />
        <NewTaskForm editStatus = { editStatus } 
                    description = { description }  
                    onTaskChange = { onTaskChange }
                    id = { id } 
                    formStyle = {formStyle} />
        {/* <input type="text" className="edit" value="Editing task" style={style} /> */}
      </div>  
    );
  }
}