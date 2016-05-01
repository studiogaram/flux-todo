import React from 'react';

const ENTER_KEY = 13;

export default class TodoTextInput extends React.Component {
  constructor(props) {
    super(props);

    const checkedText = props.textValue ? props.textValue : '';
    this.state = {
      value: props.value || checkedText,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.onBlur();
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onBlur() {
    this.props.saveItem(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
        <input
          className = {this.props.className}
          onKeyDown = {this.onKeyDown}
          onChange = {this.onChange}
          onBlur = {this.onBlur}
          value = {this.state.value}
          placeholder = {this.props.placeholder}
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
