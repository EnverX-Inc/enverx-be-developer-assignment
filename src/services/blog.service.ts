import { Blogs } from '../entities/blog.entity';
import { AppDataSource } from '../utils/dataSource.utils';

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
