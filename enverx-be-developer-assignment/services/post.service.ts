import postModel from '../models/postDetails.model';
import { isEmpty, isNil } from 'lodash';
import { ObjectId } from 'mongodb';
import { AggregationWithCount, post, FilterCategory } from '../utility/typings/category';
import { fetchAllPostsAggregation } from '../utility/aggregation';

export const fetchAllPosts = async (filter: FilterCategory) => {
  try {
    const query: any = {};
    if (!isEmpty(filter) && filter.category) {
      query.category = filter.category;
    }
    
    const pipeline = fetchAllPostsAggregation(filter);
    
    const [allPostsData] = await postModel.collection
      .aggregate<AggregationWithCount<post[]>>(pipeline)
      .toArray();
    
    return allPostsData;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const projection = { blog: 1, category: 1 };
    const post = await postModel.collection.findOne(
      { _id: new ObjectId(postId) },
      { projection }
    );

    return post;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (posts: post) => {
  try {
    const post = await postModel.create({
      ...posts,
      userId: new ObjectId(posts.userId),
    });

    return post;
  } catch (error) {
    throw error;
  }
};

export const updatePostById = async ({ postId, blog, category }: { postId: string, blog: string, category: string }) => {
  try {
    const data = await postModel.updateOne(
      { _id: new ObjectId(postId), isDeleted: false },
      { $set: { blog, category } }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePostById = async (postId: string) => {
  try {
    const $set = { isDeleted: true };
    const deletedPost = await postModel.updateOne(
      { _id: new ObjectId(postId) },
      { $set }
    );

    return deletedPost.modifiedCount > 0;
  } catch (error) {
    throw error;
  }
};
