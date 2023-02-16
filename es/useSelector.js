import { onMounted, onBeforeUnmount, shallowRef } from '@vue/composition-api';
import { defaultGetSnapshot } from './useActor';
var defaultCompare = function (a, b) {
  return a === b;
};
export function useSelector(actor, selector, compare, getSnapshot) {
  if (compare === void 0) {
    compare = defaultCompare;
  }
  if (getSnapshot === void 0) {
    getSnapshot = defaultGetSnapshot;
  }
  var selected = shallowRef(selector(getSnapshot(actor)));
  var updateSelectedIfChanged = function (nextSelected) {
    if (!compare(selected.value, nextSelected)) {
      selected.value = nextSelected;
    }
  };
  var sub;
  onMounted(function () {
    var initialSelected = selector(getSnapshot(actor));
    updateSelectedIfChanged(initialSelected);
    sub = actor.subscribe(function (emitted) {
      var nextSelected = selector(emitted);
      updateSelectedIfChanged(nextSelected);
    });
  });
  onBeforeUnmount(function () {
    sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
  });
  return selected;
}
