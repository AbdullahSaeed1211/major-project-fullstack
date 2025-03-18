/**
 * Simple logger utility for consistent logging throughout the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface Logger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

/**
 * Creates a logger for a specific service/component
 */
export function createServiceLogger(serviceName: string): Logger {
  const isProd = process.env.NODE_ENV === 'production';
  
  // Only log debug messages in development
  const shouldLogDebug = !isProd;
  
  // Format the log message with timestamp and service name
  const formatMessage = (level: string, message: string): string => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase().padEnd(5)}] [${serviceName}] ${message}`;
  };

  return {
    debug: (message: string, ...args: any[]): void => {
      if (shouldLogDebug) {
        console.debug(formatMessage('debug', message), ...args);
      }
    },
    
    info: (message: string, ...args: any[]): void => {
      console.info(formatMessage('info', message), ...args);
    },
    
    warn: (message: string, ...args: any[]): void => {
      console.warn(formatMessage('warn', message), ...args);
    },
    
    error: (message: string, ...args: any[]): void => {
      console.error(formatMessage('error', message), ...args);
    }
  };
} 