export default class ErrorResponse extends Error {
  statusCode: number;
  data: any;
  constructor(message: string, statusCode: number, data: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
