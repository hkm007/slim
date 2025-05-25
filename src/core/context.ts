import type { EventConfig } from './types';
import { log } from './logger';

export interface EventBusContext {
  on: (event: string, config: EventConfig) => void;
  off: (event: string, handler: EventConfig['handler']) => void;
  emit: (event: string, ...args: any[]) => Promise<void>;
}

export function createEventBusContext(): EventBusContext {
  const listeners: Map<string, EventConfig['handler'][]> = new Map();

  function on(event: string, config: EventConfig) {
    const handlers = listeners.get(event) ?? [];
    handlers.push(config.handler);
    listeners.set(event, handlers);

    log(`(Context) Registered handler for event "${event}". Total handlers: ${handlers.length}`);
  }

  function off(event: string, handlerToRemove: EventConfig['handler']) {
    const handlers = listeners.get(event);
    if (!handlers) {
      log(`(Context) No handlers found for event "${event}" when trying to remove.`);
      return;
    }

    const filtered = handlers.filter((h) => h !== handlerToRemove);
    listeners.set(event, filtered);

    log(`(Context) Removed handler from event "${event}". Remaining handlers: ${filtered.length}`);
  }

  async function emit(event: string, ...args: any[]) {
    const handlers = listeners.get(event);
    if (!handlers) {
      log(`(Context) Emit called for event "${event}" but no handlers registered.`);
      return;
    }

    log(`(Context) Emitting event "${event}" to ${handlers.length} handler(s) with args:`, args);

    for (const handler of handlers) {
      try {
        await handler(...args);
        log(`(Context) Handler for event "${event}" completed.`);
        // No stopPropagation here by design
      } catch (error) {
        console.error(`[slimey] (Context) Error in handler for event "${event}":`, error);
      }
    }
  }

  return { on, off, emit };
}
