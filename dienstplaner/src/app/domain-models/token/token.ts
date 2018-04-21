/** The firebase Token class */
export class Token {
  /**
   * constructor
   * @param {string} sub
   * @param {Date} exp
   * @param {Date} iat
   * @param {string} iss
   * @param {string} cryptoType
   */
  constructor(sub: string, // technical id of user
              exp: Date, // expiration date
              iat: Date, // timestamp Creation date
              iss?: string, // the authentication server, optional
              cryptoType?: string  // RS256 / HS256  default is RS256
  ) {
  }
}
