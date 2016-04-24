/*jshint esversion: 6 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

let _todos = {};
let _statusFilter = 'all';

const create = (text, parentId) => {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(32);
  let item = {
    id: id,
    completed: false,
    text: text,
    parentId : parentId ? parentId : false,
    children: parentId ? false : {},
  };

  parentId ? _todos[parentId].children[id] = item : _todos[id] = item;

};

const updateCompleted = (id, parentId, updates) => {
  if (parentId){
    _todos[parentId].children[id] = assign({}, _todos[parentId].children[id], updates);

  }else{
    _todos[id] = assign({}, _todos[id], updates);

    for (let childKey in _todos[id].children){
      _todos[id].children[childKey] = assign({}, _todos[id].children[childKey], updates);
    }
  }
};

const updateText = (id, parentId, updates) => {
  if (parentId){
    _todos[parentId].children[id] = assign({}, _todos[parentId].children[id], updates);
  }else{
    _todos[id] = assign({}, _todos[id], updates);
  }
};

const updateCompletedAll = (updates) => {
  for (let id in _todos) {
    updateCompleted(id, false, updates);
  }
};

const remove = (id, parentId) => {
  if (parentId){
    delete _todos[parentId].children[id];
  }else{
    delete _todos[id];
  }
};

const removeAll = () => {
  for (let id in _todos) {
    remove(id);
  }
};

const removeCompleted = () => {
      console.log(_todos);

  for (let id in _todos) {
    if (_todos[id].completed){
      remove(id);
      continue;
    }
    _.forEach(_.filter(_todos[id].children, 'completed'), (value, key) => {
      remove(value.id, value.parentId);
    });
  }
};

let TodoStore = assign({}, EventEmitter.prototype, {
  areAllCompleted : function(){
    for (let id in _todos){

      if(!_todos[id].completed)
        return false;
    }
    return true;
    // if(_.filter(_todos,'completed').length){
    //   return false;
    // }else{
    //   return true;
    // }
  },

  getAll: function() {
    
    return _todos;
  },

  completeParent : function(){
    for (let id in _todos){
      let completedChildren = (_.filter(_todos[id].children, 'completed').length);
      let childrenLength = Object.keys(_todos[id].children).length;

      if (completedChildren === childrenLength && childrenLength !== 0){
        _todos[id] = assign({}, _todos[id], {completed :true});
      }else{
        _todos[id] = assign({}, _todos[id], {completed :false});
      }
    }
  },

  getStatusFilter: function() {
    return _statusFilter;
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
        create(text, action.parentId);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_UNDO_COMPLETE :
      updateCompleted(action.id, action.parentId, {completed :false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE :
      updateCompleted(action.id, action.parentId, {completed :true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL :
      if(TodoStore.areAllCompleted()){
        updateCompletedAll({completed :false});
      }else{
        updateCompletedAll({completed :true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_REMOVE :
      remove(action.id, action.parentId);
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
        updateText(action.id, action.parentId, {text :text});
        TodoStore.emitChange();
      }
      break;
    
    case TodoConstants.TODO_SET_STATUS_FILTER :
      _statusFilter = action.filter;
      TodoStore.emitChange();
      break;
    
    default:
      break;
  }
});

module.exports = TodoStore;
