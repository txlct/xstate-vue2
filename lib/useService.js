'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useService = void 0;
var composition_api_1 = require('@vue/composition-api');
var useActor_1 = require('./useActor');
/**
 * @deprecated Use `useActor` instead.
 *
 * @param service The interpreted machine
 * @returns A tuple of the current `state` of the service and the service's `send(event)` method
 */
function useService(service) {
  if (
    process.env.NODE_ENV !== 'production' &&
    !('machine' in (composition_api_1.isRef(service) ? service.value : service))
  ) {
    throw new Error(
      'Attempted to use an actor-like object instead of a service in the useService() hook. Please use the useActor() hook instead.'
    );
  }
  var _a = useActor_1.useActor(service),
    state = _a.state,
    send = _a.send;
  return { state: state, send: send };
}
exports.useService = useService;
