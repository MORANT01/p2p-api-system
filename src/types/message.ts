export type MessageType = 'request' | 'response' | 'ping' | 'pong' | 'service-discovery';

export interface Message {
  id: string;
  type: MessageType;
  from: string;
  to?: string;
  timestamp: number;
  data?: any;
}
