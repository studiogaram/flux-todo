/*jshint esversion: 6 */

import React from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import TodoList from './TodoList.react';

const getTodoState = () => {
  return {
    allTodos: TodoStore.getAll(),
    statusFilter: TodoStore.getStatusFilter(),
    completeParent: TodoStore.completeParent(),
    areAllCompleted: TodoStore.areAllCompleted(),
  };
};

var TodoApp = React.createClass({
  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {

    return (
      <div>
        <TodoTextInput saveItem = {this.createTodo} />
        <TodoList 
          allTodos={this.state.allTodos} 
          areAllCompleted={this.state.areAllCompleted}
          statusFilter={this.state.statusFilter}
          />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTodoState());
  },

  createTodo : function(text){
    TodoActions.create(text);
  }
});

module.exports = TodoApp;
