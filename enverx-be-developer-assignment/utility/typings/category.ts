export type PostCategory = 'Food' | 'Travel' | 'Fashion' | 'Lifestyle' | 'Art'| 'Technology' | 'Sports'|'Other';

export enum Category {
  Food = 'Food',
  Travel = 'Travel',
  Fashion = 'Fashion',
  Lifestyle = 'Lifestyle',
  Art='Art',
  Technology='Technology',
  Sports='Sports',
  Other = 'Other',
}

export interface FilterCategory {
  category?: PostCategory;
  limit?: number;
  skip?: number;
}

export interface Filter {
  limit?: number;
  skip?: number;
}

export interface post {
  userId: string;
  blog: string;
  category: PostCategory;
}

export interface AggregationWithCount<T> {
  result: T;
  count: number;
}
