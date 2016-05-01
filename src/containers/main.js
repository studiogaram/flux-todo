import React from 'react';
import { Container } from 'flux/utils';
import TodoActions from '../actions/TodoActions';
import { emulateEvent } from 'util';
import TodoStore from '../stores/TodoStore';
import TodoApp from '../components/TodoApp.react';

class Main extends React.Component {
  static getStores() {
    return TodoStore;
  }

  static calculateState(prevState) {
    let state = TodoStore.getState();
    return {
      todos: TodoStore.getAll(),
    };
  }
  componentDidMount() {
    if (this.state.shouldLoad) {
      emulateEvent(loadTodo);
    }
  }

  handleCheckTodo(todo) {
    TodoActions(todo.id)
  }

  render() {
    return <TodoApp todos={this.state.todos}
                        status={this.state.status}
                        onCheckTodo={this.handleCheckTodo.bind(this)}/>;
  }
}

export default Container.create(Main);
