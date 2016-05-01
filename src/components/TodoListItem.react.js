import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

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
      <TodoTextInput
        className = "input-todo-edit"
        textValue = {todo.text}
        saveItem = {this.updateText}
        placeholder = "Edit New Todo"
      />
    );
    const inputAdd = (
      <TodoTextInput
        className = "input-todo-add"
        saveItem = {this.createChildTodo}
        placeholder = "Add New Child Todo"
      />
    );

    const rightIconMenu = (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
      {todo.parentId ? '' : <MenuItem
            className = "btn-add-child-item"
            onTouchTap = {this.setStateAddable}
            primaryText = "Add Child Todo"
          />}

        <MenuItem
          className = "btn-edit-item"
          onTouchTap = {this.setStateEditable}
          primaryText = "Edit"
        />
        <MenuItem
          className = "btn-remove-item"
          onTouchTap = {this.removeItem}
          primaryText = "Delete"
        />
      </IconMenu>
    );

    let label = (
      <div>
      <ListItem
        className = {todo.parentId ? 'list-item-child' : 'list-item-parent'}
        id = {'listItem' + todo.id}
        leftCheckbox={
          <Checkbox
            className = "input-check-item"
            type = "checkbox"
            checked = {todo.completed}
            onCheck = {this.toggleComplete}
          />}
        rightIconButton={rightIconMenu}
        initiallyOpen
        primaryText={todo.text}
        nestedItems = {this.props.nestedItems}
      />

      {this.props.nestedItems? <Divider inset={false} />:<Divider inset />}

      </div>
    );

    return (
      <div>
        {this.state.editable ? inputEdit : label}
        {this.state.addable ?
           <div id="banner">{inputAdd}</div> :''
        }

      </div>
    );
  }
}


TodoListItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  nestedItems: React.PropTypes.array,
};
