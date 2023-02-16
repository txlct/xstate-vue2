'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useMachine = void 0;
var composition_api_1 = require('@vue/composition-api');
var xstate_1 = require('xstate');
var useInterpret_1 = require('./useInterpret');
function useMachine(getMachine, options) {
  if (options === void 0) {
    options = {};
  }
  var service = useInterpret_1.useInterpret(getMachine, options, listener);
  var initialState = service.initialState;
  var state = composition_api_1.shallowRef(
    options.state ? xstate_1.State.create(options.state) : initialState
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
exports.useMachine = useMachine;
