/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var TodoListItem = React.createClass({
  getInitialState: function() {
    return {editable: false};
  },

  render: function() {
    let todo = this.props.todo;
    
    let children = (<ul><li>fff</li></ul>);

    let input = (
      <div>
        <TodoTextInput
          textValue = {todo.text}
          saveItem = {this.updateText} />
        <p
          onClick = {this.makeChild}>
          Add Child-Todo
        </p>
        {children}
      </div>
    );

    let label = (
      <div>
        <input
          type = "checkbox"
          checked = {todo.completed}
          onChange = {this.toggleComplete}/>
        <label
          onClick = {this.editItem}>
          {todo.text}
        </label>
        {children}
        <button
          onClick = {this.removeItem}/>
      </div>
      );

    var item = this.state.editable ? input : label;
    
    return (
      <li key = {todo.id}>
        {item}
      </li>
    );
  },

  toggleComplete : function(){
    TodoActions.toggleComplete(this.props.todo);
  },

  removeItem : function(){
    TodoActions.remove(this.props.todo);
  },
  
  editItem : function(){
    this.setState({editable: true});

  },

  makeChild : function(){
    this.setState({editable: true});

  },
  updateText : function(text){
    TodoActions.updateText(this.props.todo, text);
    this.setState({editable: false});
  }
});

module.exports = TodoListItem;