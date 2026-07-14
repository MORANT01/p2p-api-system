/**
 * Peer Manager
 */

import { EventEmitter } from 'events';
import { Logger } from '../utils/logger';
import type { NodeConfig, Peer } from '../types';

export class PeerManager extends EventEmitter {
  private peers: Map<string, Peer> = new Map();
  private config: NodeConfig;
  private logger: Logger;

  constructor(config: NodeConfig, logger: Logger) {
    super();
    this.config = config;
    this.logger = logger;
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing peer manager');
  }

  async connectToBootstrapPeers(bootstrapPeers: string[]): Promise<void> {
    this.logger.info(`Connecting to ${bootstrapPeers.length} bootstrap peers`);
    
    for (const peer of bootstrapPeers) {
      try {
        await this.connectPeer(peer);
      } catch (error) {
        this.logger.warn(`Failed to connect to bootstrap peer ${peer}`);
      }
    }
  }

  private async connectPeer(peerAddress: string): Promise<void> {
    this.logger.debug(`Connecting to peer: ${peerAddress}`);
    
    const peerId = peerAddress.split(':')[0];
    const peer: Peer = {
      peerId,
      address: peerAddress,
      status: 'connected',
      lastSeen: Date.now(),
      latency: 0
    };

    this.peers.set(peerId, peer);
    this.emit('peerConnected', peer);
  }

  getConnectedPeers(): Peer[] {
    return Array.from(this.peers.values()).filter(p => p.status === 'connected');
  }

  async sendMessage(peer: Peer, message: any): Promise<void> {
    this.logger.debug(`Sending message to peer ${peer.peerId}`);
  }

  async disconnect(): Promise<void> {
    this.logger.info('Disconnecting from all peers');
    this.peers.clear();
  }
}
