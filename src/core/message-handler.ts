/**
 * Message Handler
 */

import { EventEmitter } from 'events';
import { Logger } from '../utils/logger';
import type { Message } from '../types';

export class MessageHandler extends EventEmitter {
  private nodeId: string;
  private logger: Logger;
  private pendingRequests: Map<string, any> = new Map();

  constructor(nodeId: string, logger: Logger) {
    super();
    this.nodeId = nodeId;
    this.logger = logger;
  }

  async sendRequest<T>(message: Message, peerManager: any): Promise<T> {
    this.logger.debug(`Sending request: ${message.id}`);
    
    let resolve: any;
    let reject: any;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.pendingRequests.set(message.id, { resolve, reject, timeout: null });

    const timeoutHandle = setTimeout(() => {
      this.pendingRequests.delete(message.id);
      reject(new Error(`Request timeout: ${message.id}`));
    }, 30000);

    this.pendingRequests.get(message.id).timeout = timeoutHandle;

    try {
      const peers = peerManager.getConnectedPeers();
      if (peers.length === 0) {
        throw new Error('No connected peers available');
      }

      await peerManager.sendMessage(peers[0], message);
    } catch (error) {
      this.pendingRequests.delete(message.id);
      throw error;
    }

    return promise;
  }

  handleMessage(message: Message): void {
    this.logger.debug(`Handling message: ${message.id}`);

    if (message.type === 'response' && this.pendingRequests.has(message.id)) {
      const request = this.pendingRequests.get(message.id);
      clearTimeout(request.timeout);
      this.pendingRequests.delete(message.id);
      request.resolve(message.data);
    }

    this.emit('message', message);
  }

  createResponse(requestMessage: Message, data: any): Message {
    return {
      id: requestMessage.id,
      type: 'response',
      from: this.nodeId,
      to: requestMessage.from,
      timestamp: Date.now(),
      data
    };
  }
}
