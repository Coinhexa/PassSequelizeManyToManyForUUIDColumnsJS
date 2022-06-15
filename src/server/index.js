import http from 'http';
import { app } from './app';

const server = http.createServer(app);

/* istanbul ignore next */
const PORT = process.env.PORT || 8000;
/* istanbul ignore next */
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${PORT}`);
});

export { server };
