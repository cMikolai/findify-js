/**
 * @module components/CheckboxFacet
 */

import React, { useCallback } from 'react';
import content from 'components/CheckboxFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { IFacetValue, ThemedSFCProps } from 'types';

/** Props that CheckboxFacet Item accepts */
export interface ICheckboxFacetItemProps extends ThemedSFCProps {
  /** Single item from facet */
  item: IFacetValue;
  /** CheckboxFacet Item click handler */
  onItemClick?: (evt: Event) => any;
  /** Custom inline style */
  style: { [x: string]: string | number };
}

const Item = ({ item, theme, style, onItemClick }: ICheckboxFacetItemProps) => {
  const onClick = useCallback((evt) => {
    item.toggle(evt)
    onItemClick && onItemClick(evt);
  }, [item, onItemClick]);

  return (
    <Button
      style={style}
      role="listitem"
      aria-checked={item.get('selected') ? 'true' : 'false'}
      tabIndex={0}
      className={theme.item}
      onClick={onClick}>
      <Icon name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'} />
      <Text
        primary
        lowercase
        className={theme.content}
        bold={item.get('selected')}>
        { content({ item }) }
      </Text>
      <Text secondary uppercase>
        ({item.get('count')})
      </Text>
    </Button>
  )
}

export default Item;
