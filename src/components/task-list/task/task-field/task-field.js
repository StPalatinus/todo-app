import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task-field.css';

const TaskField = (props) => {
  const { created, onTimerTick, workTime: propsWorkTime, description, completed } = props;
  const timerRef = useRef(null);

  TaskField.defaultProps = {
    description: 'Default task',
    completed: false,
    onDelete: () => {},
    onEdit: () => {},
    ontaskCompleteStateToggle: () => {},
    workTime: 0,
  };

  const [createTime] = useState(created);
  const workTimerID = useRef(null);
  const [timerPlay, settimerPlay] = useState(false);
  const [workTime, setWorkTime] = useState(propsWorkTime);

  const timerStart = () => {
    clearInterval(workTimerID.current);
    settimerPlay(true);
  };

  const timerStop = () => {
    clearInterval(workTimerID.current);
    settimerPlay(false);
  };

  const onCheck = () => {
    props.ontaskCompleteStateToggle();
    // timerStop();
  };

  const onTaskFieldFocus = () => {
    props.onEdit();
    // timerStop();
  };

  const deleteTask = () => {
    props.onDelete();
    timerStop();
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 60 / 60);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60 - hours * 60 * 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  const tick = () => {};

  useEffect(() => {
    const taskStartTimerID = setInterval(() => tick(), 30000);
    return () => {
      clearInterval(taskStartTimerID);
    };
  }, []);

  useEffect(() => {
    if (timerPlay) {
      workTimerID.current = setInterval(() => {
        setWorkTime((timerTime) => timerTime + 1);
        onTimerTick(workTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(workTimerID.current);
    };
  });

  let timerComponent;

  if (!completed) {
    timerComponent = (
      <span className="timer">
        <button className="icon icon-play" type="button" aria-label="Play" onClick={timerStart}>
          ▶
        </button>
        <button className="icon icon-pause" type="button" aria-label="Pause" onClick={timerStop}>
          ⏸
        </button>
        <span className="timer--elapsed-time">{formatTime(workTime)}</span>
      </span>
    );
  } else {
    timerComponent = (
      <span className="timer">
        <button className="icon icon-play" type="button" aria-label="Play" onClick={() => {}}>
          ▶
        </button>
        <button className="icon icon-pause" type="button" aria-label="Pause" onClick={() => {}}>
          ⏸
        </button>
        <span className="timer--elapsed-time" ref={timerRef}>
          {formatTime(workTime)}
        </span>
      </span>
    );
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={completed} onChange={onCheck} />
      <label>
        <span className="description">{description}</span>
        {timerComponent}
        <span className="created">{`${formatDistanceToNow(new Date(createTime), 'MM/dd/yyyy')}  ago`}</span>
      </label>
      <button className="icon icon-edit" onClick={onTaskFieldFocus} type="button" aria-label="Edit" />
      <button className="icon icon-destroy" onClick={deleteTask} type="button" aria-label="Remove" />
    </div>
  );
};

TaskField.propTypes = {
  completed: PropTypes.bool,
  created: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  ontaskCompleteStateToggle: PropTypes.func,
  onTimerTick: PropTypes.func.isRequired,
  workTime: PropTypes.number,
};

export default TaskField;
