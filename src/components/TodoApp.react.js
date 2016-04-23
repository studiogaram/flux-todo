var React = require('react');
var TodoStore = require('../stores/TodoStore');


var TodoApp = React.createClass({

  getInitialState: function() {
    return null;
  },

  componentDidMount: function() {},

  componentWillUnmount: function() {},

  render: function() {
    return (
      <div>
        <InputComponents> </InputComponents>
      </div>
    );
  },
  // render: function() {
  //     return (
  //       <div>
  //         <Input></Input>
  //         <Lists></Lists>
  //         <Status></Status>
  //       </div>
  //     );
  // },
  _onChange: function() {}

});

module.exports = TodoApp;
