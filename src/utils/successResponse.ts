export default class SuccessResponse {
  data: any;
  txt: any;
  statusCode: number;
  status: boolean;
  constructor(data: any, statusCode: number = 200, txt: string = '') {
    this.statusCode = statusCode;
    this.txt = txt;
    this.data = data;
    this.status = true;
  }
}
