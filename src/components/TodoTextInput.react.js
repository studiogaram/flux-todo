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
    this.saveItem = this.saveItem.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.saveItem();
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  saveItem() {
    this.props.saveItem(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div>
        <input
          onKeyDown = {this.onKeyDown}
          onChange = {this.onChange}
          onBlur = {this.saveItem}
          value = {this.state.value}
          autoFocus
        />
      </div>
    );
  }
}

TodoTextInput.propTypes = {
  textValue: React.PropTypes.string,
  value: React.PropTypes.string,
  saveItem: React.PropTypes.func.isRequired,
};
