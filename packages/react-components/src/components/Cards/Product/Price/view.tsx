/**
 * @module components/Cards/Product/Price
 */

import cx from 'classnames'
import React from 'react'
import { List } from 'immutable'
import Text from 'components/Text'
import { getPrice } from 'helpers/getPrice'
import { ClassnamedProps, ThemedSFCProps } from 'types';

/** List of props that Price component accepts */
export interface IPriceProps extends ThemedSFCProps, ClassnamedProps {
  /** List of current prices */
  price: List<number>,
  /** Old price for the item */
  oldPrice?: number,
  /** Currency */
  currency: string,
  /** Discount percentages for item */
  discount: List<number>,
  /** Flag to show whether item is discounted */
  hasDiscount: boolean,
  /** Flag to show whether prices can be compared */
  hasCompare: boolean,
}

const PriceView: React.SFC<IPriceProps> = ({
  className,
  price,
  theme,
  currency,
  hasDiscount,
  hasCompare,
  oldPrice
}: IPriceProps) => (
  <div className={cx(theme.priceWrapper, className)}>
    <span className={cx(
      theme.price,
      (hasDiscount || hasCompare) && theme.salePrice
    )}>
      {getPrice(price, currency)}
    </span>
    <span display-if={hasCompare} className={cx(theme.compare)}>
      {getPrice(oldPrice, currency)}
    </span>
  </div>
)

export default PriceView
