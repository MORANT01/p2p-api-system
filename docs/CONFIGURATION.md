# Configuration Guide

## Environment Variables

### Node Configuration

- `NODE_ID`: Unique identifier for the node (default: node-1)
- `NODE_PORT`: Port to listen on (default: 3000)
- `NODE_HOST`: Host to bind to (default: localhost)

### Network Configuration

- `BOOTSTRAP_PEERS`: Comma-separated list of bootstrap peer addresses
- `MAX_PEERS`: Maximum number of peer connections (default: 50)
- `PING_INTERVAL`: Interval between health checks in ms (default: 30000)
- `NETWORK_TIMEOUT`: Request timeout in ms (default: 5000)

### Security Configuration

- `ENCRYPT_ENABLED`: Enable message encryption (default: false)
- `CIPHER_ALGORITHM`: Encryption algorithm (default: aes-256-gcm)

### Storage Configuration

- `STORAGE_TYPE`: Storage backend - leveldb, memory, sqlite (default: leveldb)
- `STORAGE_PATH`: Path to storage directory (default: ./data)

### Logging Configuration

- `LOG_LEVEL`: Logging level - debug, info, warn, error (default: info)
- `LOG_FORMAT`: Log format - json, text (default: json)

### Development

- `DEV_MODE`: Enable development mode (default: false)
- `DEBUG`: Enable debug logging (default: false)

## Configuration File

Alternatively, create `config/default.json`:

```json
{
  "nodeId": "node-1",
  "port": 3000,
  "host": "localhost",
  "bootstrapPeers": [
    "peer-2:3001",
    "peer-3:3002"
  ],
  "maxPeers": 50,
  "pingInterval": 30000,
  "networkTimeout": 5000,
  "encryptEnabled": true,
  "cipherAlgorithm": "aes-256-gcm",
  "storageType": "leveldb",
  "storagePath": "./data"
}
```

## Runtime Configuration

```typescript
const node = new P2PNode({
  nodeId: 'node-1',
  port: 3000,
  bootstrapPeers: ['peer-2:3001'],
  maxPeers: 50
});
```

## Configuration Priority

1. Runtime options (highest priority)
2. Environment variables
3. Config file
4. Defaults (lowest priority)
