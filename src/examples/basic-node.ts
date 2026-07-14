/**
 * Basic Node Example
 */

import { P2PNode } from '../core/node';
import { Config } from '../config/config';

async function main() {
  try {
    const config = Config.getNodeConfig();
    const node = new P2PNode(config);

    await node.start();

    node.registerService('hello-service', {
      version: '1.0.0',
      methods: ['sayHello', 'sayGoodbye'],
      description: 'A simple greeting service'
    });

    console.log('Node Status:', node.getStatus());

    process.on('SIGINT', async () => {
      console.log('Shutting down...');
      await node.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start node:', error);
    process.exit(1);
  }
}

main();
