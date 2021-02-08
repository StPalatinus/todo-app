import React from 'react';
import './new-task-form.css';

const NewTaskForm = ({fieldStatus}) => {
    
    const style = {
      display: fieldStatus ? 'block': 'none',
    };

    return (
        <input type="text" className="edit" value="Editing task" style={style} />
    );
};
export default NewTaskForm;
