/*jshint esversion: 6 */

var React = require('react');

var TodoNavigation = React.createClass({
  render: function() {
    let items = this.props.allTodos;
    let numberTodoActive = 0;

    for(let key in items){
      if (items[key].completed==true)
        continue;
      else
        numberTodoActive++;
    }

    return (
      <div>
        <p>{numberTodoActive} {numberTodoActive<2 ? 'item' : 'items'} left.</p>
      </div>
    );
  },

});

module.exports = TodoNavigation;