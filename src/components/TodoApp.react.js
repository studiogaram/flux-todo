/*jshint esversion: 6 */

var React = require('react');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

const getTodoState = () => {
  return {
    allTodos: TodoStore.getAll()
  };
};

var TodoApp = React.createClass({
  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {},

  render: function() {
    return (
      <div>
        <TodoTextInput saveTodo = {this.saveTodo} />
      </div>
    );
  },
  // render: function() {
  //     return (
  //       <div>
  //         <Input></Input>
  //         <Lists></Lists>
  //         <Status></Status>
  //       </div>
  //     );
  // },
  _onChange: function() {
    this.setState(getTodoState());
  },

  saveTodo : function(text){
    TodoActions.create(text);
    console.log(this.state.allTodos);
  }
});

module.exports = TodoApp;
