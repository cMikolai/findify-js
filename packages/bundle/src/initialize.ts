// tslint:disable-next-line:import-name
import AnalyticsDOM from '@findify/analytics-dom';
// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics';
import emitter from './core/emitter';
import resolveCallback from './helpers/resolveCallback';
import setupPlatforms from './helpers/setupPlatforms';
import { Events } from './core/events';
import log from './helpers/log';
import { scrollTo } from './helpers/scrollTo';
import { showFallback } from './helpers/fallbackNode';

/**
 * Create global namespace
 */
const isReady = (() => {
  if ((global as any).findify) return false;
  (global as any).findify = {};
  __root.listen = emitter.listen;
  __root.emit = emitter.emit;
  __root.addListeners = emitter.addListeners;
  __root.invalidate = async () => {
    __webpack_require__.invalidate();
    emitter.emit(Events.invalidate);
  };
  return true;
})();

const isString = (value) => typeof value === 'string' || value instanceof String;

export default async (
  _config
) => {
  if (!isReady) return;

  await new Promise(resolve => window.requestAnimationFrame(resolve));

  // We loading config independently from webpack and this promise is always resolved
  const { default: asyncConfig } = await import(/* webpackMode: "weak" */'./config');
  
  // Fallback currency settings for versions < 6.8.2
  const currency = asyncConfig.currency_config || asyncConfig.currency;

  const cfg = {
    ..._config,
    ...asyncConfig,
    currency
  };

  // Register custom components
  if (cfg.components) {
    const extra = Object.keys(cfg.components).reduce(
      (acc, k) => ({
        ...acc,
        [k]: isString(cfg.components[k]) ? eval(cfg.components[k]) : cfg.components[k]
      }), {}
    )
    await __root.invalidate();
    window.findifyJsonp.push([['extra'], extra]);
    delete cfg.components;
  }


  /* Load Dependencies in closure to support polyfills */
  const { fromJS } = require('immutable');
  const { documentReady } = require('./helpers/documentReady');
  const { createWidgets, bulkAddWidgets } = require('./core/widgets');
  const { renderWidgets } = require('./core/render');

  __root.config = fromJS(cfg);

  /** Setup analytics */
  __root.analytics = AnalyticsDOM({ platform: cfg.platform, key: cfg.key, events: cfg.analytics || {} });
  if (cfg.platform) setupPlatforms(cfg.platform, cfg.removeFindifyID);

  const widgetsRenderNeeded = !['paused', 'disabled'].includes(__root.config.get('status'));

  if (widgetsRenderNeeded) {
    __root.widgets = createWidgets(__root.config);
    renderWidgets(__root.widgets);
  }

  /** Expose utils */
  __root.utils = { ...require('./core/location'), scrollTo };

  await resolveCallback(__root, 'findifyForceCallbacks');

  await documentReady;
  
  if (widgetsRenderNeeded) {
    bulkAddWidgets(cfg.selectors);
    log('widgets:', '' , __root.widgets.list());
  } else {
    log(`findify ${__root.config.get('status')}`, 'color: #D9463F');
    showFallback();
  }

  await resolveCallback(__root, 'findifyCallbacks');


  /**
   * Notify devtools about installation
   */
  if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
    window.postMessage({
      type: 'init', __findify: true, store: { version: cfg.mjs_version, id: cfg.merchant_id }
    }, window.location.origin);
  }

  (global as any).FindifyAnalytics = Analytics;
}
