import { PostDto } from './postDto';

export interface PostResponse {
  content: PostDto[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
