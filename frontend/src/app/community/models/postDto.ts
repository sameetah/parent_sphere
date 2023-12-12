import { UserDto } from './userDto';

export interface PostDto {
  id?: number;
  content: string;
  date?: Date | string;
  userDto?: UserDto;
  forumId?: number;
}
