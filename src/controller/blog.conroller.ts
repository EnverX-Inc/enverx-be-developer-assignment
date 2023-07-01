import { NextFunction, Request, Response } from 'express';
import response from '../utils/successResponse';
import { _findAll } from '../services/blog.service';

interface params {
  order: {
    name?: string;
    c_ts?: string;
    category?: string;
  };
}

export async function getBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let qParams = req.query;

    let params: params = {
      order: {},
    };

    if (qParams.name) {
      params['order']['name'] = 'ASC';
    }

    if (qParams.c_ts) {
      params['order']['c_ts'] = 'ASC';
    }

    if (qParams.category) {
      params['order']['category'] = 'ASC';
    }

    let data = await _findAll(params);

    res.send(response(res, data, 200));
  } catch (err: any) {
    return next(err);
  }
}
