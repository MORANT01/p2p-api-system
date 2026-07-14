/**
 * P2P Node Tests
 */

import { P2PNode } from '../../src/core/node';

describe('P2PNode', () => {
  let node: P2PNode;

  beforeEach(() => {
    node = new P2PNode({
      nodeId: 'test-node',
      port: 3000
    });
  });

  describe('Node Lifecycle', () => {
    it('should start successfully', async () => {
      await node.start();
      expect(node.getStatus().isRunning).toBe(true);
    });

    it('should stop successfully', async () => {
      await node.start();
      await node.stop();
      expect(node.getStatus().isRunning).toBe(false);
    });
  });

  describe('Service Management', () => {
    beforeEach(async () => {
      await node.start();
    });

    afterEach(async () => {
      await node.stop();
    });

    it('should register a service', () => {
      node.registerService('test-service', {
        version: '1.0.0',
        methods: ['test']
      });

      expect(node.getServices().has('test-service')).toBe(true);
    });

    it('should unregister a service', () => {
      node.registerService('test-service', {
        version: '1.0.0',
        methods: ['test']
      });
      node.unregisterService('test-service');

      expect(node.getServices().has('test-service')).toBe(false);
    });
  });
});
