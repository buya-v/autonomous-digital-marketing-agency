import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FallbackUI } from './FallbackUI';
import { AppError, logError } from '../utils/errors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: AppError | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, error: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError = logError(error, 'GlobalRoot', 'Rendering');
    // In a real app we might attach component stack here
    if (errorInfo.componentStack) {
       appError.rawStack += `\nComponent Stack: ${errorInfo.componentStack}`;
    }
    this.setState({ error: appError });
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} resetErrorBoundary={this.handleReset} />;
    }

    return this.props.children;
  }
}