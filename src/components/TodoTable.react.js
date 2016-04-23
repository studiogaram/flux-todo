/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoList = require('./TodoList.react');
var TodoTable = React.createClass({
  render: function() {
    let items = this.props.allTodos;
    let lists = [];

    for(let key in items){
      lists.push(<TodoList key={key} todo={items[key]}/>);
    }
    return (
      <div id="todo-list">
        <input type="checkbox"/>
        <label>Complete All</label>
        <ul>{lists}</ul>
      </div>
    );
  },

});

module.exports = TodoTable;