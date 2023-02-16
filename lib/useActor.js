'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useActor =
  exports.defaultGetSnapshot =
  exports.isActorWithState =
    void 0;
var composition_api_1 = require('@vue/composition-api');
function isActorWithState(actorRef) {
  return 'state' in actorRef;
}
exports.isActorWithState = isActorWithState;
var noop = function () {
  /* ... */
};
function defaultGetSnapshot(actorRef) {
  return 'getSnapshot' in actorRef
    ? actorRef.getSnapshot()
    : isActorWithState(actorRef)
    ? actorRef.state
    : undefined;
}
exports.defaultGetSnapshot = defaultGetSnapshot;
function useActor(actorRef, getSnapshot) {
  if (getSnapshot === void 0) {
    getSnapshot = defaultGetSnapshot;
  }
  var actorRefRef = composition_api_1.isRef(actorRef)
    ? actorRef
    : composition_api_1.shallowRef(actorRef);
  var state = composition_api_1.shallowRef(getSnapshot(actorRefRef.value));
  var send = function (event) {
    actorRefRef.value.send(event);
  };
  composition_api_1.watch(
    actorRefRef,
    function (newActor, _, onCleanup) {
      state.value = getSnapshot(newActor);
      var unsubscribe = newActor.subscribe({
        next: function (emitted) {
          return (state.value = emitted);
        },
        error: noop,
        complete: noop
      }).unsubscribe;
      onCleanup(function () {
        return unsubscribe();
      });
    },
    {
      immediate: true
    }
  );
  return { state: state, send: send };
}
exports.useActor = useActor;
