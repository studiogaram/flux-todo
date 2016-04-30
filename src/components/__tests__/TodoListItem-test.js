/* eslint-env node, jest */

jest.unmock('../TodoListItem.react');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoListItem from '../TodoListItem.react';
import TodoActions from '../../actions/TodoActions';

describe('TodoListItem', () => {
  let item;

  beforeEach(() => {
    item = TestUtils.renderIntoDocument(
      React.createElement(TodoListItem, {
        todo: {
          complete: false,
          id: '1',
          text: 'Test Todo~',
          parentId: false,
          children: {},
        },
      })
    );
  });

  it('initial state of listItem', () => {
    expect(item.state.editable).toBe(false);
    expect(item.state.addable).toBe(false);
  });

  describe('clicking label will makes state-editable true', () => {
    let label;
    beforeEach(() => {
      label = TestUtils.findRenderedDOMComponentWithTag(item, 'label');
      TestUtils.Simulate.click(label);
    });
    it('changes state.isEditing to true', () => {
      expect(item.state.editable).toBe(true);
    });
  });

  describe('btn-add-child will makes state-addable true', () => {
    let button;
    beforeEach(() => {
      button = TestUtils.findRenderedDOMComponentWithClass(item, 'btn-add-child');
      TestUtils.Simulate.click(button);
    });
    it('changes state.isEditing to true', () => {
      expect(item.state.addable).toBe(true);
    });
  });

  describe('btn-remove-item will calls action.remove', () => {
    let button;
    beforeEach(() => {
      button = TestUtils.findRenderedDOMComponentWithClass(item, 'btn-remove-item');
      TestUtils.Simulate.click(button);
    });

    it('calls TodoActions.remove with the todo id', () => {
      expect(TodoActions.remove).toBeCalledWith(item.props.todo);
    });
  });

  describe('input-check-item will calls action.toggleComplete', () => {
    let checkbox;
    beforeEach(() => {
      checkbox = TestUtils.findRenderedDOMComponentWithClass(item, 'input-check-item');
      TestUtils.Simulate.change(checkbox);
    });

    it('calls TodoActions.toggleComplete with prop.todo', () => {
      expect(TodoActions.toggleComplete).toBeCalledWith(item.props.todo);
    });
  });
});
