export interface PostDetailDto {
  isLiked?: boolean;
  isDisliked?: boolean;
  id?: number;
  content: string;
  postId: number;
  authorId: number;
  likesCount?: number;
  dislikesCount?: number;
}
