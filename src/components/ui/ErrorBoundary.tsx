import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  scope?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in ${this.props.scope || 'root'}:`, error, errorInfo);
    // In a real app, send to Sentry here
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-status-error/20 bg-status-error/5 rounded-lg h-full min-h-[200px]">
          <AlertTriangle className="w-8 h-8 text-status-error mb-3" />
          <h2 className="text-lg font-semibold text-slate-800">Widget Failure</h2>
          <p className="text-sm text-slate-600 mb-4 text-center">
            {this.props.scope ? `${this.props.scope} encountered an error.` : 'Something went wrong.'}
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Component
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-2 bg-slate-900 text-red-300 text-xs rounded max-w-full overflow-auto">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}