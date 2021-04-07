import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
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
    };

    this.onCheck = () => {
      this.props.ontaskCompleteStateToggle();
    };

    this.onTaskFieldFocus = () => {
      this.props.onEdit();
    };

    this.timer = {
      workTimer: this.state.workTime,
      start: () => {
        this.workTimer = setInterval(() => {
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
        clearInterval(this.workTimer);
      },
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
    this.setState(() => ({}));
  }

  render() {
    const { description } = this.props;
    const { workTime } = this.state;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={this.props.completed} onChange={this.onCheck} />
        <label>
          <span className="description">{description}</span>
          <span className="timer">
            <button className="icon icon-play" type="button" aria-label="Play" onClick={this.timer.start}>
              ▶
            </button>
            <button className="icon icon-pause" type="button" aria-label="Pause" onClick={this.timer.stop}>
              ⏸
            </button>
            <span className="timer--elapsed-time">{workTime}</span>
          </span>
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
