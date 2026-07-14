# P2P API System - Protocol Specification

## Message Protocol

### Message Structure

```json
{
  "id": "node-1-1234567890-abc123",
  "type": "request",
  "from": "node-1",
  "to": "node-2",
  "timestamp": 1234567890000,
  "data": {
    "serviceName": "user-service",
    "method": "getUser",
    "params": {
      "userId": 1
    }
  }
}
```

## Message Types

### Request

A request to execute a service method.

```json
{
  "type": "request",
  "data": {
    "serviceName": "string",
    "method": "string",
    "params": {}
  }
}
```

### Response

A response to a request.

```json
{
  "type": "response",
  "id": "original-request-id",
  "data": {}
}
```

### Ping/Pong

Health check messages.

```json
{
  "type": "ping"
}
```

### Service Discovery

Advertise available services.

```json
{
  "type": "service-discovery",
  "data": {
    "services": [
      {
        "name": "service-name",
        "version": "1.0.0",
        "methods": []
      }
    ]
  }
}
```

## Connection Flow

1. **Bootstrap**: New node connects to bootstrap peers
2. **Peer Exchange**: Exchange peer information
3. **Service Discovery**: Announce available services
4. **Keep-Alive**: Regular ping/pong messages
5. **Graceful Disconnect**: Send disconnect message before closing

## Error Handling

Errors are returned in response messages:

```json
{
  "type": "response",
  "id": "request-id",
  "data": {
    "error": {
      "code": "SERVICE_NOT_FOUND",
      "message": "Service 'user-service' not found",
      "details": {}
    }
  }
}
```

## Error Codes

- `INVALID_REQUEST`: Malformed request
- `SERVICE_NOT_FOUND`: Service does not exist
- `METHOD_NOT_FOUND`: Method does not exist in service
- `INVALID_PARAMS`: Invalid method parameters
- `INTERNAL_ERROR`: Server-side error
- `TIMEOUT`: Request timed out
- `NETWORK_ERROR`: Network communication error
