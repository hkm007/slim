export interface EventConfig {
  handler: (...args: any[]) => void | Promise<void>;
  stopPropagation?: boolean;
}
