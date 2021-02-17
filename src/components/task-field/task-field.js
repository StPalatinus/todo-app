import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task-field.css';

class TaskField extends React.Component {
  constructor(props) {
    super(props);

    const { created } = this.props;

    TaskField.defaultProps = {
      description: "Default task",
      editStatus: false,
      completed: false,
      // id: 777,
      id: () => {return Math.floor(Math.random() * 1000000)},
      onDelete: () => {},
      onEdit: () => {},
      onTaskChange: {},
      onTaskStateChange: () => {},
      taskStyle: {display: "block"},
    }

    this.state = {
      creatTime: created,
    }

    this.onCeck = () => {

      this.props.onTaskStateChange();

      // this.setState(() => {
  
      //   // return {
      //   //   checStatus: !this.props.completed,
      //   // };
      // })
    }
    
    this.onTaskFieldFocus = () => {
      this.props.onEdit();
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      30000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    
  const { description} = this.props;

    return (
      <div className="view" style={this.props.taskStyle}>
        <input className="toggle" 
                type="checkbox" 
                checked = {this.props.completed}
                onChange = { this.onCeck } 
                />
        <label >
          <span className="description">{ description }</span>
          <span className="created">{ formatDistanceToNow(new Date(this.state.creatTime), 'MM/dd/yyyy') + ' ago' }</span>
        </label>
        <button className="icon icon-edit" 
                onClick = {this.props.onEdit}></button>
        <button className="icon icon-destroy" 
                onClick = {this.props.onDelete}></button>
      </div>
    );
  }
}

TaskField.protoTypes ={
  completed: PropTypes.bool,
  created: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string,
  editStatus: PropTypes.bool,
  id: PropTypes.number,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onTaskChange: PropTypes.func.isRequired,
  onTaskStateChange: PropTypes.func,
  taskStyle: PropTypes.objectOf(PropTypes.string),
}

export default TaskField;


/*
  import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task-field.css';

class TaskField extends React.Component {
  constructor(props) {
    super(props);

    TaskField.defaultProps = {
      description: "Default task",
      editStatus: false,
      completed: false,
      // id: 777,
      id: () => {return Math.floor(Math.random() * 1000000)},
      onDelete: () => {},
      onEdit: () => {},
      onTaskChange: {},
      onTaskStateChange: () => {},
      taskStyle: {display: "block"},
    }

    // this.state = {
    //   checStatus: this.props.completed,
    // }

    this.onCeck = () => {

      this.props.onTaskStateChange();

      // this.setState(() => {
  
      //   // return {
      //   //   checStatus: !this.props.completed,
      //   // };
      // })
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
                checked = {this.props.completed}
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

TaskField.protoTypes ={
  completed: PropTypes.bool,
  created: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string,
  editStatus: PropTypes.bool,
  id: PropTypes.number,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onTaskChange: PropTypes.func.isRequired,
  onTaskStateChange: PropTypes.func,
  taskStyle: PropTypes.objectOf(PropTypes.string),
}

export default TaskField;
*/