/*jshint esversion: 6 */

import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

var TodoListItem = React.createClass({
  getInitialState: function() {
    return {editable: false, addable : false};
  },

  render: function() {
    let todo = this.props.todo;
    let inputEdit = (
      <div>
        <TodoTextInput
          textValue = {todo.text}
          saveItem = {this.updateText} />
      </div>
    );
    let inputAdd = (
      <div>
        <TodoTextInput
          saveItem = {this.createChildTodo} />
      </div>
    );

    let btnAddChild = (
      <button
        onClick = {this.setStateAddable}>
        Add Child-Todo
      </button>
    );

    let label = (
      <div>
        <input
          type = "checkbox"
          checked = {todo.completed}
          onChange = {this.toggleComplete}/>
        <label
          onClick = {this.setStateEditable}>
          {todo.text}
        </label>
        {todo.parentId ? '' : btnAddChild}
        <button
          onClick = {this.removeItem}/>
      </div>
    );

    var itemEdit = this.state.editable ? inputEdit : label;
    var itemAdd = this.state.addable ? inputAdd : '';
    
    return (
      <li key = {todo.id}>
        {itemEdit}
        {itemAdd}
      </li>
    );
  },

  toggleComplete : function(){
    TodoActions.toggleComplete(this.props.todo);
  },

  removeItem : function(){
    TodoActions.remove(this.props.todo);
  },
  
  setStateEditable : function(){
    this.setState({editable: true});

  },

  setStateAddable : function(){
    this.setState({addable: true});
  },

  createChildTodo : function(text){
    TodoActions.create(text, this.props.todo);
    this.setState({addable: false});
  },

  updateText : function(text){
    TodoActions.updateText(this.props.todo, text);
    this.setState({editable: false});
  }
});

module.exports = TodoListItem;