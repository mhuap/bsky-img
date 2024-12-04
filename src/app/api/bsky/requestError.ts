export default class RequestError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "RequestError";
  }
}