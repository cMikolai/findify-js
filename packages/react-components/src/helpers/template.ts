import unescape from 'lodash/unescape';

export default (template = '', selector = /%s/g) => {
  const tpl = unescape(template);
  return (...args) => {
    let index = -1;
    return tpl.replace(selector, () => {
      index++;
      return args[index] || '';
    });
  };
};
