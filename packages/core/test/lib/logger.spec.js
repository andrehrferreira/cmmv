"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const logger_1 = require("../../lib/logger");
(0, vitest_1.describe)('Logger', () => {
    let logger;
    let originalConsoleLog;
    let originalConsoleError;
    let originalConsoleWarn;
    let originalConsoleDebug;
    let logOutput = [];
    let errorOutput = [];
    let warnOutput = [];
    let debugOutput = [];
    (0, vitest_1.beforeEach)(() => {
        logger = new logger_1.Logger();
        // Stubbing console methods manually
        originalConsoleLog = console.log;
        originalConsoleError = console.error;
        originalConsoleWarn = console.warn;
        originalConsoleDebug = console.debug;
        console.log = (message) => logOutput.push(message);
        console.error = (message) => errorOutput.push(message);
        console.warn = (message) => warnOutput.push(message);
        console.debug = (message) => debugOutput.push(message);
    });
    (0, vitest_1.afterEach)(() => {
        // Restore original console methods
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
        console.debug = originalConsoleDebug;
        // Clear output arrays
        logOutput = [];
        errorOutput = [];
        warnOutput = [];
        debugOutput = [];
    });
    (0, vitest_1.it)('should log a message with default context', () => {
        logger.log('Test message');
        (0, vitest_1.expect)(logOutput.length).toBe(1);
        (0, vitest_1.expect)(logOutput[0]).toContain('[Server]');
        (0, vitest_1.expect)(logOutput[0]).toContain('Test message');
    });
    (0, vitest_1.it)('should log an error message with custom context', () => {
        logger.error('Error message', 'CustomContext');
        (0, vitest_1.expect)(errorOutput.length).toBe(1);
        (0, vitest_1.expect)(errorOutput[0]).toContain('[CustomContext]');
        (0, vitest_1.expect)(errorOutput[0]).toContain('Error message');
        (0, vitest_1.expect)(errorOutput[0]).toContain('[Server]');
        (0, vitest_1.expect)(errorOutput[0]).toContain('\x1b[31mERROR\x1b[0m'); // Check red color for error
    });
    (0, vitest_1.it)('should log a warning message', () => {
        logger.warning('Warning message');
        (0, vitest_1.expect)(warnOutput.length).toBe(1);
        (0, vitest_1.expect)(warnOutput[0]).toContain('Warning message');
        (0, vitest_1.expect)(warnOutput[0]).toContain('\x1b[38;5;214mWARNING\x1b[0m'); // Check orange color for warning
    });
    (0, vitest_1.it)('should log a debug message', () => {
        logger.debug('Debug message');
        (0, vitest_1.expect)(debugOutput.length).toBe(1);
        (0, vitest_1.expect)(debugOutput[0]).toContain('Debug message');
        (0, vitest_1.expect)(debugOutput[0]).toContain('\x1b[34mDEBUG\x1b[0m'); // Check blue color for debug
    });
    (0, vitest_1.it)('should log a verbose message', () => {
        logger.verbose('Verbose message');
        (0, vitest_1.expect)(logOutput.length).toBe(1);
        (0, vitest_1.expect)(logOutput[0]).toContain('Verbose message');
        (0, vitest_1.expect)(logOutput[0]).toContain('\x1b[36mVERBOSE\x1b[0m'); // Check cyan color for verbose
    });
    (0, vitest_1.it)('should allow changing the default context', () => {
        const customLogger = new logger_1.Logger('CustomDefaultContext');
        customLogger.log('Message with custom default context');
        (0, vitest_1.expect)(logOutput.length).toBe(1);
        (0, vitest_1.expect)(logOutput[0]).toContain('[CustomDefaultContext]');
    });
    (0, vitest_1.it)('should use application context in the log', () => {
        logger.log('Message with application context');
        (0, vitest_1.expect)(logOutput.length).toBe(1);
        (0, vitest_1.expect)(logOutput[0]).toContain('[Server] -');
    });
});
