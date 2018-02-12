import { createProvider } from './createProvider';

// tslint:disable-next-line:variable-name
export const Autocomplete = createProvider('Autocomplete');
// tslint:disable-next-line:variable-name
export const Search = createProvider('Search', (agent) => agent.defaults({}));
// tslint:disable-next-line:variable-name
export const SmartCollection = createProvider('SmartCollection', (agent) => agent.defaults({}));
// tslint:disable-next-line:variable-name
export const Recommendation = createProvider('Recommendation');
