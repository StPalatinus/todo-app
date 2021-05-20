import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task-field.css';

const TaskField = (props) => {
  const { created, onTimerTick, workTime: propsWorkTime, description, completed } = props;

  TaskField.defaultProps = {
    description: 'Default task',
    completed: false,
    onDelete: () => {},
    onEdit: () => {},
    ontaskCompleteStateToggle: () => {},
    workTime: 0,
  };

  const [createTime] = useState(created);
  // const [tickCount, setTickCount] = useState(0);
  const [workTimerID, setworkTimerID] = useState(null);
  const [timerPlay, settimerPlay] = useState(false);
  // const [workTime, setWorkTime] = useState(propsWorkTime);
  const [workTime, setWorkTime] = useReducer((state, isTimerPlay) => {
    console.log(state);
    if (isTimerPlay) {
      onTimerTick(state + 1);
      return state + 1;
    }
    return null;
  }, propsWorkTime);

  const timerStart = () => {
    clearInterval(workTimerID);
    settimerPlay(true);
    // const newWorkTimerID = setInterval(() => {
    //   onTimerTick(workTime);
    //   setWorkTime((timerTime) => timerTime + 1);
    //   console.log(workTime);
    // }, 1000);
    // settimerPlay(true);
    // setworkTimerID(workTimerID);
  };

  const timerStop = () => {
    clearInterval(workTimerID);
    settimerPlay(false);
  };

  const onCheck = () => {
    props.ontaskCompleteStateToggle();
    timerStop();
  };

  const onTaskFieldFocus = () => {
    props.onEdit();
    timerStop();
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

  const tick = () => {
    // const newTick = tickCount + 1;
    // setTickCount(newTick + 1);
  };

  useEffect(() => {
    const taskStartTimerID = setInterval(() => tick(), 30000);
    return () => {
      clearInterval(taskStartTimerID);
      timerStop();
    };
  }, []);

  useEffect(() => {
    if (timerPlay) {
      const newWorkTimerID = setInterval(() => {
        setWorkTime(workTime + 1);
        console.log(workTime);
      }, 1000);
      setworkTimerID(newWorkTimerID);
    }

    return () => {
      clearInterval(workTimerID);
      settimerPlay(false);
    };
  }, [timerPlay]);
  // }, [ timerPlay, workTime ]);

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
        <span className="timer--elapsed-time">{formatTime(workTime)}</span>
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import toDate from 'date-fns/toDate'
import './task-field.css';

class TaskField extends React.Component {
  constructor(props) {
    super(props);

    const { created, onTimerTick, workTime } = this.props;

    TaskField.defaultProps = {
      description: 'Default task',
      completed: false,
      onDelete: () => {},
      onEdit: () => {},
      ontaskCompleteStateToggle: () => {},
      workTime: 0,
    };

    this.state = {
      createTime: created,
      workTime,
      tickCount: 0,
    };

    this.onCheck = () => {
      this.props.ontaskCompleteStateToggle();
      this.timer.stop();
    };

    this.onTaskFieldFocus = () => {
      this.props.onEdit();
    };

    this.timer = {
      workTimerID: null,
      start: () => {
       clearInterval(this.workTimerID);
        this.workTimerID = setInterval(() => {
          onTimerTick(this.state.workTime);
          this.setState((state) => {
            const newTime = state.workTime + 1;

            return {
              workTime: newTime,
            };
          });
        }, 1000);
      },
      stop: () => {
        clearInterval(this.workTimerID);
      },
    };

    this.formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 60 / 60);
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds - minutes * 60 - hours * 60 * 60;
      return `${hours}:${minutes}:${seconds}`;
    };
  }

  componentDidMount() {
    this.taskStartTimerID = setInterval(() => this.tick(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.taskStartTimerID);
    this.timer.stop();
  }

  tick() {
    const newTick = this.state.tickCount + 1;
    this.setState(() => ({
      tickCount: newTick,
    }));
  }

  render() {
    const { description, completed } = this.props;
    const { workTime } = this.state;
    let timer;

    if (!completed) {
      timer = (
        <span className="timer">
          <button className="icon icon-play" type="button" aria-label="Play" onClick={this.timer.start}>
            ▶
          </button>
          <button className="icon icon-pause" type="button" aria-label="Pause" onClick={this.timer.stop}>
            ⏸
          </button>
          <span className="timer--elapsed-time">{this.formatTime(workTime)}</span>
        </span>
      );
    } else {
      timer = (
        <span className="timer">
          <button className="icon icon-play" type="button" aria-label="Play" onClick={() => {}}>
            ▶
          </button>
          <button className="icon icon-pause" type="button" aria-label="Pause" onClick={() => {}}>
            ⏸
          </button>
          <span className="timer--elapsed-time">{this.formatTime(workTime)}</span>
        </span>
      );
    }

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={this.onCheck} />
        <label>
          <span className="description">{description}</span>
          {timer}
          <span className="created">{`${formatDistanceToNow(
            new Date(this.state.createTime),
            'MM/dd/yyyy'
          )}  ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={this.props.onEdit} type="button" aria-label="Edit" />
        <button className="icon icon-destroy" onClick={this.props.onDelete} type="button" aria-label="Remove" />
      </div>
    );
  }
}

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
*/
