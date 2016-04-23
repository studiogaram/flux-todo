/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');

var TodoList = React.createClass({
  // getInitialState: function() {
  //   return getTodoState();
  // },

  render: function() {
    let todo = this.props.todo;

    return (
      <li key = {todo.id}>
        <div>
          <label> 
            <input
              type = "checkbox"
              checked = {todo.completed}
              onChange = {this.toggleComplete}
            />
          {todo.text} </label>
          <button onClick = {this.removeItem}/>
        </div>
      </li>
    );
  },

  toggleComplete : function(){
    TodoActions.toggleComplete(this.props.todo);
  },

  removeItem : function(){
    TodoActions.remove(this.props.todo);
  }
});

module.exports = TodoList;