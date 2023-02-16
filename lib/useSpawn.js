'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useSpawn = void 0;
var behaviors_1 = require('xstate/lib/behaviors');
/**
 * Vue composable that spawns an `ActorRef` with the specified `behavior`.
 * The returned `ActorRef` can be used with the `useActor(actorRef)` hook.
 *
 * @param behavior The actor behavior to spawn
 * @returns An ActorRef with the specified `behavior`
 */
function useSpawn(behavior) {
  var actorRef = behaviors_1.spawnBehavior(behavior);
  return actorRef;
}
exports.useSpawn = useSpawn;