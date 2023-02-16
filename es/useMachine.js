import { shallowRef } from '@vue/composition-api';
import { State } from 'xstate';
import { useInterpret } from './useInterpret';
export function useMachine(getMachine, options) {
  if (options === void 0) {
    options = {};
  }
  var service = useInterpret(getMachine, options, listener);
  var initialState = service.initialState;
  var state = shallowRef(
    options.state ? State.create(options.state) : initialState
  );
  function listener(nextState) {
    // Only change the current state if:
    // - the incoming state is the "live" initial state (since it might have new actors)
    // - OR the incoming state actually changed.
    //
    // The "live" initial state will have .changed === undefined.
    var initialStateChanged =
      nextState.changed === undefined && Object.keys(nextState.children).length;
    if (nextState.changed || initialStateChanged) {
      state.value = nextState;
    }
  }
  return { state: state, send: service.send, service: service };
}
