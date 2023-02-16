import { ActorRef, Subscribable } from 'xstate';
export declare function useSelector<
  TActor extends ActorRef<any, any>,
  T,
  TEmitted = TActor extends Subscribable<infer Emitted> ? Emitted : never
>(
  actor: TActor,
  selector: (emitted: TEmitted) => T,
  compare?: (a: T, b: T) => boolean,
  getSnapshot?: (a: TActor) => TEmitted
): import('@vue/composition-api').Ref<T>;
//# sourceMappingURL=useSelector.d.ts.map
