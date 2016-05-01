/* eslint-env node, jest */

jest.unmock('../TodoTextInput.react');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoTextInput from '../TodoTextInput.react';

describe('TodoTextInput', () => {
  let todoTextInput;
  let saveItem;
  let input;
  const ENTER_KEY_CODE = 13;

  beforeEach(() => {
    saveItem = jest.genMockFunction();
    todoTextInput = TestUtils.renderIntoDocument(
      React.createElement(TodoTextInput, {
        textValue: 'test Text Input',
        saveItem,
      })
    );
    input = TestUtils.findRenderedDOMComponentWithTag(todoTextInput, 'input').firstChild.firstChild;
  });

  describe('onChange event will change state-value', () => {
    it('changes the state-value will make e.target.value', () => {
      TestUtils.Simulate.change(input, { target: { value: 'Text Changed' } });
      expect(todoTextInput.state.value).toBe('Text Changed');
    });
  });
  describe('onBlur event will save value', () => {
    beforeEach(() => {
      TestUtils.Simulate.blur(input);
    });

    it('calls prop.saveItem (here is saveItem)', () => {
      expect(saveItem).toBeCalled();
    });

    it('set state-value empty', () => {
      expect(todoTextInput.state.value).toBe('');
    });
  });
  describe('onKeyDown event will be different event presence of Enter Key', () => {
    describe('Press Enter Key will..', () => {
      beforeEach(() => {
        TestUtils.Simulate.keyDown(input, { keyCode: ENTER_KEY_CODE });
      });

      it('calls props.saveItem (here is saveItem)', () => {
        expect(saveItem).toBeCalled();
      });

      it('set state-value empty', () => {
        expect(todoTextInput.state.value).toBe('');
      });
    });

    describe('Press without Enter Key will..', () => {
      beforeEach(() => {
        TestUtils.Simulate.keyDown(input);
      });

      it('not modify state.value', () => {
        expect(todoTextInput.state.value).toBe('test Text Input');
      });

      it('not call props.saveItem if enter key is not pressed', () => {
        expect(saveItem).not.toBeCalled();
      });
    });
  });
});
