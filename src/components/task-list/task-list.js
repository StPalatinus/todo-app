import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Task from './task';
import './task-list.css';
import filterOptions from '../../assets/filter-options';

const TaskList = (props) => {
  TaskList.defaultProps = {
    filterState: filterOptions.displayActive,
  };

  const { tasksList, onDelete, onEdit, taskCompleteStateToggle, filterState, onTaskChange, saveTimerData } = props;

  const tasks = tasksList.map((taskProps) => {
    const classList = classNames({
      completed: taskProps.completed,
    });

    if (filterState === filterOptions.displayActive && taskProps.completed) {
      return;
    }
    if (filterState === filterOptions.displayCompleted && !taskProps.completed) {
      return;
    }

    return (
      <li className={classList} key={taskProps.id}>
        <Task
          {...taskProps}
          onDelete={() => onDelete(taskProps.id)}
          onEdit={() => onEdit(taskProps.id)}
          ontaskCompleteStateToggle={() => taskCompleteStateToggle(taskProps.id)}
          onTaskChange={onTaskChange}
          saveTimerData={saveTimerData}
        />
      </li>
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

TaskList.propTypes = {
  tasksList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.instanceOf(Date)])
    )
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  taskCompleteStateToggle: PropTypes.func.isRequired,
  filterState: PropTypes.string,
  onTaskChange: PropTypes.func.isRequired,
  saveTimerData: PropTypes.func.isRequired,
};

export default TaskList;
