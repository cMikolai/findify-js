import React from 'react'
import ItemCard from '../ItemCard';
import mapArray from '../common/MapArray';

const ItemFactory = React.createFactory(ItemCard);

export default ({ items, wrapper: Wrapper = React.Fragment, ...rest }) => {
  const { limit, factory, keyAccessor, ...wrapperProps } = rest
  return (
    <Wrapper {...wrapperProps}>
      { mapArray({ keyAccessor, limit, array: items, factory: factory || ItemFactory }) }
    </Wrapper>
  )
}
