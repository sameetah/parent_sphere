export interface PostdetailDto {
  isLiked: any;
  isDisliked: any;
  id?: number;
  content: string;
  postId: number;
  authorId: number;
  likesCount?: number;
  dislikesCount?: number;
}
