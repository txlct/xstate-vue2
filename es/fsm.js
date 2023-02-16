import {
  shallowRef,
  isRef,
  watch,
  onMounted,
  onBeforeUnmount
} from '@vue/composition-api';
import { createMachine, interpret } from '@xstate/fsm';
var getServiceValue = function (service) {
  var currentValue;
  service
    .subscribe(function (state) {
      currentValue = state;
    })
    .unsubscribe();
  return currentValue;
};
export function useMachine(stateMachine, options) {
  var service = interpret(
    createMachine(
      stateMachine.config,
      options ? options : stateMachine._options
    )
  ).start();
  var state = shallowRef(getServiceValue(service));
  onMounted(function () {
    service.subscribe(function (currentState) {
      return (state.value = currentState);
    });
  });
  onBeforeUnmount(service.stop);
  return { state: state, send: service.send, service: service };
}
export function useService(service) {
  var serviceRef = isRef(service) ? service : shallowRef(service);
  var state = shallowRef(serviceRef.value.state);
  watch(
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
