import React from 'react';
import TodoActions from '../actions/TodoActions';
import { Tabs, Tab } from 'material-ui/Tabs';
import Done from 'material-ui/svg-icons/action/done';
import Home from 'material-ui/svg-icons/action/home';
import List from 'material-ui/svg-icons/action/list';

export default class TodoNavigation extends React.Component {
  toggleFilter(e) {
    TodoActions.setStatusFilter(e);
  }
  
  render() {
    return (
      <div>
        <Tabs onChange={this.toggleFilter}>
          <Tab
            className = "input-radio-filter-all"
            icon={<Home />}
            label= "All Items"
            value = "all"/>
          <Tab
            className = "input-radio-filter-incompleted"
            icon={<List />}
            label={ this.props.numberTodoActive + ' of Active Item' }
            value = "incompleted"
          />
          <Tab
            className = "input-radio-filter-completed"
            icon={<Done />}
            value = "completed"
            label={this.props.numberTodoInactive + ' of Completed Item' }
          />
        </Tabs>
      </div>
    );
  }
}

TodoNavigation.propTypes = {
  statusFilter: React.PropTypes.oneOf(['all', 'completed', 'incompleted']),
  numberTodoActive: React.PropTypes.number.isRequired,
};
