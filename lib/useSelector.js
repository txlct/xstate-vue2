'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useSelector = void 0;
var composition_api_1 = require('@vue/composition-api');
var useActor_1 = require('./useActor');
var defaultCompare = function (a, b) {
  return a === b;
};
function useSelector(actor, selector, compare, getSnapshot) {
  if (compare === void 0) {
    compare = defaultCompare;
  }
  if (getSnapshot === void 0) {
    getSnapshot = useActor_1.defaultGetSnapshot;
  }
  var selected = composition_api_1.shallowRef(selector(getSnapshot(actor)));
  var updateSelectedIfChanged = function (nextSelected) {
    if (!compare(selected.value, nextSelected)) {
      selected.value = nextSelected;
    }
  };
  var sub;
  composition_api_1.onMounted(function () {
    var initialSelected = selector(getSnapshot(actor));
    updateSelectedIfChanged(initialSelected);
    sub = actor.subscribe(function (emitted) {
      var nextSelected = selector(emitted);
      updateSelectedIfChanged(nextSelected);
    });
  });
  composition_api_1.onBeforeUnmount(function () {
    sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
  });
  return selected;
}
exports.useSelector = useSelector;
