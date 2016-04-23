/*jshint esversion: 6 */

var React = require('react');

const ENTER_KEY = 13;

var TodoTextInput = React.createClass({
  getInitialState: function() {
    let checkedText = this.props.textValue ? this.props.textValue : '';

    return {
      value: this.props.value || checkedText
    };
  },
  
  render: function() {
    return (
      <div>
        <input
          onKeyDown = {this._onKeyDown}
          onChange = {this._onChange}
          onBlur = {this.saveItem}
          value = {this.state.value}
          autoFocus = {true}/>
      </div>
    );
  },

  _onKeyDown : function(e){
    if(e.keyCode === ENTER_KEY){
      this.saveItem();
    }
  },

  _onChange: function(e) {
    this.setState({value : e.target.value});
  },

  saveItem:function(){
    this.props.saveItem(this.state.value);
    this.setState({value : ''});
  }

});

module.exports = TodoTextInput;