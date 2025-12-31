export type ErrorSeverity = 'low' | 'medium' | 'critical';

export interface AppError {
  code: string;
  message: string;
  componentId: string;
  timestamp: string;
  severity: ErrorSeverity;
  rawStack?: string;
}

export class ContextualError extends Error {
  code: string;
  componentId: string;
  severity: ErrorSeverity;

  constructor(message: string, code: string, componentId: string, severity: ErrorSeverity = 'medium') {
    super(message);
    this.name = 'ContextualError';
    this.code = code;
    this.componentId = componentId;
    this.severity = severity;
  }
}

export const logError = (error: unknown, componentId: string, action: string) => {
  const timestamp = new Date().toISOString();
  let appError: AppError;

  if (error instanceof ContextualError) {
    appError = {
      code: error.code,
      message: error.message,
      componentId,
      timestamp,
      severity: error.severity,
      rawStack: error.stack
    };
  } else if (error instanceof Error) {
    appError = {
      code: 'UNHANDLED_EXCEPTION',
      message: error.message,
      componentId,
      timestamp,
      severity: 'critical',
      rawStack: error.stack
    };
  } else {
    appError = {
      code: 'UNKNOWN_RUNTIME_ERROR',
      message: String(error),
      componentId,
      timestamp,
      severity: 'critical'
    };
  }

  // In a real app, this would send to Sentry/Datadog
  console.error(`[${timestamp}] [${componentId}] Action: ${action}`, appError);
  return appError;
};