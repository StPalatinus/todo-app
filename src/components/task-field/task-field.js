import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './task-field.css'

export default class TaskField extends React.Component {
  constructor(props) {
    super(props);
    
    this.onLabelClick = () => {
      this.props.onTaskStateChange();
    }
  }

    render() {

    const { description, created, showField } = this.props;

    const taskStyle = {
      display: showField ? 'none': 'block'
    };

    return (
      <div className="view" style={taskStyle}>
        <input className="toggle" type="checkbox"/>
        <label onClick = { this.onLabelClick }>
          <span className="description">{ description }</span>
          <span className="created">{ formatDistanceToNow(new Date(created), 'MM/dd/yyyy') + ' ago' }</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick = {this.props.onDelete}></button>
      </div>
    );
  }
}