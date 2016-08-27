type Koa$Request$charset = string;
type Koa$Request$fresh = bool;
type Koa$Request$header = Object;
type Koa$Request$host = string;
type Koa$Request$hostname = string;
type Koa$Request$href = string;
type Koa$Request$idempotent = bool;
type Koa$Request$ip = string;
type Koa$Request$ips = string[];
type Koa$Request$length = ?number;
type Koa$Request$method = any;
type Koa$Request$origin = string;
type Koa$Request$originalUrl = string;
type Koa$Request$path = string;
type Koa$Request$protocol = string;
type Koa$Request$query = Object;
type Koa$Request$querystring = string;
type Koa$Request$search = string;
type Koa$Request$socket = any;
type Koa$Request$stale = bool;
type Koa$Request$subdomains = string[];
type Koa$Request$type = string;
type Koa$Request$url = string;
type Koa$Next = (...args: Array<any>) => Promise<*>;

declare class Koa$Request extends http$ClientRequest {
  accepts(...types: string[]): string;
  acceptsCharsets(...charsets: string[]): string;
  acceptsEncodings(...types: string[]): string;
  acceptsLanguages(...charsets: string[]): string;
  charset: Koa$Request$charset;
  fresh: Koa$Request$fresh;
  get(field: string): any;
  header: Koa$Request$header;
  headers: Koa$Request$header;
  host: Koa$Request$host;
  hostname: Koa$Request$hostname;
  href: Koa$Request$href;
  idempotent: Koa$Request$idempotent;
  ip: Koa$Request$ip;
  ips: Koa$Request$ips;
  is(...types: string[]): bool;
  length: Koa$Request$length;
  method: Koa$Request$method;
  origin: Koa$Request$origin;
  originalUrl: Koa$Request$originalUrl;
  path: Koa$Request$path;
  protocol: Koa$Request$protocol;
  query: Koa$Request$query;
  querystring: Koa$Request$querystring;
  search: Koa$Request$search;
  req: http$IncomingMessage;
  res: http$ClientRequest;
  secure: bool;
  socket: Koa$Request$socket;
  stale: Koa$Request$stale;
  subdomains: Koa$Request$subdomains;
  type: Koa$Request$type;
  url: Koa$Request$url;

  body: string;
  rawBody: string;
}

declare class Koa$Response extends http$IncomingMessage {
  append(field: string, value: string): void;
  attachment(filename?: string): void;
  body?: ?string|Buffer|stream$Duplex|Object;
  etag: ?any;
  get(field: string): string;
  header: Object;
  headers: Object;
  headerSent: bool;
  is(...types: string[]): bool;
  lastModified: ?Date;
  length: ?number;
  message?: ?string;
  redirect(url: string, alt?: string): void;
  remove(field: string): void;
  set(field: string, value: string): void;
  set(fields: { [key: string]: string }): void;
  socket: any;
  status?: ?number;
  type: ?string;
  vary(field: string): void;

}
declare class Koa$Cookies {
  get(name: string, options?: {
    signed: bool;
  }): string;

  set(name: string, value: string, options?: {
    signed?: bool;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: bool;
    httpOnly?: bool;
  }): this;
}
declare class Koa$Context {
  app: Koa$Koa;

  assert(value: any, msgOrStatus?: number|string, properties?: Object): void;
  assert(value: any, msgOrStatus?: number|string, statusOrMsg?: number|string, properties?: Object): void;

  cookies: Koa$Cookies;
  req: http$IncomingMessage;
  request: Koa$Request;
  res: http$ClientRequest;
  respond: bool;
  response: Koa$Response;
  state: Object;

  throw(msg: string, properties?: Object): void;
  throw(statusCode: number, msg: string, properties?: Object): void;
  throw(statusCode: number, properties?: Object): void;

  // Request aliases
  accepts(...types: string[]): string;
  acceptsCharsets(...charsets: string[]): string;
  acceptsEncodings(...types: string[]): string;
  acceptsLanguages(...charsets: string[]): string;
  fresh: Koa$Request$fresh;
  get(field: string): any;
  header: Koa$Request$header;
  headers: Koa$Request$header;
  host: Koa$Request$host;
  hostname: Koa$Request$hostname;
  href: Koa$Request$href;
  ip: Koa$Request$ip;
  ips: Koa$Request$ips;
  is(...types: string[]): bool;
  method: Koa$Request$method;
  origin: Koa$Request$origin;
  originalUrl: Koa$Request$originalUrl;
  path: Koa$Request$path;
  protocol: Koa$Request$protocol;
  query: Koa$Request$query;
  querystring: Koa$Request$querystring;
  secure: bool;
  socket: Koa$Request$socket;
  stale: Koa$Request$stale;
  subdomains: Koa$Request$subdomains;
  url: Koa$Request$url;

  // response aliases
  append(field: string, value: string): void;
  attachment(filename?: string): void;
  body?: ?string|Buffer|stream$Duplex|Object;
  etag: ?any;
  lastModified: ?Date;
  redirect(url: string, alt?: string): void;
  remove(field: string): void;
  set(field: string, value: string): void;
  set(fields: { [key: string]: string }): void;
  status?: ?number;
}

declare class Koa$Koa extends events$EventEmitter {
  constructor(): Koa$Koa;

  listen(port: number): void;
  callback(): Function;

  use(contextFn: (
    ctx: Koa$Context,
    next: Koa$Next
  ) => ?Promise<*>): this;
}

declare module 'koa' {
  declare module.exports: Class<Koa$Koa>
}
