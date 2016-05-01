import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoListItem from './TodoListItem.react';
import TodoNavigation from './TodoNavigation.react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class TodoList extends React.Component {

  render() {
    const items = this.props.allTodos;
    let lists = [];
    let numberTodoActive = 0;
    let numberTodoInactive = 0;

    for (let key in items) {
      if (!items[key].completed) {
        numberTodoActive++;
      }else{
        numberTodoInactive++;
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
            <TodoListItem
              key={childKey}
              todo={items[key].children[childKey]}
              parentId={key}
            />);
        }
      }
      lists.push(
        <TodoListItem
          key={key}
          todo={items[key]}
          parentId={false}
          nestedItems={listChildren}
        />);
    }

    return (
      <div className="container-todo-list">
        <TodoNavigation
          className = "container-navigation"
          statusFilter = {this.props.statusFilter}
          numberTodoActive={numberTodoActive}
          numberTodoInactive={numberTodoInactive}
        />

        <List>
          {lists.length ? lists : <div className="panel-list-empty">There is no items.</div>}
        </List>

      </div>
    );
  }
}

TodoList.propTypes = {
  areAllCompleted: React.PropTypes.bool.isRequired,
  allTodos: React.PropTypes.object.isRequired,
  statusFilter: React.PropTypes.oneOf(['all', 'completed', 'incompleted']),
};
