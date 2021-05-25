import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm = (props) => {
  const taskInput = useRef(null);

  const { description, onTaskChange, id, deleteEmptyTask } = props;

  NewTaskForm.defaultProps = {
    deleteEmptyTask: () => {},
  };

  const [newTaskValue, setNewTaskValue] = useState(description);

  const onButtonEnter = (evt) => {
    setNewTaskValue(evt.target.value);
  };

  const changeTask = (evt) => {
    evt.preventDefault();
    onTaskChange(newTaskValue, id);

    if (newTaskValue === '') {
      deleteEmptyTask(id);
    }
  };

  useEffect(() => {
    taskInput.current.focus();
  }, []);

  return (
    <form onSubmit={changeTask}>
      <input type="text" className="edit" ref={taskInput} value={newTaskValue} onChange={onButtonEnter} />
    </form>
  );
};

NewTaskForm.propTypes = {
  description: PropTypes.string.isRequired,
  onTaskChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  deleteEmptyTask: PropTypes.func,
};

export default NewTaskForm;
