'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useInterpret = void 0;
var xstate_1 = require('xstate');
var composition_api_1 = require('@vue/composition-api');
// copied from core/src/utils.ts
// it avoids a breaking change between this package and XState which is its peer dep
function toObserver(nextHandler, errorHandler, completionHandler) {
  if (typeof nextHandler === 'object') {
    return nextHandler;
  }
  var noop = function () {
    return void 0;
  };
  return {
    next: nextHandler,
    error: errorHandler || noop,
    complete: completionHandler || noop
  };
}
function useInterpret(getMachine, options, observerOrListener) {
  if (options === void 0) {
    options = {};
  }
  var machine = typeof getMachine === 'function' ? getMachine() : getMachine;
  var context = options.context,
    guards = options.guards,
    actions = options.actions,
    activities = options.activities,
    services = options.services,
    delays = options.delays,
    rehydratedState = options.state,
    interpreterOptions = __rest(options, [
      'context',
      'guards',
      'actions',
      'activities',
      'services',
      'delays',
      'state'
    ]);
  var machineConfig = {
    context: context,
    guards: guards,
    actions: actions,
    activities: activities,
    services: services,
    delays: delays
  };
  var machineWithConfig = machine.withConfig(
    machineConfig,
    __assign(__assign({}, machine.context), context)
  );
  var service = xstate_1
    .interpret(machineWithConfig, interpreterOptions)
    .start(
      rehydratedState ? xstate_1.State.create(rehydratedState) : undefined
    );
  var sub;
  if (observerOrListener) {
    sub = service.subscribe(toObserver(observerOrListener));
  }
  composition_api_1.onBeforeUnmount(function () {
    service.stop();
    sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
  });
  return service;
}
exports.useInterpret = useInterpret;
