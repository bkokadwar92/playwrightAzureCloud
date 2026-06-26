import winston, { Logger as WinstonLogger } from 'winston';
import path from 'path';

/**
 * Create a Winston logger instance with scope (category/component name)
 * @param scope - The logger scope/category (e.g., class name, module name)
 * @returns Logger instance
 */
export function createLogger(scope: string): WinstonLogger {
    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, scope }) => {
                return `[${timestamp}] [${level}] [${scope}] ${message}`;
            })
        ),
        defaultMeta: { service: 'playwright-fw' },
        transports: [
            // Console transport for all logs
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf(({ timestamp, level, message, scope: logScope }) => {
                        return `[${timestamp}] [${level}] [${logScope || scope}] ${message}`;
                    })
                ),
            }),
            // File transport for errors
            new winston.transports.File({
                filename: path.join('logs', 'error.log'),
                level: 'error',
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.json()
                ),
            }),
            // File transport for all logs
            new winston.transports.File({
                filename: path.join('logs', 'combined.log'),
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.json()
                ),
            }),
        ],
    });
}

/**
 * Logger utility class that wraps Winston logger with scope
 */
export class AppLogger {
    private logger: WinstonLogger;
    private scope: string;

    constructor(scope: string) {
        this.scope = scope;
        this.logger = createLogger(scope);
    }

    info(message: string, meta?: Record<string, any>): void {
        this.logger.info(message, { scope: this.scope, ...meta });
    }

    debug(message: string, meta?: Record<string, any>): void {
        this.logger.debug(message, { scope: this.scope, ...meta });
    }

    warn(message: string, meta?: Record<string, any>): void {
        this.logger.warn(message, { scope: this.scope, ...meta });
    }

    error(message: string, error?: Error | Record<string, any>): void {
        if (error instanceof Error) {
            this.logger.error(message, { scope: this.scope, stack: error.stack });
        } else {
            this.logger.error(message, { scope: this.scope, ...error });
        }
    }

    trace(message: string, meta?: Record<string, any>): void {
        this.logger.debug(message, { scope: this.scope, trace: true, ...meta });
    }
}

export default createLogger;
