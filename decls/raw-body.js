declare module 'raw-body' {
  declare module.exports: (req: http$IncomingMessage, opts?: Object) => Promise<string>
}
