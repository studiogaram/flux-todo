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
        <label>
        <input
          type = "checkbox"
          onChange = {this.completeAll}
          checked = {this.props.areAllCompleted ? 'checked' : ''}/>
          Complete All</label>
        <ul>{lists}</ul>
      </div>
    );
  },

  completeAll : function(){
    TodoActions.toggleCompleteAll();
  }

});

module.exports = TodoTable;