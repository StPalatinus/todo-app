import React from 'react';
import './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTaskValue: "",
        }
        
        this.onButtonEnter = (e) => {

            if (e.charCode === 13 &&   e.target.value === "") {
                return;
            }
            if (e.charCode === 13){
                this.props.onTaskAdd(e.target.value);
                e.target.value = "";
            } else {
                this.setState = (e) => {
                    this.props.onTaskAdd(e.target.value);
                }
            }
        }
      }

      render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" 
                        placeholder = "What needs to be done?" 
                        onKeyPress = {this.onButtonEnter}
                        autoFocus 
                        // value = {this.state.newTaskValue} 
                        />
            </header>
        );
    }
}


/*
    export default class Header extends React.Component {
    constructor(props) {
        super(props);

        let text = "";
        
        this.onButtonEnter = (e) => {
            console.log(this.state);
            if (e.charCode === 13 &&  text === "" &&  e.target.value === "") {
                return;
            }
            if (e.charCode === 13){
                this.props.onTaskAdd(text);
                text = "";
                e.target.value = "";
            } else {
                // text = e.target.value;
                text += e.key;
            }
        }
      }

      render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" 
                        placeholder = "What needs to be done?" 
                        onKeyPress = {this.onButtonEnter}
                        autoFocus 
                        value = {this.state.newTasValue} />
            </header>
        );
    }
}
*/