export interface Token {
  refreshTokenId?: number;
  tokenId: string;
  createdAt: Date;
  userId: number;
  expiresIn: Date;
}
