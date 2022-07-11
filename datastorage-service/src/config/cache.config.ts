const host = process.env.MARKETPLACE_REDIS_HOST || 'localhost';
const port = parseInt(process.env.MARKETPLACE_REDIS_PORT || '6379', 10);
const url = `redis://${host}:${port}`;

export default {
  host: host,
  port: port,
  url: url,
};
