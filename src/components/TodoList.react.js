/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoListItem = require('./TodoListItem.react');

var TodoList = React.createClass({
  render: function() {
    let items = this.props.allTodos;
    let lists = [];

    for(let key in items){
      lists.push(<TodoListItem key={key} todo={items[key]}/>);
    }

    return (
      <div id="todo-list">
        <label>
        <input
          type = "checkbox"
          onChange = {this.completeAll}
          checked = {this.props.areAllCompleted ? 'checked' : ''}/>
          Complete All</label>
        <button
          onClick = {this.removeAll}
        >Remove All</button>
        <button
          onClick = {this.removeCompleted}
        >Remove Complete</button>
        <ul>{lists}</ul>
      </div>
    );
  },

  completeAll : function(){
    TodoActions.toggleCompleteAll();
  },
 
  removeAll : function(){
    TodoActions.removeAll();
  },

  removeCompleted : function(){
    TodoActions.removeCompleted();
  }
});

module.exports = TodoList;