var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  remove: function(todo){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE,
      id: todo.id
    });
  },

  removeAll: function(){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE_ALL,
    });
  },

  removeCompleted: function(todo){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE_COMPLETED,
    });
  },

  toggleComplete : function(todo){
    AppDispatcher.dispatch({
      actionType: todo.completed ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE,
      id: todo.id
    });
  },

  toggleCompleteAll : function(completed){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL,
    });
  }
};

module.exports = TodoActions;
