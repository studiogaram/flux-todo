import React from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import TodoList from './TodoList.react';

const getTodoState = () => ({
  allTodos: TodoStore.getAll(),
  statusFilter: TodoStore.getStatusFilter(),
  completeParent: TodoStore.completeParent(),
  areAllCompleted: TodoStore.areAllCompleted(),
});

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTodoState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getTodoState());
  }

  createTodo(text) {
    TodoActions.create(text);
  }
  render() {
    return (
      <div>
        <TodoTextInput saveItem = {this.createTodo} />
        <TodoList
          allTodos={this.state.allTodos}
          areAllCompleted={this.state.areAllCompleted}
          statusFilter={this.state.statusFilter}
        />
      </div>
    );
  }
}
