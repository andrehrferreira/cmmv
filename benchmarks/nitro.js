const { createServer } = require('http');

async function startNitro() {
  const { createNitro } = await import('nitropack');

  const nitro = await createNitro({
    preset: 'node-server',
  });

  nitro.hooks.hook('ready', () => {
    nitro.h3App.use('/',
      nitro.h3App.router.get('/', (req, res) => {
        res.end('Hello world');
      })
    );
  });

  const server = createServer(nitro.h3App);

  const PORT = 5005;

  server.listen(PORT);
}

startNitro().catch((err) => {
  console.error('Failed to start Nitro', err);
});
