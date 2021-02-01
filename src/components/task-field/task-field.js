import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './task-field.css'

const TaskField = ({ description, created, showField }) => {
  const taskStyle = {
    display: showField ? 'none': 'block'
  };

  console.log(formatDistanceToNow(new Date(created), 'MM/dd/yyyy'));

  return (
      <div className="view" style={taskStyle}>
      <input className="toggle" type="checkbox"/>
      <label>
        <span className="description">{description}</span>
        <span className="created">{formatDistanceToNow(new Date(created), 'MM/dd/yyyy')}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};
export default TaskField;