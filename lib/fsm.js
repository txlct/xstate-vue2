'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useService = exports.useMachine = void 0;
var composition_api_1 = require('@vue/composition-api');
var fsm_1 = require('@xstate/fsm');
var getServiceValue = function (service) {
  var currentValue;
  service
    .subscribe(function (state) {
      currentValue = state;
    })
    .unsubscribe();
  return currentValue;
};
function useMachine(stateMachine, options) {
  var service = fsm_1
    .interpret(
      fsm_1.createMachine(
        stateMachine.config,
        options ? options : stateMachine._options
      )
    )
    .start();
  var state = composition_api_1.shallowRef(getServiceValue(service));
  composition_api_1.onMounted(function () {
    service.subscribe(function (currentState) {
      return (state.value = currentState);
    });
  });
  composition_api_1.onBeforeUnmount(service.stop);
  return { state: state, send: service.send, service: service };
}
exports.useMachine = useMachine;
function useService(service) {
  var serviceRef = composition_api_1.isRef(service)
    ? service
    : composition_api_1.shallowRef(service);
  var state = composition_api_1.shallowRef(serviceRef.value.state);
  composition_api_1.watch(
    serviceRef,
    function (service, _, onCleanup) {
      state.value = getServiceValue(service);
      var unsubscribe = service.subscribe(function (currentState) {
        if (currentState.changed) {
          state.value = currentState;
        }
      }).unsubscribe;
      onCleanup(unsubscribe);
    },
    {
      immediate: true
    }
  );
  var send = function (event) {
    return serviceRef.value.send(event);
  };
  return { state: state, send: send, service: serviceRef };
}
exports.useService = useService;
