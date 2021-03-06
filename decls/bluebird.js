declare class Promise<+R> {
  constructor(callback: (
    resolve: (result: Promise<R> | R) => void,
    reject: (error: any) => void
  ) => mixed): this;

  then<U>(
    onFulfill?: (value: R) => Promise<U> | U,
    onReject?: (error: any) => Promise<U> | U
  ): Promise<U>;

  catch<U>(
    onReject?: (error: any) => ?Promise<U> | U
  ): Promise<U>;

  static resolve<T>(object: Promise<T> | T): Promise<T>;
  static reject<T>(error?: any): Promise<T>;
  static all: Promise$All;
  static race<T, Elem: Promise<T> | T>(promises: Array<Elem>): Promise<T>;
  static promisify<T>(func: Function): (...args: Array<any>) => Promise<T>;
}

declare module 'bluebird' {
  declare module.exports: Class<Promise<*>>
}
