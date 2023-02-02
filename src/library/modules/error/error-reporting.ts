import {firebase} from '@react-native-firebase/crashlytics';
import _ from 'lodash';

export enum ErrorType {
  Handled,
  Unhandled,
  Api,
}

type EventListener = (error: Error, type: ErrorType) => void;

export class ErrorReporting {
  private readonly crashlytics = firebase.crashlytics();
  private readonly defaultErrorHandler = ErrorUtils.getGlobalHandler();
  private readonly observers: EventListener[] = [];

  constructor() {
    ErrorUtils.setGlobalHandler(this.globalErrorHandler.bind(this));
  }

  globalErrorHandler(
    err: Error,
    isFatal?: boolean,
    type: ErrorType = ErrorType.Handled,
  ): void {
    this.observers.map(observer => observer(err, type ?? ErrorType.Handled));
    // TODO: Send error type to crashlytics
    this.crashlytics?.recordError(err);
    this.defaultErrorHandler(err, isFatal);
  }

  addEventListener(eventListener: EventListener): void {
    this.observers.push(eventListener);
  }

  removeEventListener(eventListener: EventListener): void {
    _.remove(this.observers, observer => observer === eventListener);
  }

  report(error: Error, type: ErrorType = ErrorType.Handled): void {
    this.globalErrorHandler(error, undefined, type);
  }
}

export const errorReporting = new ErrorReporting();
