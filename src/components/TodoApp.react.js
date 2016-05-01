import React from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import TodoList from './TodoList.react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const style = {
  height: '100%',
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

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

  completeAll() {
    TodoActions.toggleCompleteAll();
  }

  createTodo(text) {
    TodoActions.create(text);
  }

  removeAll() {
    TodoActions.removeAll();
  }

  removeCompleted() {
    TodoActions.removeCompleted();
  }

  render() {
    return (
      <div className="container-todo">
        <Paper
          style={style}
          zDepth={3}
          style={{ backgroundColor: '#1FBCD2' }}
        >
          <AppBar
            title={<TodoTextInput
              className="input-todo-main"
              saveItem = {this.createTodo}
              placeholder = "Add To-do!"
            />}
            iconElementLeft={
              <Checkbox
                className = "input-check-complete-all"
                onCheck = {this.completeAll}
                checked = {this.state.areAllCompleted}
                style={{
                  top: '15px',
                  left: '10px',
                }}
                iconStyle={{
                  fill: '#fff',
                }}
              />
            }
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
              <MenuItem primaryText="Remove Completed" onClick = {this.removeCompleted} />
              <MenuItem primaryText="Remove All" onClick = {this.removeAll} />
             </IconMenu>
            }
          />
          <TodoList
            className="container-list"
            allTodos={this.state.allTodos}
            areAllCompleted={this.state.areAllCompleted}
            statusFilter={this.state.statusFilter}
          />
        </Paper>
      </div>
    );
  }
}
