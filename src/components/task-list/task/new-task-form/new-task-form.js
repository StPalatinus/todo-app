import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.taskInput = React.createRef();

    const { description, onTaskChange, id, deleteEmptyTask} = this.props;

    NewTaskForm.defaultProps = {
      deleteEmptyTask: () => {},
    }
    
    this.state = {
      newTaskValue: description,
    }

    this.onButtonEnter = (evt) => {
      
      this.setState( ()=> ({
          newTaskValue: evt.target.value,
        }));
    };

    this.changeTask = (evt) => {
      
      evt.preventDefault();
      onTaskChange(this.state.newTaskValue, id);
      
      if (this.state.newTaskValue === "") {

        deleteEmptyTask(id);
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
          onChange = { this.onButtonEnter } />
    </form>
    );
  }
}

NewTaskForm.propTypes = {
  description: PropTypes.string.isRequired,
  onTaskChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  deleteEmptyTask: PropTypes.func,
}

export default NewTaskForm;