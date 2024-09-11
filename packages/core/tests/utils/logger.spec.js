"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const logger_utils_1 = require("../../utils/logger.utils");
describe('Logger', function () {
    let logger;
    let originalConsoleLog;
    let originalConsoleError;
    let originalConsoleWarn;
    let originalConsoleDebug;
    let logOutput = [];
    let errorOutput = [];
    let warnOutput = [];
    let debugOutput = [];
    beforeEach(function () {
        logger = new logger_utils_1.Logger();
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
    afterEach(function () {
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
    it('should log a message with default context', function () {
        logger.log('Test message');
        assert_1.strict.strictEqual(logOutput.length, 1);
        (0, assert_1.strict)(logOutput[0].includes('[Server]'));
        (0, assert_1.strict)(logOutput[0].includes('Test message'));
    });
    it('should log an error message with custom context', function () {
        logger.error('Error message', 'CustomContext');
        assert_1.strict.strictEqual(errorOutput.length, 1);
        (0, assert_1.strict)(errorOutput[0].includes('[CustomContext]'));
        (0, assert_1.strict)(errorOutput[0].includes('Error message'));
        (0, assert_1.strict)(errorOutput[0].includes('[Server]'));
        (0, assert_1.strict)(errorOutput[0].includes('\x1b[31mERROR\x1b[0m')); // Check red color for error
    });
    it('should log a warning message', function () {
        logger.warning('Warning message');
        assert_1.strict.strictEqual(warnOutput.length, 1);
        (0, assert_1.strict)(warnOutput[0].includes('Warning message'));
        (0, assert_1.strict)(warnOutput[0].includes('\x1b[38;5;214mWARNING\x1b[0m')); // Check orange color for warning
    });
    it('should log a debug message', function () {
        logger.debug('Debug message');
        assert_1.strict.strictEqual(debugOutput.length, 1);
        (0, assert_1.strict)(debugOutput[0].includes('Debug message'));
        (0, assert_1.strict)(debugOutput[0].includes('\x1b[34mDEBUG\x1b[0m')); // Check blue color for debug
    });
    it('should log a verbose message', function () {
        logger.verbose('Verbose message');
        assert_1.strict.strictEqual(logOutput.length, 1);
        (0, assert_1.strict)(logOutput[0].includes('Verbose message'));
        (0, assert_1.strict)(logOutput[0].includes('\x1b[36mVERBOSE\x1b[0m')); // Check cyan color for verbose
    });
    it('should allow changing the default context', function () {
        const customLogger = new logger_utils_1.Logger('CustomDefaultContext');
        customLogger.log('Message with custom default context');
        assert_1.strict.strictEqual(logOutput.length, 1);
        (0, assert_1.strict)(logOutput[0].includes('[CustomDefaultContext]'));
    });
    it('should use application context in the log', function () {
        logger.log('Message with application context');
        assert_1.strict.strictEqual(logOutput.length, 1);
        (0, assert_1.strict)(logOutput[0].includes('[Server] -'));
    });
});
