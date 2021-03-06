/**
 * @module components/search/StaticResults
 */

import React from 'react';
import ItemsList from 'components/ItemsList';
import Grid from 'components/common/Grid';
import PoweredBy from 'components/PoweredBy';
import Pagination from 'components/Pagination';
import { ThemedSFCProps, MJSConfiguration } from 'types';

/** Props that StaticResults accepts */
export interface IStaticResultsProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Number of columns that one item occupies in 12-col grid */
  columns: number;
};

const StaticResultsView = ({ columns, theme, config }: IStaticResultsProps) =>
<div
  className={theme.root}
  role='main'
  aria-label={`${config.getIn(['a11y', 'searchResults'], 'Search results')}`}
  tabIndex={0}
>
  <ItemsList wrapper={Grid} columns={columns} config={config} />
  <Pagination />
  <PoweredBy />
</div>

export default StaticResultsView;
