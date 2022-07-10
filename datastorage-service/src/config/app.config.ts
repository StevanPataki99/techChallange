const baseUrl = process.env.BASE_URL || '0.0.0.0';
const port = parseInt(process.env.PORT || '3002', 10);

export default {
  baseUrl,
  port,
};
