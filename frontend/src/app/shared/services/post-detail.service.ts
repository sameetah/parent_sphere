import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostDetailDto } from '../../community/models/postDetailDto';

@Injectable({
  providedIn: 'root',
})
export class PostDetailService {
  private apiUrl = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) {}

  createComment(
    postId: number,
    comment: PostDetailDto
  ): Observable<PostDetailDto> {
    return this.http.post<PostDetailDto>(
      `${this.apiUrl}/${postId}/comments`,
      comment
    );
  }

  getCommentsByPostId(postId: number): Observable<PostDetailDto[]> {
    return this.http.get<PostDetailDto[]>(`${this.apiUrl}/${postId}/comments`);
  }

  getCommentById(postId: number, commentId: number): Observable<PostDetailDto> {
    return this.http.get<PostDetailDto>(
      `${this.apiUrl}/${postId}/comments/${commentId}`
    );
  }

  updateComment(
    postId: number,
    commentId: number,
    comment: PostDetailDto
  ): Observable<PostDetailDto> {
    return this.http.put<PostDetailDto>(
      `${this.apiUrl}/${postId}/comments/${commentId}`,
      comment
    );
  }

  deleteComment(postId: number, commentId: number): Observable<PostDetailDto> {
    return this.http.delete<PostDetailDto>(
      `${this.apiUrl}/${postId}/comments/${commentId}`
    );
  }

  likeComment(
    postId: number,
    commentId: number,
    userId: number
  ): Observable<PostDetailDto> {
    return this.http.post<PostDetailDto>(
      `${this.apiUrl}/${postId}/comments/${commentId}/likes?userId=${userId}`,
      {}
    );
  }

  dislikeComment(
    postId: number,
    commentId: number,
    userId: number
  ): Observable<PostDetailDto> {
    return this.http.post<PostDetailDto>(
      `${this.apiUrl}/${postId}/comments/${commentId}/dislikes?userId=${userId}`,
      {}
    );
  }
}
