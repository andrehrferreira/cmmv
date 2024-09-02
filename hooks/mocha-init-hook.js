module.exports = function mochaHooks() {
    return {
        async beforeAll() {
            await import('reflect-metadata');
        },
    };
};
