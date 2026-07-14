/**
 * P2P Node Implementation
 */

import { EventEmitter } from 'events';
import { MessageHandler } from './message-handler';
import { ServiceRegistry } from './service-registry';
import { PeerManager } from './peer-manager';
import { Logger } from '../utils/logger';
import type { NodeConfig, Service, Message } from '../types';

export class P2PNode extends EventEmitter {
  private nodeId: string;
  private config: NodeConfig;
  private logger: Logger;
  private messageHandler: MessageHandler;
  private serviceRegistry: ServiceRegistry;
  private peerManager: PeerManager;
  private isRunning: boolean = false;

  constructor(config: NodeConfig) {
    super();
    this.config = config;
    this.nodeId = config.nodeId;
    this.logger = new Logger(`P2PNode-${this.nodeId}`);
    
    this.messageHandler = new MessageHandler(this.nodeId, this.logger);
    this.serviceRegistry = new ServiceRegistry(this.logger);
    this.peerManager = new PeerManager(config, this.logger);
    
    this.setupEventHandlers();
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logger.warn('Node is already running');
      return;
    }

    try {
      this.logger.info(`Starting P2P node: ${this.nodeId}`);
      await this.peerManager.initialize();
      
      if (this.config.bootstrapPeers && this.config.bootstrapPeers.length > 0) {
        await this.peerManager.connectToBootstrapPeers(this.config.bootstrapPeers);
      }
      
      this.isRunning = true;
      this.logger.info('P2P node started successfully');
      this.emit('started');
    } catch (error) {
      this.logger.error('Failed to start node', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    try {
      this.logger.info('Stopping P2P node');
      await this.peerManager.disconnect();
      this.isRunning = false;
      this.logger.info('P2P node stopped');
      this.emit('stopped');
    } catch (error) {
      this.logger.error('Error stopping node', error);
      throw error;
    }
  }

  registerService(serviceName: string, service: Partial<Service>): void {
    this.logger.info(`Registering service: ${serviceName}`);
    this.serviceRegistry.register(serviceName, service as Service);
    this.emit('serviceRegistered', { serviceName, service });
  }

  unregisterService(serviceName: string): void {
    this.logger.info(`Unregistering service: ${serviceName}`);
    this.serviceRegistry.unregister(serviceName);
    this.emit('serviceUnregistered', { serviceName });
  }

  getServices(): Map<string, Service> {
    return this.serviceRegistry.getAll();
  }

  async request<T = any>(
    serviceName: string,
    method: string,
    params: any = {}
  ): Promise<T> {
    this.logger.debug(`Request to ${serviceName}.${method}`);
    
    const message: Message = {
      id: this.generateMessageId(),
      type: 'request',
      from: this.nodeId,
      timestamp: Date.now(),
      data: {
        serviceName,
        method,
        params
      }
    };

    return this.messageHandler.sendRequest<T>(message, this.peerManager);
  }

  getPeers() {
    return this.peerManager.getConnectedPeers();
  }

  getStatus() {
    return {
      nodeId: this.nodeId,
      isRunning: this.isRunning,
      peersCount: this.peerManager.getConnectedPeers().length,
      servicesCount: this.serviceRegistry.getAll().size,
      uptime: process.uptime()
    };
  }

  private setupEventHandlers(): void {
    this.peerManager.on('peerConnected', (peer) => {
      this.logger.info(`Peer connected: ${peer.peerId}`);
      this.emit('peerConnected', peer);
    });

    this.peerManager.on('peerDisconnected', (peerId) => {
      this.logger.info(`Peer disconnected: ${peerId}`);
      this.emit('peerDisconnected', peerId);
    });

    this.messageHandler.on('message', (message) => {
      this.logger.debug(`Message received: ${message.id}`);
      this.emit('message', message);
    });
  }

  private generateMessageId(): string {
    return `${this.nodeId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
