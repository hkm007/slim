import { bus } from '../core/bus';
import type { EventConfig } from '../core/types';

export function useEvents(events: Record<string, EventConfig>) {
  const entries = Object.entries(events) as [string, EventConfig][];
  entries.forEach(([event, config]) => bus.on(event, config));

  return () => {
    entries.forEach(([event, config]) => bus.off(event, config.handler));
  };
}
