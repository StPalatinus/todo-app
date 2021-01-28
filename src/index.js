import React from 'react';
import ReactDOM from 'react-dom'
import Header from './header';
import TodoList from './todo-list';
import Footer from './footer';

const todoApp = (
  <section className="todoapp">
    <Header />
  <section className="main">
    <TodoList />
    <Footer />
  </section>
</section>
);

ReactDOM.render(todoApp,
  document.getElementById('appbody'));