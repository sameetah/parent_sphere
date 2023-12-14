export interface PostDetailDto {
  id?: number;
  content: string;
  postId: number;
  authorId: number;
  likesCount?: number;
  dislikesCount?: number;
  profileImageUrl?: string;
  username?: string;
}
