import React from 'react';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  
  constructor({ description, onTaskChange, id, formStyle }) {
    super({ description, onTaskChange, id, formStyle });

    this.state = {
      newTaskValue: description,
    }

    this.onButtonEnter = (e) => {

      this.setState({
        newTaskValue: e.target.value,
      })

      this.onTaskChange = (e) => {
        e.preventDefault();
        onTaskChange(this.state.newTaskValue, id);
      }
    }
  }
  

  render() {
  
  return (
    <form onSubmit = { this.onTaskChange }>
    <input type="text" 
          className="edit" 
          value = {this.state.newTaskValue}
          style = {this.props.formStyle}
          onChange = { this.onButtonEnter } />
    </form>
    );
  }
}