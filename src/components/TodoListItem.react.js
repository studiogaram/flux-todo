import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      addable: false,
    };
    this.toggleComplete = this.toggleComplete.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setStateEditable = this.setStateEditable.bind(this);
    this.setStateAddable = this.setStateAddable.bind(this);
    this.createChildTodo = this.createChildTodo.bind(this);
    this.updateText = this.updateText.bind(this);
  }
  setStateEditable() {
    this.setState({ editable: true });
  }

  setStateAddable() {
    this.setState({ addable: true });
  }

  updateText(text) {
    TodoActions.updateText(this.props.todo, text);
    this.setState({ editable: false });
  }

  createChildTodo(text) {
    TodoActions.create(text, this.props.todo);
    this.setState({ addable: false });
  }

  toggleComplete() {
    TodoActions.toggleComplete(this.props.todo);
  }

  removeItem() {
    TodoActions.remove(this.props.todo);
  }

  render() {
    const todo = this.props.todo;
    const inputEdit = (
      <div>
        <TodoTextInput
          className = "input-text-edit"
          textValue = {todo.text}
          saveItem = {this.updateText}
        />
      </div>
    );
    const inputAdd = (
      <div>
        <TodoTextInput saveItem = {this.createChildTodo} />
      </div>
    );

    const btnAddChild = (
      <button
        className = "btn-add-child"
        onClick = {this.setStateAddable}
      >
        Add Child-Todo
      </button>
    );

    let label = (
      <div>
        <input
          className = "input-check-item"
          type = "checkbox"
          checked = {todo.completed}
          onChange = {this.toggleComplete}
        />
        <label onClick = {this.setStateEditable}>
          {todo.text}
        </label>
        {todo.parentId ? '' : btnAddChild}
        <button
          className="btn-remove-item"
          onClick = {this.removeItem}
        />
      </div>
    );

    let itemEdit = this.state.editable ? inputEdit : label;
    let itemAdd = this.state.addable ? inputAdd : '';
    return (
      <li key = {todo.id}>
        {itemEdit}
        {itemAdd}
      </li>
    );
  }
}


TodoListItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
};
