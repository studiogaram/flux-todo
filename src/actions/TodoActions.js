/*jshint esversion: 6 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

var TodoActions = {

  create: function(text, parentTodo = false) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      parentId : parentTodo ? parentTodo.id : false,
      text: text,
    });
  },

  updateText : function(todo, text){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: todo.id,
      parentId: todo.parentId,
      text: text
    });
  },

  remove: function(todo){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE,
      id: todo.id,
      parentId: todo.parentId
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
      id: todo.id,
      parentId: todo.parentId,
    });
  },

  toggleCompleteAll : function(completed){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL,
    });
  },

  setStatusFilter : function(filter){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_SET_STATUS_FILTER,
      filter: filter
    });
  }
};

module.exports = TodoActions;
