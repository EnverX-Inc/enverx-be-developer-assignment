import { Blogs } from '../entities/blog.entity';
import { AppDataSource } from '../utils/dataSource.utils';
import ErrorResponse from '../utils/errorResponse';

const blogRep = AppDataSource.getRepository(Blogs);

// Service to fetch all the records
export async function _find(params: object) {
  try {
    let data = await blogRep.findOne({
      ...params,
    });

    if (!data) throw new ErrorResponse('Blog Post Does Not Exist', 400);

    return data;
  } catch (err) {
    throw err;
  }
}

// Service to fetch individual record with id
export async function _findAll(params: object) {
  try {
    let data = await blogRep.find({
      ...params,
    });

    return data;
  } catch (err) {
    throw err;
  }
}

// Service to insert single record
export async function _insert(post: Blogs) {
  try {
    let data = await blogRep.insert(post);

    return data;
  } catch (err) {
    throw err;
  }
}

// Service to update single record
export async function _update(id: string, post: Blogs) {
  try {
    let data = await blogRep.update(id, post);

    if (!data || !data.affected)
      throw new ErrorResponse('Blog Post Does Not Exist', 400);

    return data;
  } catch (err) {
    throw err;
  }
}

// Service to delete single record
export async function _delete(id: string) {
  try {
    let data = await blogRep.delete(id);

    if (!data || !data.affected)
      throw new ErrorResponse('Blog Post Does Not Exist', 400);

    return data;
  } catch (err) {
    throw err;
  }
}
