# Troubleshooting Guide

## Common Issues

### Node fails to start

**Symptoms**: Process exits immediately after starting.

**Solutions:**
- Check port is not already in use: `lsof -i :3000`
- Verify NODE_ID is unique
- Check file permissions in storage directory
- Review logs for error messages

### Peers not connecting

**Symptoms**: Node runs but remains isolated.

**Solutions:**
- Verify bootstrap peers are reachable
- Check firewall rules
- Enable debug logging: `DEBUG=true`
- Test network connectivity between nodes

### Service calls timing out

**Symptoms**: Requests to services return timeout errors.

**Solutions:**
- Increase NETWORK_TIMEOUT
- Check service implementation for blocking operations
- Verify peer connectivity
- Monitor network latency

### High memory usage

**Symptoms**: Node process consuming excessive memory.

**Solutions:**
- Reduce MAX_PEERS
- Clear old storage data
- Enable garbage collection logging
- Profile memory usage: `node --inspect`

### Lost messages

**Symptoms**: Some service calls return no response.

**Solutions:**
- Implement message retry logic
- Enable persistent logging
- Increase message queue size
- Check for network packet loss

## Debugging

### Enable debug logging

```bash
DEBUG=true LOG_LEVEL=debug npm start
```

### Inspect node state

```javascript
const status = node.getStatus();
console.log('Status:', status);
console.log('Services:', node.getServices());
console.log('Peers:', node.getPeers());
```

### Use Node Inspector

```bash
node --inspect src/index.ts
```

Then open chrome://inspect in Chrome.

## Logging

Logs are written to stdout/stderr and stored in `logs/` directory.

**Log Levels**:
- `debug`: Detailed diagnostic information
- `info`: General informational messages
- `warn`: Warning conditions
- `error`: Error conditions
