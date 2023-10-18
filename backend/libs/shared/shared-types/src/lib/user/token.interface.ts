export interface Token {
  id?: string;
  tokenId: string;
  createdAt: Date;
  userId: number;
  expiresIn: Date;
}
