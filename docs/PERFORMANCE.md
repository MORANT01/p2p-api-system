# Performance Tuning

## Network Optimization

### Connection Pooling

Optimize the number of peer connections:

```bash
MAX_PEERS=100  # Increase for larger networks
PING_INTERVAL=60000  # Reduce frequency for lighter load
```

### Message Batching

Batch multiple messages to reduce overhead:

```typescript
// Send batched requests
const results = await Promise.all([
  node.request('service-1', 'method', { id: 1 }),
  node.request('service-2', 'method', { id: 2 }),
  node.request('service-3', 'method', { id: 3 })
]);
```

## Storage Optimization

### Choose appropriate storage backend

- **leveldb**: Best for local persistence
- **memory**: Best for performance (data not persisted)
- **sqlite**: Best for structured queries

### Database Maintenance

```bash
# Compact database
node-leveldb compact ./data

# Backup data
cp -r ./data ./data-backup-$(date +%s)
```

## CPU Optimization

### Thread Pool Size

Configure worker threads for parallel processing:

```bash
UV_THREADPOOL_SIZE=128
```

### Memory Allocation

Adjust Node.js memory limits:

```bash
node --max-old-space-size=4096 src/index.ts
```

## Monitoring

### Health Checks

Implement regular health checks:

```typescript
setInterval(() => {
  const status = node.getStatus();
  console.log('Health:', status);
}, 30000);
```

### Metrics

Track key performance indicators:

- Message latency
- Peer connection stability
- Service response times
- Memory usage
- CPU usage

## Benchmarking

### Load Testing

```bash
# Install load testing tool
npm install -g autocannon

# Run load test
autocannon http://localhost:3000
```

### Profiling

```bash
# CPU profiling
node --prof src/index.ts
node --prof-process isolate-*.log > profile.txt
```
