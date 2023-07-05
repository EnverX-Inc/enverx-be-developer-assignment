import { Filter } from "./typings/category";

/**
 * paginate
 * @param {Filter} filter - The filter object containing limit and skip values.
 * @returns {{ limit: number; skip: number; }} - The updated filter object with default limit and skip values.
 */
export function paginate(filter: Filter): { limit: number; skip: number; } {
  const limit = filter?.limit ?? 10; 
  const skip = filter?.skip ?? 0;
  
  return { limit, skip };
}
