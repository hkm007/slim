// src/core/logger.ts
const DEBUG = typeof process !== 'undefined' && process.env.DEBUG === 'true';

export function log(...args: any[]) {
  if (DEBUG) {
    console.log('[slimey]', ...args);
  }
}
