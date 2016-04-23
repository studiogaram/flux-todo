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
    hasChild: [] // if has no child, it has []. can get array of child's id. if it's child node, it can get false.
  };
};

const update = (id, updates) => {
  _todos[id] = assign({}, _todos[id], updates);
};

const updateAll = (updates) => {
  for (var id in _todos) {
    update(id, updates);
  }
};

const remove = (id) => {
  delete _todos[id];
};

const removeAll = () => {
  for (var id in _todos) {
    remove(id);
  }
};

const removeCompleted = () => {
  for (var id in _todos) {
    if (!_todos[id].completed)
      remove(id);
  }
};

let TodoStore = assign({}, EventEmitter.prototype, {

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
  var text;

  switch(action.actionType){
    case TodoConstants.TODO_CREATE :
      text = action.text.trim();
      if(text !== ''){
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_UNDO_COMPLETE :
      _todos[action.id].completed = false;
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE :
      _todos[action.id].completed = true;
      TodoStore.emitChange();
      break;
  }
});

module.exports = TodoStore;
