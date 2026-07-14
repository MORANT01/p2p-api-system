/**
 * Configuration Management
 */

import * as dotenv from 'dotenv';
import { Logger } from '../utils/logger';
import type { NodeConfig } from '../types';

dotenv.config();

const logger = new Logger('Config');

export class Config {
  static getNodeConfig(): NodeConfig {
    return {
      nodeId: process.env.NODE_ID || 'node-1',
      port: parseInt(process.env.NODE_PORT || '3000', 10),
      host: process.env.NODE_HOST || 'localhost',
      bootstrapPeers: process.env.BOOTSTRAP_PEERS?.split(',').map(p => p.trim()),
      maxPeers: parseInt(process.env.MAX_PEERS || '50', 10),
      pingInterval: parseInt(process.env.PING_INTERVAL || '30000', 10),
      networkTimeout: parseInt(process.env.NETWORK_TIMEOUT || '5000', 10),
      encryptEnabled: process.env.ENCRYPT_ENABLED === 'true',
      cipherAlgorithm: process.env.CIPHER_ALGORITHM || 'aes-256-gcm',
      storageType: (process.env.STORAGE_TYPE as any) || 'leveldb',
      storagePath: process.env.STORAGE_PATH || './data'
    };
  }

  static getLogLevel(): string {
    return process.env.LOG_LEVEL || 'info';
  }

  static isDebugMode(): boolean {
    return process.env.DEBUG === 'true';
  }
}
