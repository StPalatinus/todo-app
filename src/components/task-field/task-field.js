import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './task-field.css'

export default class TaskField extends React.Component {
  constructor(props) {
    super(props);

    TaskField.defaultProps = {
      description: "Default task",
      editStatus: false,
      completed: false,
      id: 777,
      onDelete: () => {},
      onEdit: () => {},
      onTaskChange: {},
      onTaskStateChange: () => {},
      taskStyle: {display: "block"},
    }

    // TaskField.defaultProps = {
    //   taskStyle: {
    //     display: "block",
    //     // checked: !this.props.completed,
    //   }
    // };

    this.state = {
      checStatus: this.props.completed,
    }

    this.onCeck = () => {

      this.props.onTaskStateChange();

      this.setState(() => {
  
        return {
          checStatus: !this.props.completed,
        };
      })
    }
    
    this.onTaskFieldFocus = () => {
      this.props.onEdit();
    }
  }

  render() {
  
  const { description, created } = this.props;

    return (
      <div className="view" style={this.props.taskStyle}>
        <input className="toggle" 
                type="checkbox" 
                checked = {this.state.checStatus}
                onChange = { this.onCeck } 
                />
        <label >
          <span className="description">{ description }</span>
          <span className="created">{ formatDistanceToNow(new Date(created), 'MM/dd/yyyy') + ' ago' }</span>
        </label>
        <button className="icon icon-edit" 
                onClick = {this.props.onEdit}></button>
        <button className="icon icon-destroy" 
                onClick = {this.props.onDelete}></button>
      </div>
    );
  }
}