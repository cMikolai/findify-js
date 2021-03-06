import { getFacetType } from '../filters';
import { stateToQuery, queryToState } from '../format';
import { fromJS } from 'immutable';

describe('Filters', () => {
  it('Should be category', () => {
    expect(getFacetType([])).toBe('category')
  })
  it('Should be range', () => {
    expect(getFacetType({})).toBe('range')
  })
  it('Should be text', () => {
    expect(getFacetType('')).toBe('text')
  })
})

describe('Format', () => {
  const state = {
    q: '',
    filters: {
      text: ['text'],
      category1: [['category1']],
      category2: [['category2']],
      range: [{ from: 1, to: 2 }]
    }
  };

  const query = {
    q: '',
    filters: [{
      name: 'text',
      type: 'text',
      values: [{ value: 'text' }]
    }, {
      name: 'category1',
      type: 'category',
      values: [{ value: 'category1' }]
    }, {
      name: 'category2',
      type: 'category',
      values: [{ value: 'category2' }]
    }, {
      name: 'range',
      type: 'range',
      values: [{ from: 1, to: 2 }]
    }]
  };
  
  it('Should convert state to query', () => {
    expect(stateToQuery(fromJS(state)).toJS()).toEqual(query)
  })

  it('Should convert query to state', () => {
    expect(queryToState(fromJS({ q: true, filters: {} }), fromJS(query)).toJS()).toEqual(state)
  })
})
