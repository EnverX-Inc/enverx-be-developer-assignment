import { Response } from 'express';

// Generic Succes Response Structure
class SuccessResponse {
  data: any;
  txt: any;
  status: boolean;
  constructor(data: any, txt: string) {
    this.status = true;
    this.txt = txt;
    this.data = data;
  }
}

// Generic Success Response Handler
export default function response(
  res: Response,
  data: any,
  statusCode: number = 200,
  txt: string = ''
) {
  return res.status(statusCode).json(new SuccessResponse(data, txt));
}
