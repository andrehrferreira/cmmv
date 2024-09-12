const { createServer } = require('vite');

(async () => {
    try {
        const server = await createServer({
            configFile: './benchmarks/vite.config.js', 
        });

        await server.listen();

        server.httpServer.address();
    } catch (err) {}
})();
