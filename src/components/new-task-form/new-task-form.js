import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.taskInput = React.createRef();

    const { description, onTaskChange, id, formStyle } = this.props;
    
    this.state = {
      newTaskValue: description,
      formStyle: formStyle,
    }

    this.onButtonEnter = (e) => {
      
      this.setState({
        newTaskValue: e.target.value,
      })
    }

    this.changeTask = (e) => {

      e.preventDefault();
      onTaskChange(this.state.newTaskValue, id);
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

NewTaskForm.propTypes = {
  description: PropTypes.string.isRequired,
  onTaskChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  formStyle: PropTypes.object.isRequired,
}

export default NewTaskForm;