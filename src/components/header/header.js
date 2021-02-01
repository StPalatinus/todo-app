import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autofocus/>
        </header>
    );
}; 

export default Header;