import { bus } from '../core/bus';

export async function dispatch(event: string, ...args: any[]) {
  await bus.emit(event, ...args);
}
