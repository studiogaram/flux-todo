/*jshint esversion: 6 */

import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ditable: false,
      addable : false
    };
    this.toggleComplete = this.toggleComplete.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setStateEditable = this.setStateEditable.bind(this);
    this.setStateAddable = this.setStateAddable.bind(this);
    this.createChildTodo = this.createChildTodo.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  render() {
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
  }

  toggleComplete(){
    TodoActions.toggleComplete(this.props.todo);
  }

  removeItem(){
    TodoActions.remove(this.props.todo);
  }
  
  setStateEditable(){
    this.setState({editable: true});

  }

  setStateAddable(){
    this.setState({addable: true});
  }

  createChildTodo(text){
    TodoActions.create(text, this.props.todo);
    this.setState({addable: false});
  }

  updateText (text){
    TodoActions.updateText(this.props.todo, text);
    this.setState({editable: false});
  }
}