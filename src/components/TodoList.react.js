import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoListItem from './TodoListItem.react';
import TodoNavigation from './TodoNavigation.react';

export default class TodoList extends React.Component {
  completeAll() {
    TodoActions.toggleCompleteAll();
  }

  render() {
    const items = this.props.allTodos;
    let lists = [];
    let numberTodoActive = 0;

    for (let key in items) {
      if (!items[key].completed) {
        numberTodoActive++;
      }

      if (this.props.statusFilter === 'incompleted') {
        if (items[key].completed) {
          continue;
        }
      } else if (this.props.statusFilter === 'completed') {
        if (!items[key].completed) {
          continue;
        }
      }

      const listChildren = [];
      let nestedItems;
      if (items[key].children) {
        for (let childKey in items[key].children) {
          if (this.props.statusFilter === 'incompleted') {
            if (items[key].children[childKey].completed) {
              continue;
            }
          } else if (this.props.statusFilter === 'completed') {
            if (!items[key].children[childKey].completed) {
              continue;
            }
          }
          listChildren.push(
            <TodoListItem key={childKey} todo={items[key].children[childKey]} parentId={key} />);
        }
        nestedItems = (
          <ul
            className="list-children"
            id= { 'list' + key }
            key={ 'ul' + key }
          >
            {listChildren}
          </ul>
        );
      }
      lists.push(
        <TodoListItem
          key={key}
          todo={items[key]}
          parentId={false}
          nestedItems={nestedItems}
        />);
    }

    return (
      <div className="container-todo-list">
        <label className = "label-complete-all">
          <input
            className = "input-check-complete-all"
            type = "checkbox"
            onChange = {this.completeAll}
            checked = {this.props.areAllCompleted}
          />
          Complete All
        </label>

        <ul className="list-todo">{lists}</ul>

        <TodoNavigation
          className = "container-navigation"
          statusFilter = {this.props.statusFilter}
          numberTodoActive={numberTodoActive}
        />
      </div>
    );
  }
}

TodoList.propTypes = {
  areAllCompleted: React.PropTypes.bool.isRequired,
  allTodos: React.PropTypes.object.isRequired,
  statusFilter: React.PropTypes.oneOf(['all', 'completed', 'incompleted']),
};
