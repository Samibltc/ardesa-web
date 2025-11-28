// Minimal Next.js custom server for cPanel/Passenger
// Listens on process.env.PORT provided by the host, falls back to 3000.
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hostname = '0.0.0.0';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, (err) => {
      if (err) {
        console.error('Server failed to start:', err);
        process.exit(1);
      }
      console.log(`> Next.js server ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Next prepare:', err);
    process.exit(1);
  });
