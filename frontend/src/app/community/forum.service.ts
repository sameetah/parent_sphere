import { PostResponse } from './models/postResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumDto } from './models/forumDto';
import { environment } from 'src/environments/environment';
import { PostDto } from './models/postDto';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private host = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createPost(newPost: PostDto): Observable<PostDto> {
    return this.http.post<PostDto>(`${this.host}/posts`, newPost);
  }
  getInitialPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.host}/posts`);
  }

  getForumById(id: number): Observable<ForumDto> {
    return this.http.get<any>(`${this.host}/${id}`);
  }

  createForum(forumData: ForumDto): Observable<any> {
    return this.http.post(`${this.host}/forums`, forumData);
  }

  getForums(): Observable<ForumDto[]> {
    return this.http.get<ForumDto[]>(`${this.host}/forums`);
  }
}
