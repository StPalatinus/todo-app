import React from 'react';
import NewTaskForm from './new-task-form';
import './task.css';


const Task = ({ description, created, ... rest}) => {
    // const style = {
    //   display: showField ? 'block': 'none'
    // };

    return (
      <div>
        <div className="view">
          <input className="toggle" type="checkbox"/>
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <NewTaskForm {... rest} />
        {/* <input type="text" className="edit" value="Editing task" style={style} /> */}
      </div>  
    );
};
export default Task;



/*E2
  <div className="view">
    <input className="toggle" type="checkbox"/>
    <label>
      <span className="description">Editing task</span>
      <span className="created">created 5 minutes ago</span>
    </label>
    <button className="icon icon-edit"></button>
    <button className="icon icon-destroy"></button>
  </div>
  <input type="text" className="edit" value="Editing task"/>
*/

/*E3
  <div className="view">
    <input className="toggle" type="checkbox"/>
    <label>
      <span className="description">Active task</span>
      <span className="created">created 5 minutes ago</span>
    </label>
    <button className="icon icon-edit"></button>
    <button className="icon icon-destroy"></button>
  </div>
*/