import { Blogs } from '../entities/blog.entity';
import { AppDataSource } from '../utils/dataSource.utils';
import ErrorResponse from '../utils/errorResponse';

export async function _find(params: object) {
  try {
    const blogRep = AppDataSource.getRepository(Blogs);

    let data = await blogRep.findOne({
      ...params,
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function _findAll(params: object) {
  try {
    const blogRep = AppDataSource.getRepository(Blogs);

    let data = await blogRep.find({
      ...params,
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function _insert(post: Blogs) {
  try {
    let blogRep = AppDataSource.getRepository(Blogs);

    let data = await blogRep.insert(post);

    return data;
  } catch (err) {
    throw err;
  }
}

export async function _update(id: string, post: Blogs) {
  try {
    let blogRep = AppDataSource.getRepository(Blogs);

    let data = await blogRep.update(id, post);

    if (!data || !data.affected)
      throw new ErrorResponse('Blog Post Does Not Exist', 400);

    return data;
  } catch (err) {
    throw err;
  }
}

export async function _delete(id: string) {
  try {
    let blogRep = AppDataSource.getRepository(Blogs);

    let data = await blogRep.delete(id);

    if (!data || !data.affected)
      throw new ErrorResponse('Blog Post Does Not Exist', 400);

    return data;
  } catch (err) {
    throw err;
  }
}
