/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoListItem = require('./TodoListItem.react');
var TodoNavigation = require('./TodoNavigation.react');

var TodoList = React.createClass({

  render: function() {
    let items = this.props.allTodos;
    let lists = [];
    let numberTodoActive = 0;

    for(let key in items){
      if (!items[key].completed)
        numberTodoActive++;

      if (this.props.statusFilter=='incompleted'){
        if (items[key].completed){
          continue;
        }
      }else if (this.props.statusFilter=='completed'){
        if (!items[key].completed){
          continue;
        }
      }
      lists.push(<TodoListItem key={key} todo={items[key]}/>);
    }

    return (
      <div id="todo-list">
        <label>
          <input
            type = "checkbox"
            onChange = {this.completeAll}
            checked = {this.props.areAllCompleted}/>
          Complete All
        </label>

        <ul>{lists}</ul>

        <TodoNavigation statusFilter = {this.props.statusFilter} numberTodoActive={numberTodoActive} />
      </div>
    );
  },

  completeAll : function(){
    TodoActions.toggleCompleteAll();
  },

});

module.exports = TodoList;