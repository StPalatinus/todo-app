import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task-field.css';

class TaskField extends React.Component {
  constructor(props) {
    super(props);

    const { created } = this.props;

    TaskField.defaultProps = {
      description: 'Default task',
      completed: false,
      onDelete: () => {},
      onEdit: () => {},
      ontaskCompleteStateToggle: () => {},
    };

    this.state = {
      createTime: created,
    };

    this.onCheck = () => {
      this.props.ontaskCompleteStateToggle();
    };

    this.onTaskFieldFocus = () => {
      this.props.onEdit();
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(() => ({}));
  }

  render() {
    const { description } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={this.props.completed} onChange={this.onCheck} />
        <label>
          <span className="description">{description}</span>
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
};

export default TaskField;
