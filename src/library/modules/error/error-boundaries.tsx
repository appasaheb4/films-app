import React from 'react';
//import {errorReporting, ErrorType} from './ErrorReporting';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  FallbackComponent?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  {hasError: boolean}
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidMount() {
    // errorReporting.addEventListener(this.onError);
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error) {
    //errorReporting.report(error, ErrorType.Unhandled);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError = (error: Error, type: ErrorType) => {
    this.setState({hasError: true});
  };

  render() {
    const {hasError} = this.state;
    const {children, FallbackComponent} = this.props;

    // Custom fallback UI
    if (hasError) {
      if (FallbackComponent) {
        return FallbackComponent;
      }

      return children;
    }

    return children;
  }
}
