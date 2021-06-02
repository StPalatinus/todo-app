import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from './new-task-form';
import './task.css';
import TaskField from './task-field';

const Task = (props) => {
  const { id, saveTimerData, description, editStatus, onTaskChange, onDelete } = props;

  Task.defaultProps = {
    description: 'Default task',
    editStatus: false,
    completed: false,
    id: () => Math.floor(Math.random() * 1000000),
    onDelete: () => {},
    onEdit: () => {},
    onTaskChange: {},
    onTaskStateChange: () => {},
  };

  const assignTimerToId = (timeElapsed) => {
    saveTimerData(timeElapsed, id);
  };

  // const { description, editStatus, onTaskChange, onDelete } = props;
  let newTaskFieldOrForm;

  if (editStatus) {
    newTaskFieldOrForm = (
      <NewTaskForm
        editStatus={editStatus}
        description={description}
        onTaskChange={onTaskChange}
        id={id}
        deleteEmptyTask={onDelete}
      />
    );
  } else {
    newTaskFieldOrForm = <TaskField {...props} id={id} onDelete={onDelete} onTimerTick={assignTimerToId} />;
  }

  return <div>{newTaskFieldOrForm}</div>;
};

Task.propTypes = {
  description: PropTypes.string,
  editStatus: PropTypes.bool,
  id: PropTypes.string,
  created: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onTaskChange: PropTypes.func,
  onTaskStateChange: PropTypes.func,
  completed: PropTypes.bool,
  saveTimerData: PropTypes.func.isRequired,
};

export default Task;
