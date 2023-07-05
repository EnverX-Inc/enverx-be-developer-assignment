import { isEmpty } from "lodash";
import { FilterCategory } from "./typings/category";
import { paginate } from "./util";

export function fetchAllPostsAggregation(filter: FilterCategory) {
  const { limit, skip } = paginate(filter);
  const $match = isEmpty(filter) ? {} : { category: filter.category };
  const $sort = { createdOn: -1 };
  
  return [
    { $match },
    { $sort },
    {
      $facet: {
        result: [{ $skip: skip }, { $limit: limit }],
        count: [{ $count: 'count' }]
      }
    }
  ];
}
