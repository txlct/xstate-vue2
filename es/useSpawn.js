import { spawnBehavior } from 'xstate/lib/behaviors';
/**
 * Vue composable that spawns an `ActorRef` with the specified `behavior`.
 * The returned `ActorRef` can be used with the `useActor(actorRef)` hook.
 *
 * @param behavior The actor behavior to spawn
 * @returns An ActorRef with the specified `behavior`
 */
export function useSpawn(behavior) {
  var actorRef = spawnBehavior(behavior);
  return actorRef;
}
