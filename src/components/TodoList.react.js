/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoListItem = require('./TodoListItem.react');

var TodoList = React.createClass({
  getInitialState: function() {
    return {howTofilter: 'all'};
  },

  render: function() {
    let items = this.props.allTodos;
    let lists = [];

    for(let key in items){
      if (this.state.howTofilter=='incompleted'){
        if (items[key].completed==true)
          continue;
      }else if (this.state.howTofilter=='completed'){
        if (items[key].completed==false)
          continue;
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

        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "all"
          onChange = {this.toggleFilter}
          checked = {this.state.howTofilter == 'all'}/> 
          All
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "incompleted"
          onChange = {this.toggleFilter}
          checked = {this.state.howTofilter == 'incompleted'}/>
          Active
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "completed"
          onChange = {this.toggleFilter}
          checked = {this.state.howTofilter == 'completed'}/>
          Completed

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
  },

  toggleFilter : function(e){
    this.setState({howTofilter:e.target.value});
  },

});

module.exports = TodoList;