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
            checked = {this.props.areAllCompleted ? 'checked' : ''}/>
          Complete All
        </label>

        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "all"
          onChange = {this.filterTodo}
          checked = {this.state.howTofilter=='all' ? 'checked' : ''}/> 
          All
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "incompleted"
          onChange = {this.filterTodo}
          checked = {this.state.howTofilter=='incompleted' ? 'checked' : ''}/>
          Active
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "completed"
          onChange = {this.filterTodo}
          checked = {this.state.howTofilter=='completed' ? 'checked' : ''}/>
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

  filterTodo : function(e){
    this.setState({howTofilter:e.target.value});
  },

  // setFilterChecked : function(e){
  //   if(this.state.howTofilter == e.target.value)
  //     return 'checked';
  //   return '';
  // }
});

module.exports = TodoList;