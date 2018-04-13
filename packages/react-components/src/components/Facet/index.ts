import { compose, setDisplayName, withStateHandlers, withPropsOnChange } from 'recompose';
import withEvents from 'helpers/withEvents';
import pure from 'helpers/pure';

import view from './view';
import withTheme from 'helpers/withTheme';

import styles from "./styles.css";

export default compose(
  pure,

  setDisplayName('Facet'),

  withTheme(styles),

  withPropsOnChange(['config'], ({ config, item }) => ({
    title: config.getIn(['facets', 'labels', item.get('name')], item.get('name')),
  })),

  withStateHandlers(
    ({ config, item }: any) => {
      const facetType = config.getIn(['facets', 'types', item.get('name')]) || item.get('type')
      const isOpen = typeof config.getIn(['facets', facetType, 'initiallyExpanded']) !== 'undefined' ? config.getIn(['facets', facetType, 'initiallyExpanded']) : config.getIn(['facets', 'initiallyExpanded'])
      return { isOpen }
    },
    {
      showFacet: () => () => ({ isOpen: true }),
      hideFacet: () => () => ({ isOpen: false }),
      toggleFacet: ({ isOpen }) => () => ({ isOpen: !isOpen })
    }
  ),

  withEvents({
    showFacets: ({ showFacet, item }) => (name) =>
      (!name || item.get('name') === name) && showFacet(),
    hideFacets: ({ hideFacet, item }) => (name) =>
      (!name || item.get('name') === name) && hideFacet(),
  })
)(view);
