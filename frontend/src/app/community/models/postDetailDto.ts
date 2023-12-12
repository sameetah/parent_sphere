export interface PostDetailDto {
  isLiked: any;
  isDisliked: any;
  id?: number;
  content: string;
  postId: number;
  authorId: number;
  likesCount?: number;
  dislikesCount?: number;
}
