/*jshint esversion: 6 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

let _todos = {};

const create = (text) => {
  var id = (+new Date() + Math.floor(Math.random() * 999999));

  _todos[id] = {
    id: id,
    completed: false,
    text: text,
    isChild : false,
    hasChild: {} // if has no child, it has []. can get array of child's id. if it's child node, it can get false.
  };
};

const update = (id, updates) => {
  _todos[id] = assign({}, _todos[id], updates);
};

const updateAll = (updates) => {
  for (let id in _todos) {
    update(id, updates);
  }
};

const remove = (id) => {
  delete _todos[id];
};

const removeAll = () => {
  for (let id in _todos) {
    remove(id);
  }
};

const removeCompleted = () => {
  for (let id in _todos) {
    if (_todos[id].completed)
      remove(id);
  }
};

let TodoStore = assign({}, EventEmitter.prototype, {
  areAllCompleted : function(){
    for (let id in _todos){
      if(!_todos[id].completed)
        return false;
    }
    return true;

  },

  getAll: function() {
    return _todos;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((action)=>{
  let text;

  switch(action.actionType){
    case TodoConstants.TODO_CREATE :
      text = action.text.trim();
      if(text !== ''){
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_UNDO_COMPLETE :
      update(action.id, {completed :false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE :
      update(action.id, {completed :true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL :
      if(TodoStore.areAllCompleted()){
        updateAll({completed :false});
      }else{
        updateAll({completed :true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_REMOVE :
      remove(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_REMOVE_ALL :
      removeAll();
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_REMOVE_COMPLETED :
      removeCompleted();
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT :
      text = action.text.trim();
      if(text !== ''){
        update(action.id, {text :text});
        TodoStore.emitChange();
      }
      break;
      
  }
});

module.exports = TodoStore;
