# P2P API System

A comprehensive peer-to-peer API system that enables decentralized communication and data sharing between nodes in a distributed network.

## 🌐 Features

- **Peer Discovery**: Automatic node discovery and registration
- **Decentralized Architecture**: No central server dependency
- **Secure Communication**: End-to-end encryption for peer messages
- **Request/Response Protocol**: RESTful-like API over P2P network
- **Node Management**: Join, leave, and manage peer connections
- **Data Persistence**: Distributed data storage across peers
- **Health Monitoring**: Node health checks and reliability tracking
- **Service Registry**: Discover available services on the network
- **Load Balancing**: Distribute requests across available peers

## 📋 Table of Contents

- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    P2P Network Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Peer 1  │  │  Peer 2  │  │  Peer 3  │  │  Peer N  │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
├───────┼─────────────┼─────────────┼─────────────┼──────────┤
│       │ Message    │ Message    │ Message    │             │
│       │ Routing   │ Routing   │ Routing   │             │
├───────┼─────────────┼─────────────┼─────────────┼──────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │        Service Discovery & Registry                │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│           Request/Response Handler Layer                    │
├─────────────────────────────────────────────────────────────┤
│           Data Persistence & Storage Layer                  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

```bash
git clone https://github.com/MORANT01/p2p-api-system.git
cd p2p-api-system
npm install
npm run start:node
```

## 📦 Installation

### Requirements
- Node.js >= 14.0.0
- npm >= 6.0.0
- Docker (optional)

### Setup
```bash
npm install
cp .env.example .env
npm run build
```

## 💡 Usage

### Create a Node
```javascript
const { P2PNode } = require('p2p-api-system');

const node = new P2PNode({
  nodeId: 'node-1',
  port: 3000,
  bootstrapPeers: ['peer-2:3001']
});

await node.start();
```

## 📖 API Documentation

See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for complete API reference.

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Protocol Specification](./docs/PROTOCOL.md)
- [Security Guide](./docs/SECURITY.md)
- [Configuration](./docs/CONFIGURATION.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file
