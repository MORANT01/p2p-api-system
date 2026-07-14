/**
 * Logger Utility
 */

export class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  info(message: string, data?: any): void {
    console.log(`[${this.prefix}] INFO: ${message}`, data || '');
  }

  debug(message: string, data?: any): void {
    console.debug(`[${this.prefix}] DEBUG: ${message}`, data || '');
  }

  warn(message: string, data?: any): void {
    console.warn(`[${this.prefix}] WARN: ${message}`, data || '');
  }

  error(message: string, error?: any): void {
    console.error(`[${this.prefix}] ERROR: ${message}`, error || '');
  }
}
