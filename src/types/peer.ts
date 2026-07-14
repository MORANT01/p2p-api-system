export type PeerStatus = 'connected' | 'disconnected' | 'inactive';

export interface Peer {
  peerId: string;
  address: string;
  status: PeerStatus;
  lastSeen: number;
  latency: number;
}
