export { createProvider } from './provider/createProvider';
export { Autocomplete as AutocompleteProvider } from './provider/index';
export { Search as SearchProvider } from './provider/index';
export { Recommendation as RecommendationProvider } from './provider/index';
export { SmartCollection as SmartCollectionProvider } from './provider/index';

export { default as createConnect } from './connect/createConnect';
export { default as connectSuggestions } from './connect/connectSuggestions';
export { default as connectItems } from './connect/connectItems';
export { default as connectBreadcrumbs } from './connect/connectBreadcrumbs';
export { default as connectFacets } from './connect/connectFacets';
export { default as connectPagination } from './connect/connectPagination';
export { default as connectSort } from './connect/connectSort';
export { default as connectQuery } from './connect/connectQuery';