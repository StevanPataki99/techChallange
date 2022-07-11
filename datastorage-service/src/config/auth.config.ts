const jwtSecret = process.env.JWT_SECRET_KEY;

if (!jwtSecret) {
  throw new Error('JWT SECRET NOT SET');
}

export default {
  jwtSecret,
  /**
   * Expiry time for the access token, defaults to 1 hour
   */
  accessExpiresIn: parseInt(process.env.JWT_EXPIRATION_TIME || '3600', 10),
  /**
   * Expiry time for the refresh token, defaults to 31 days
   */
  refreshExpiresIn: parseInt(
    process.env.JWT_REFRESH_EXPIRATION_TIME || '2678400',
    10,
  ),
  /**
   * Cookie name for the refresh token, defaults to "refresh"
   */
  refreshCookieName: process.env.JWT_REFRESH_COOKIE_NAME || 'refresh',
};
