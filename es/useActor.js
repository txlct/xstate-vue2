import { shallowRef, isRef, watch } from '@vue/composition-api';
export function isActorWithState(actorRef) {
  return 'state' in actorRef;
}
var noop = function () {
  /* ... */
};
export function defaultGetSnapshot(actorRef) {
  return 'getSnapshot' in actorRef
    ? actorRef.getSnapshot()
    : isActorWithState(actorRef)
    ? actorRef.state
    : undefined;
}
export function useActor(actorRef, getSnapshot) {
  if (getSnapshot === void 0) {
    getSnapshot = defaultGetSnapshot;
  }
  var actorRefRef = isRef(actorRef) ? actorRef : shallowRef(actorRef);
  var state = shallowRef(getSnapshot(actorRefRef.value));
  var send = function (event) {
    actorRefRef.value.send(event);
  };
  watch(
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