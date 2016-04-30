/* eslint-env node, jest */

jest.unmock('../TodoNavigation.react');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoNavigation from '../TodoNavigation.react';
import TodoActions from '../../actions/TodoActions';

describe('TodoNavigation', () => {
  let itemAll;
  beforeEach(() => {
    itemAll = TestUtils.renderIntoDocument(
      React.createElement(TodoNavigation, {
        statusFilter: 'all',
        numberTodoActive: 4,
      })
    );
  });

  describe('input-radio-filter-* will calls action.setStatusFilter', () => {
    let btnIncompleted;
    let btnCompleted;
    beforeEach(() => {
      btnIncompleted = TestUtils.findRenderedDOMComponentWithClass(itemAll, 'input-radio-filter-incompleted');
      TestUtils.Simulate.change(btnIncompleted);
    });

    it('calls TodoActions.setStatusFilter with the incompleted', () => {
      expect(TodoActions.setStatusFilter).toBeCalledWith(btnIncompleted.value);
    });
    beforeEach(() => {
      btnCompleted = TestUtils.findRenderedDOMComponentWithClass(itemAll, 'input-radio-filter-completed');
      TestUtils.Simulate.change(btnCompleted);
    });

    it('calls TodoActions.setStatusFilter with the completed', () => {
      expect(TodoActions.setStatusFilter).toBeCalledWith(btnCompleted.value);
    });
  });
  describe('clicking btnRemoveCompleted will calls action.removeCompleted', () => {
    let btnRemoveCompleted;
    beforeEach(() => {
      btnRemoveCompleted = TestUtils.findRenderedDOMComponentWithClass(itemAll, 'btn-remove-completed');
      TestUtils.Simulate.click(btnRemoveCompleted);
    });
    it('calls TodoActions.removeCompleted', () => {
      expect(TodoActions.removeCompleted);
    });
  });
  describe('clicking btnRemoveCompleted will calls action.removeAll', () => {
    let btnRemoveAll;
    beforeEach(() => {
      btnRemoveAll = TestUtils.findRenderedDOMComponentWithClass(itemAll, 'btn-remove-all');
      TestUtils.Simulate.click(btnRemoveAll);
    });
    it('calls TodoActions.removeAll', () => {
      expect(TodoActions.removeAll);
    });
  });
});
