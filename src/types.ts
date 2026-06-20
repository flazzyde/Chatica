export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  plaintext: string;
  ciphertext?: string;
  isEncrypted: boolean;
  timestamp: string;
  metadataStripped?: boolean;
}

export interface SecurityMetric {
  name: string;
  value: string;
  change: string;
  type: 'success' | 'warning' | 'info';
}

export interface ClientKeypair {
  publicKey: string;
  privateKey: string;
  fingerprint: string;
  strength: number;
}
