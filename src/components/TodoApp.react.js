/*jshint esversion: 6 */

var React = require('react');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var TodoList = require('./TodoList.react');

const getTodoState = () => {
  return {
    allTodos: TodoStore.getAll(),
    areAllCompleted:TodoStore.areAllCompleted()
  };
};

var TodoApp = React.createClass({
  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <TodoTextInput saveItem = {this.createTodo} />
        <TodoList 
          allTodos={this.state.allTodos} 
          areAllCompleted={this.state.areAllCompleted}/>
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

  createTodo : function(text){
    TodoActions.create(text);
    console.log(this.state.allTodos);
  }
});

module.exports = TodoApp;
