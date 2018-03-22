import { compose, setDisplayName, withStateHandlers, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from './styles.css';

export default compose(
  setDisplayName('CategoryFacet'),

  withTheme(styles),

  withProps(({ facet }) => ({
    items: facet.get('values')
  }))
)(view);
