import React from 'react';
import TodoActions from '../actions/TodoActions';

export default class TodoNavigation extends React.Component {
  removeAll() {
    TodoActions.removeAll();
  }

  removeCompleted() {
    TodoActions.removeCompleted();
  }

  toggleFilter(e) {
    TodoActions.setStatusFilter(e.target.value);
  }

  render() {
    return (
      <div>
        <p>{this.props.numberTodoActive}
          {this.props.numberTodoActive < 2 ? ' item' : ' items'} left.</p>

        <button onClick = {this.removeAll}>
          Remove All
        </button>
        <button onClick = {this.removeCompleted}>
          Remove Complete
        </button>

        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "all"
          onChange = {this.toggleFilter}
          checked = {this.props.statusFilter === 'all'}
        />
        All
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "incompleted"
          onChange = {this.toggleFilter}
          checked = {this.props.statusFilter === 'incompleted'}
        />
        Active
        <input
          type = "radio"
          name = "filterTodoStatus"
          value = "completed"
          onChange = {this.toggleFilter}
          checked = {this.props.statusFilter === 'completed'}
        />
        Completed
      </div>
    );
  }
}

TodoNavigation.propTypes = {
  statusFilter: React.PropTypes.oneOf(['all', 'completed', 'incompleted']),
  numberTodoActive: React.PropTypes.number.isRequired,
};
