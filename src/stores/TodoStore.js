var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function create(text) {

    var id = (+new Date() + Math.floor(Math.random() * 999999));
    _todos[id] = {
        id: id,
        completed: false,
        text: text,
        hasChild: [] // if has no child, it has []. can get array of child's id. if it's child node, it can get false.
    };
}

function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

function remove(id) {
    delete _todos[id];
}

function removeAll() {
    for (var id in _todos) {
        remove(id);
    }
}

function removeCompleted() {
    for (var id in _todos) {
        if (!_todos[id].completed)
            remove(id);
    }
}


module.exports = TodoStore;
