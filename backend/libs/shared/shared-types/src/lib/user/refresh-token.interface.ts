export interface RefreshToken {
  refreshTokenId?: number;
  tokenId: string;
  createdAt: Date;
  userId: number;
  expiresIn: Date;
}
