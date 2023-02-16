import { EventObject, State, Interpreter, Typestate, Sender } from 'xstate';
import { Ref } from '@vue/composition-api';
/**
 * @deprecated Use `useActor` instead.
 *
 * @param service The interpreted machine
 * @returns A tuple of the current `state` of the service and the service's `send(event)` method
 */
export declare function useService<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  service:
    | Interpreter<TContext, any, TEvent, TTypestate>
    | Ref<Interpreter<TContext, any, TEvent, TTypestate>>
): {
  state: Ref<State<TContext, TEvent, any, TTypestate>>;
  send: Sender<TEvent>;
};
//# sourceMappingURL=useService.d.ts.map
