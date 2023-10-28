import { UnauthorizedException } from '@nestjs/common';
import { AuthError } from '../authentication.constant';

export class TokenNotExistsException extends UnauthorizedException {
  constructor(tokenId: string) {
    super(`${AuthError.TokenNotFound} with ${tokenId}`);
  }
}
