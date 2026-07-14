export interface NodeConfig {
  nodeId: string;
  port: number;
  host?: string;
  bootstrapPeers?: string[];
  maxPeers?: number;
  pingInterval?: number;
  networkTimeout?: number;
  encryptEnabled?: boolean;
  cipherAlgorithm?: string;
  storageType?: 'leveldb' | 'memory' | 'sqlite';
  storagePath?: string;
}
