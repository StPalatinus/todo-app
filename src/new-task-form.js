import React from 'react';
import './new-task-form.css'

const NewTaskForm = ({ showField = false }) => {
    const style = {
      display: showField ? 'block': 'none'
    };

    return (
        <input type="text" className="edit" value="Editing task" style={style} />
    );
};
export default NewTaskForm;


/*V1
    import React from 'react';
    import './new-task-form.css'

    const NewTaskForm = ({ showField = false }) => {
        const style = {
        display: showField ? 'block': 'none'
        };

        return (
            <span>
                <input type="text" className="edit" value="Editing task" style={style} />
            </span>
        );
    };
    export default NewTaskForm;
*/
