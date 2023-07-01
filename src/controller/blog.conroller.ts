import { NextFunction, Request, Response } from 'express';
import response from '../utils/successResponse';
import { _find, _findAll, _insert } from '../services/blog.service';
import ErrorResponse from '../utils/errorResponse';

interface params {
  [key: string]: {
    [key: string]: string;
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

    return response(res, data);
  } catch (err: any) {
    return next(err);
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    let id = req.params.id;

    if (!id) throw new ErrorResponse('Invalid Id', 400);

    let params: params = {
      where: {
        blog_id: id,
      },
    };

    let data = await _find(params);

    return response(res, data);
  } catch (err) {
    return next(err);
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let post = req.body;

    let data = await _insert(post);

    return response(res, data, 201, 'Blog Post Inserted');
  } catch (err) {
    return next(err);
  }
}
