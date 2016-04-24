/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');

var TodoNavigation = React.createClass({

  render: function() {
    return (
      <div>
        <p>{this.props.numberTodoActive} {this.props.numberTodoActive<2 ? 'item' : 'items'} left.</p>

        <button
          onClick = {this.removeAll}
        >Remove All</button>
        <button
          onClick = {this.removeCompleted}
        >Remove Complete</button>

        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "all"
          onChange = {this.toggleFilter}
          checked = {this.props.statusFilter == 'all'}/> 
          All
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "incompleted"
          onChange = {this.toggleFilter}
          checked = {this.props.statusFilter == 'incompleted'}/>
          Active
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "completed"
          onChange = {this.toggleFilter}
          checked = {this.props.statusFilter == 'completed'}/>
          Completed
      </div>
    );
  },
 
  removeAll : function(){
    TodoActions.removeAll();
  },

  removeCompleted : function(){
    TodoActions.removeCompleted();
  },

  toggleFilter : function(e){
    TodoActions.setStatusFilter(e.target.value);
  },

});

module.exports = TodoNavigation;