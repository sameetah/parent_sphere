import { UserDto } from './userDto';

export interface PostDto {
  dislikeCount?: number;
  isLiked?: number;
  isDisliked?: any;
  likeCount?: any;
  id?: number;
  content: string;
  date?: Date | string;
  userDto?: UserDto;
  forumId?: number;
}
