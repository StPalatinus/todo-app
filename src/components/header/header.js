import React from 'react';
import './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTaskValue: "",
        }
        
        this.onButtonEnter = (e) => {
            console.log(e.target.value);
            this.setState({
                newTaskValue: e.target.value,
            });
        }

        this.onSubmit = (e) => {
            e.preventDefault();
            this.props.onTaskAdd(this.state.newTaskValue);
            this.setState({
                newTaskValue: "",
            });
        };
      }

      render() {
        return (
            <header className="header"
                    onSubmit = {this.onSubmit}>
                <h1>todos</h1>
                <form className="todo-form" >
                <input className="new-todo" 
                        placeholder = "What needs to be done?" 
                        onChange = {this.onButtonEnter}
                        autoFocus 
                        value = {this.state.newTaskValue} 
                        />
                </form>
            </header>
        );
    }
}