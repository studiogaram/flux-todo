/*jshint esversion: 6 */

var React = require('react');
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
          onChange = {this._onChange}
          value = {this.state.value}/>
        <button onClick = {this.createTodo}/>
      </div>
    );
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