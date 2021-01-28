import React from 'react';
import Task from './task'


const TaskList = ({ tasksList }) => {

  const tasks = tasksList.map((taskProps) => {
    return (
      <li className="completed">
          {/* <Task description={taskProps.description} created={taskProps.created} /> */}
          <Task {... taskProps} />
      </li>
    );
  });
    return (
      <ul className="todo-list">
        { tasks }
      </ul>
    );
}; 

export default TaskList;


/* VERSION WITH DIRECT ARGUMENTS PASS 
  const taskData = [
  { label : {
    description: 'Completed task',
    created: 'created 17 seconds ago'
  } },
  { label : {
    description: 'Editing task',
    created: 'created 5 seconds ago'
  } },
  { label : {
    description: 'Active task',
    created: 'created 5 seconds ago'
  } }
];

class TaskList  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <ul className="todo-list">
        <li className="completed">
          <Task description="Completed task" created = "created 17 seconds ago" />
        </li>
        <li className="editing">
        <Task description="Editing task" created = "created 5 seconds ago" />
        </li>
        <li>
        <Task description="Active task" created = "created 5 seconds ago" />
        </li>
      </ul>
    );
  }
}; 

export default TaskList;
*/