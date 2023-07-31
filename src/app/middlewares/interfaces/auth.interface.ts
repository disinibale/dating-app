export interface DecodedJwtPayload {
    userId?: number;
    email?: string;
    fullname?: string;
    iat?: number;
    exp?: number;
  }