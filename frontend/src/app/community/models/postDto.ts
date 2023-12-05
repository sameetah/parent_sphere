export interface PostDto {
  id?: number;
  content: string;
  date?: Date | string;
  authorId?: number;
  forumId?: number;
}
