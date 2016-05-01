import React from 'react';
import TextField from 'material-ui/TextField';

const ENTER_KEY = 13;

export default class TodoTextInput extends React.Component {
  constructor(props) {
    super(props);

    const checkedText = props.textValue ? props.textValue : '';
    this.state = {
      value: props.value || checkedText,
      flagBugBluring: true,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    this._input.focus();
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.props.saveItem(this.state.value);
      this.setState({ value: '' });
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onBlur() {
    if (this.props.className === 'input-todo-add') {
      if (this.state.value === '') {
        setTimeout(() => {
          this._input.focus();
        }, 0);
      }
    } else {
      this.props.saveItem(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
        <TextField
          className = {this.props.className}
          onKeyDown = {this.onKeyDown}
          onChange = {this.onChange}
          onBlur = {this.onBlur}
          value = {this.state.value}
          hintText = {this.props.placeholder}
          ref={(c) => this._input = c}
          fullWidth
          autoFocus
        />
    );
  }
}

TodoTextInput.propTypes = {
  textValue: React.PropTypes.string,
  value: React.PropTypes.string,
  saveItem: React.PropTypes.func.isRequired,
  className: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
};
