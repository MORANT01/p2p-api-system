/**
 * Service Registry
 */

import { Logger } from '../utils/logger';
import type { Service } from '../types';

export class ServiceRegistry {
  private services: Map<string, Service> = new Map();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  register(name: string, service: Service): void {
    this.logger.info(`Service registered: ${name}`);
    this.services.set(name, service);
  }

  unregister(name: string): void {
    if (this.services.has(name)) {
      this.logger.info(`Service unregistered: ${name}`);
      this.services.delete(name);
    }
  }

  get(name: string): Service | undefined {
    return this.services.get(name);
  }

  getAll(): Map<string, Service> {
    return new Map(this.services);
  }

  exists(name: string): boolean {
    return this.services.has(name);
  }
}
