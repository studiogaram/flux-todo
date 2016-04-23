/*jshint esversion: 6 */

var React = require('react');

const ENTER_KEY = 13;

var TodoTextInput = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },
  
  render: function() {
    return (
      <div>
        <input
          onKeyDown = {this._onKeyDown}
          onChange = {this._onChange}
          onBlur = {this.createTodo}
          value = {this.state.value}
          autoFocus = {true}/>
        <button onClick = {this.createTodo}/>
      </div>
    );
  },

  _onKeyDown : function(e){
    if(e.keyCode === ENTER_KEY){
      this.createTodo();
    }
  },

  _onChange: function(e) {
    this.setState({value : e.target.value});
  },

  createTodo:function(){
    this.props.saveTodo(this.state.value);
    this.setState({value : ''});
  }

});

module.exports = TodoTextInput;