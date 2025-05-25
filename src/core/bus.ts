import type { EventConfig } from './types';
import { log } from './logger';

type Handler = EventConfig['handler'] & { stopPropagation?: boolean };

class EventBus {
  private listeners = new Map<string, Handler[]>();

  on(event: string, config: EventConfig) {
    const handlers = this.listeners.get(event) ?? [];
    const handler = config.handler as Handler;
    handler.stopPropagation = config.stopPropagation ?? false;
    handlers.push(handler);
    this.listeners.set(event, handlers);

    log(`Registered handler for event "${event}". Total handlers: ${handlers.length}`);
  }

  off(event: string, handlerToRemove: EventConfig['handler']) {
    const handlers = this.listeners.get(event);
    if (!handlers) {
      log(`No handlers found for event "${event}" when trying to remove.`);
      return;
    }

    const filtered = handlers.filter((h) => h !== handlerToRemove);
    this.listeners.set(event, filtered);

    log(`Removed handler from event "${event}". Remaining handlers: ${filtered.length}`);
  }

  async emit(event: string, ...args: any[]) {
    const handlers = this.listeners.get(event);
    if (!handlers) {
      log(`Emit called for event "${event}" but no handlers registered.`);
      return;
    }

    log(`Emitting event "${event}" to ${handlers.length} handler(s) with args:`, args);

    for (const handler of handlers) {
      try {
        await handler(...args);
        log(`Handler for event "${event}" completed.`);

        if (handler.stopPropagation) {
          log(`Event "${event}" propagation stopped by handler.`);
          break;
        }
      } catch (error) {
        console.error(`[slimey] Error in handler for event "${event}":`, error);
      }
    }
  }
}

export const bus = new EventBus();
