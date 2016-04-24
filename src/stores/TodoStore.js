/*jshint esversion: 6 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

let _todos = {};
let _statusFilter = 'all';

const create = (text, parentId) => {
  var id = btoa(+new Date() + Math.floor(Math.random() * 999999));

  if (parentId){
    _todos[parentId].children[id] = {
      id: id,
      completed: false,
      text: text,
      parentId : parentId,
      children: false,
    };
  }else{
    _todos[id] = {
      id: id,
      completed: false,
      text: text,
      parentId : false,
      children: {} // if has no child, it has []. can get array of child's id. if it's child node, it can get false.
    };
  }
};

const updateComplete = (id, parentId, updates) => {
  if (parentId){
    _todos[parentId].children[id] = assign({}, _todos[parentId].children[id], updates);

    let flag = 0;
    let childrenLength = Object.keys(_todos[parentId].children).length;

    for (let childKey in _todos[parentId].children){
      if(_todos[parentId].children[childKey].completed){
        flag++;
      }
    }

    if (flag < childrenLength){
      _todos[parentId] = assign({}, _todos[parentId], {completed :false});
    }else if (flag === childrenLength){
      _todos[parentId] = assign({}, _todos[parentId], {completed :true});
    }
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
    for (let childKey in _todos[id].children){
    }
  }
};

const updateCompleteAll = (updates) => {
  for (let id in _todos) {
    updateComplete(id, false, updates);
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
    console.log(_todos[id]);
    if (typeof _todos[id].children.length !==undefined){
      for (let childKey in _todos[id].children){
        if (_todos[id].children[childKey].completed)
        remove(childKey, id);
      }
    }
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
      updateComplete(action.id, action.parentId, {completed :false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE :
      updateComplete(action.id, action.parentId, {completed :true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL :
      if(TodoStore.areAllCompleted()){
        updateCompleteAll({completed :false});
      }else{
        updateCompleteAll({completed :true});
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
