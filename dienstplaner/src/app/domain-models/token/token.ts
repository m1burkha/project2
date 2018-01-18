export class Token {

  constructor(sub: string, // technical id of user
              exp: Date, // expiration date
              iat: Date, // timestamp Creation date
              iss?: string, // the authentication server, optional
              cryptoType?: string  // RS256 / HS256  default is RS256
  ) {
  }
}
