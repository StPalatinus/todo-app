import React from 'react';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.taskInput = React.createRef();

    const { description, onTaskChange, id, formStyle } = this.props;
    
    // NewTaskForm.defaultProps = {
    //   formStyle: {
    //     display: "none",
    //   }
    // };
    
    this.state = {
      newTaskValue: description,
      formStyle: formStyle,
    }

    this.onButtonEnter = (e) => {
      
      this.setState({
        newTaskValue: e.target.value,
      })

      this.changeTask = (e) => {

        e.preventDefault();
        onTaskChange(this.state.newTaskValue, id);
      }
    }
  }

  componentDidMount() {
    this.taskInput.current.focus();
  }

  render() {

    return (
    <form onSubmit = { this.changeTask }>
    <input type="text" 
          className="edit" 
          ref = {this.taskInput}
          value = {this.state.newTaskValue}
          style = {this.props.formStyle}
          onChange = { this.onButtonEnter } />
    </form>
    );
  }
}