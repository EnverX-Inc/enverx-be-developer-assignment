import { Blogs } from '../entities/blog.entity';
import { AppDataSource } from '../utils/dataSource.utils';

export async function _find(params: object | null = null) {
  try {
    const blogRep = AppDataSource.getRepository(Blogs);
    let data;

    if (params) {
      data = await blogRep.findOne({
        ...params,
      });
    } else {
      data = await blogRep.find();
    }

    return data;
  } catch (err) {
    throw err;
  }
}
