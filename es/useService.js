import { isRef } from '@vue/composition-api';
import { useActor } from './useActor';
/**
 * @deprecated Use `useActor` instead.
 *
 * @param service The interpreted machine
 * @returns A tuple of the current `state` of the service and the service's `send(event)` method
 */
export function useService(service) {
  if (
    process.env.NODE_ENV !== 'production' &&
    !('machine' in (isRef(service) ? service.value : service))
  ) {
    throw new Error(
      'Attempted to use an actor-like object instead of a service in the useService() hook. Please use the useActor() hook instead.'
    );
  }
  var _a = useActor(service),
    state = _a.state,
    send = _a.send;
  return { state: state, send: send };
}
