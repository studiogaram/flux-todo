/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoList = React.createClass({
  render: function() {
    var todo = this.props.todo;

    return (
      <li key = {todo.id}>
        <div>
          <input
            type = "checkbox"
            checked = {todo.completed}
          />
          <label> {todo.text} </label>
          <button/>
        </div>
      </li>
    );
  },

});

module.exports = TodoList;