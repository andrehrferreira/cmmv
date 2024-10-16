import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Logger } from '../../lib/logger';

describe('Logger', () => {
    let logger: Logger;
    let originalConsoleLog: any;
    let originalConsoleError: any;
    let originalConsoleWarn: any;
    let originalConsoleDebug: any;
    let logOutput: string[] = [];
    let errorOutput: string[] = [];
    let warnOutput: string[] = [];
    let debugOutput: string[] = [];

    beforeEach(() => {
        logger = new Logger();
        // Stubbing console methods manually
        originalConsoleLog = console.log;
        originalConsoleError = console.error;
        originalConsoleWarn = console.warn;
        originalConsoleDebug = console.debug;

        console.log = (message: string) => logOutput.push(message);
        console.error = (message: string) => errorOutput.push(message);
        console.warn = (message: string) => warnOutput.push(message);
        console.debug = (message: string) => debugOutput.push(message);
    });

    afterEach(() => {
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

    it('should log a message with default context', () => {
        logger.log('Test message');

        expect(logOutput.length).toBe(1);
        expect(logOutput[0]).toContain('[Server]');
        expect(logOutput[0]).toContain('Test message');
    });

    it('should log an error message with custom context', () => {
        logger.error('Error message', 'CustomContext');

        expect(errorOutput.length).toBe(1);
        expect(errorOutput[0]).toContain('[CustomContext]');
        expect(errorOutput[0]).toContain('Error message');
        expect(errorOutput[0]).toContain('[Server]');
        expect(errorOutput[0]).toContain('\x1b[31mERROR\x1b[0m'); // Check red color for error
    });

    it('should log a warning message', () => {
        logger.warning('Warning message');

        expect(warnOutput.length).toBe(1);
        expect(warnOutput[0]).toContain('Warning message');
        expect(warnOutput[0]).toContain('\x1b[38;5;214mWARNING\x1b[0m'); // Check orange color for warning
    });

    it('should log a debug message', () => {
        logger.debug('Debug message');

        expect(debugOutput.length).toBe(1);
        expect(debugOutput[0]).toContain('Debug message');
        expect(debugOutput[0]).toContain('\x1b[34mDEBUG\x1b[0m'); // Check blue color for debug
    });

    it('should log a verbose message', () => {
        logger.verbose('Verbose message');

        expect(logOutput.length).toBe(1);
        expect(logOutput[0]).toContain('Verbose message');
        expect(logOutput[0]).toContain('\x1b[36mVERBOSE\x1b[0m'); // Check cyan color for verbose
    });

    it('should allow changing the default context', () => {
        const customLogger = new Logger('CustomDefaultContext');
        customLogger.log('Message with custom default context');

        expect(logOutput.length).toBe(1);
        expect(logOutput[0]).toContain('[CustomDefaultContext]');
    });

    it('should use application context in the log', () => {
        logger.log('Message with application context');

        expect(logOutput.length).toBe(1);
        expect(logOutput[0]).toContain('[Server] -');
    });
});
