# P2P API System - API Documentation

## P2PNode Class

### Constructor

```typescript
new P2PNode(config: NodeConfig)
```

**Parameters:**
- `config`: Node configuration object

### Methods

#### start()

Start the P2P node and connect to bootstrap peers.

```typescript
await node.start(): Promise<void>
```

#### stop()

Stop the P2P node and disconnect from all peers.

```typescript
await node.stop(): Promise<void>
```

#### registerService()

Register a new service.

```typescript
node.registerService(serviceName: string, service: Partial<Service>): void
```

**Example:**
```typescript
node.registerService('user-service', {
  version: '1.0.0',
  methods: ['getUser', 'createUser'],
  description: 'User management service'
});
```

#### unregisterService()

Unregister a service.

```typescript
node.unregisterService(serviceName: string): void
```

#### request()

Make a request to a remote service.

```typescript
await node.request<T>(serviceName: string, method: string, params?: any): Promise<T>
```

**Example:**
```typescript
const user = await node.request('user-service', 'getUser', { userId: 1 });
```

#### getServices()

Get all registered services on this node.

```typescript
node.getServices(): Map<string, Service>
```

#### getPeers()

Get all connected peers.

```typescript
node.getPeers(): Peer[]
```

#### getStatus()

Get node status information.

```typescript
node.getStatus(): NodeStatus
```

**Returns:**
```typescript
{
  nodeId: string;
  isRunning: boolean;
  peersCount: number;
  servicesCount: number;
  uptime: number;
}
```

### Events

#### started

Emitted when the node starts successfully.

```typescript
node.on('started', () => { /* ... */ });
```

#### stopped

Emitted when the node stops.

```typescript
node.on('stopped', () => { /* ... */ });
```

#### peerConnected

Emitted when a peer connects.

```typescript
node.on('peerConnected', (peer: Peer) => { /* ... */ });
```

#### peerDisconnected

Emitted when a peer disconnects.

```typescript
node.on('peerDisconnected', (peerId: string) => { /* ... */ });
```

#### serviceRegistered

Emitted when a service is registered.

```typescript
node.on('serviceRegistered', ({ serviceName, service }) => { /* ... */ });
```

#### serviceUnregistered

Emitted when a service is unregistered.

```typescript
node.on('serviceUnregistered', ({ serviceName }) => { /* ... */ });
```

## Types

### NodeConfig

```typescript
interface NodeConfig {
  nodeId: string;                    // Unique node identifier
  port: number;                       // Port to listen on
  host?: string;                      // Host to listen on (default: localhost)
  bootstrapPeers?: string[];          // Initial peers to connect to
  maxPeers?: number;                  // Maximum number of connections (default: 50)
  pingInterval?: number;              // Health check interval (default: 30000)
  networkTimeout?: number;            // Request timeout (default: 5000)
  encryptEnabled?: boolean;           // Enable encryption (default: false)
  cipherAlgorithm?: string;           // Encryption algorithm (default: aes-256-gcm)
  storageType?: 'leveldb' | 'memory' | 'sqlite';  // Storage backend
  storagePath?: string;               // Path to storage directory
}
```

### Message

```typescript
interface Message {
  id: string;                         // Unique message identifier
  type: MessageType;                  // Message type
  from: string;                       // Sender node ID
  to?: string;                        // Recipient node ID
  timestamp: number;                  // Message timestamp
  data?: any;                         // Message payload
}

type MessageType = 'request' | 'response' | 'ping' | 'pong' | 'service-discovery';
```

### Peer

```typescript
interface Peer {
  peerId: string;                     // Peer identifier
  address: string;                    // Peer address
  status: PeerStatus;                 // Connection status
  lastSeen: number;                   // Last activity timestamp
  latency: number;                    // Network latency in ms
}

type PeerStatus = 'connected' | 'disconnected' | 'inactive';
```

### Service

```typescript
interface Service {
  version: string;                    // Service version
  methods: string[] | ServiceMethod[];  // Available methods
  description?: string;               // Service description
}

interface ServiceMethod {
  name: string;                       // Method name
  description?: string;               // Method description
  params?: Record<string, any>;       // Parameter schema
  returns?: any;                      // Return value schema
}
```
