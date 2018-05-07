import React from 'react'
import classNames from 'classnames'
import styles from 'components/Cards/Product/styles.css';
import Image from 'components/common/Image'
import Truncate from 'components/common/Truncate'
import Text from 'components/Text'
import Rating from 'components/Cards/Product/Rating';
import Price from 'components/Cards/Product/Price';
import { DiscountSticker, OutOfStockSticker  } from 'components/Cards/Product/Stickers';
import { Map } from 'immutable'

const Title: any = ({ text, config = Map(), ...rest }) => (
  <Text display-if={!!text} className={styles.title} {...rest}>{text}</Text>
);

const Description: any = ({ text, config = Map(), ...rest }) => (
  <p
    display-if={!!text}
    className={styles.description}
    {...rest}
  >
    <Truncate>{text}</Truncate>
  </p>
);

export default ({
  item,
  product_url,
  imageQuery,
  description,
  title,
  price,
  onProductClick,
  config,
  theme,
  imageWrapperStyle
}: any) => (
  <a
    onClick={onProductClick}
    href={item.get('product_url')}
    className={classNames(
      styles.root,
      config.get('simple') && styles.simple,
      theme.productCard,
    )}
  >
    <div className={classNames(styles.imageWrap, theme.imageWrap)} style={imageWrapperStyle}>
      {(item.getIn(['html', 'image']) && (
        <div dangerouslySetInnerHTML={{ __html: item.getIn(['html', 'image']) }} />
      )) || (
        <Image
          className={classNames(styles.image, theme.image)}
          aspectRatio={config.getIn(['product', 'image', 'aspectRatio'])}
          thumbnail={item.get('thumbnail_url')}
          src={item.get('image_url') || item.get('thumbnail_url')}
          alt={item.get('title')}
          size={imageWrapperStyle}
        />
      )}
    <div display-if={config.getIn(['product', 'stickers', 'display'])}>
      <DiscountSticker
        display-if={(item.get('discount') && typeof item.get('discount').size !== 'undefined') ? item.get('discount').size > 0 : item.get('discount')}
        config={config}
        className={theme.discountSticker}
        discount={item.get('discount')} />
    </div>
    </div>
    <div display-if={config.getIn(['product', 'reviews', 'display'])} className={styles.rating}>
      <Rating value={item.getIn(['reviews', 'average_score'])} count={item.getIn(['reviews', 'count'])} />
    </div>
    <div className={classNames(styles.content, theme.content)}>
      <Title
        display-if={config.getIn(['product', 'title', 'display'])}
        text={item.get('title')}
        config={config.getIn(['product', 'title'])} />
      <Description
        display-if={config.getIn(['product', 'description', 'display'])}
        text={item.get('description')}
        config={config.getIn(['product', 'description'])} />
      <Price
        className={theme.priceWrapper}
        display-if={config.getIn(['product', 'price', 'display'])}
        price={item.get('price')}
        oldPrice={item.get('compare_at')}
        discount={item.get('discount')}
        currency={config.get('currency').toJS()} />
      <OutOfStockSticker
        display-if={item.getIn(['stickers', 'out-of-stock'])}
        config={config} />
    </div>
  </a>
);
