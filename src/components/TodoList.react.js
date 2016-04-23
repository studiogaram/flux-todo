/*jshint esversion: 6 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var TodoList = React.createClass({
  getInitialState: function() {
    return {editable: false};
  },

  render: function() {
    let todo = this.props.todo;
  
    let input = (<TodoTextInput textValue = {todo.text} saveItem = {this.updateText} />);
    let label = (<label onClick = {this.ableEdit}>{todo.text}</label>);
    var text = this.state.editable ? input : label;
    
    return (
      <li key = {todo.id}>
        <div>
            <input
              type = "checkbox"
              checked = {todo.completed}
              onChange = {this.toggleComplete}
            />
            {text}
          <button onClick = {this.removeItem}/>
        </div>
      </li>
    );
  },

  toggleComplete : function(){
    TodoActions.toggleComplete(this.props.todo);
  },

  removeItem : function(){
    TodoActions.remove(this.props.todo);
  },
  
  ableEdit : function(){
    this.setState({editable: true});

  },

  updateText : function(text){
    TodoActions.updateText(this.props.todo, text);
    this.setState({editable: false});
  }
});

module.exports = TodoList;