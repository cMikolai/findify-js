/**
 * @module components/CategoryFacet
 */
import React from 'react';
import { compose, setDisplayName, withStateHandlers, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from 'components/CategoryFacet/view';
import styles from 'components/CategoryFacet/styles.css';

export default compose(
  setDisplayName('CategoryFacet'),

  withTheme(styles),

  withProps(({ facet }) => ({
    items: facet.get('values'),
    total: facet.get('values').reduce((acc, v) => acc + v.get('count'), 0)
  }))
)(view);
