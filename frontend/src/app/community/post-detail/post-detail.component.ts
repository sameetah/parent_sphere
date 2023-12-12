import { Component, Input, OnInit } from '@angular/core';
import { PostDto } from '../models/postDto';
import { PostDetailDto } from '../models/postDetailDto';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() post!: PostDto;

  postDetail!: PostDetailDto;

  toggleLike(post: any): void {
    post.isLiked = !post.isLiked;
    post.likeCount += post.isLiked ? 1 : -1;
    // Add logic to handle the like functionality, e.g., update server
  }
  toggleDislike(post: any): void {
    post.isDisliked = !post.isDisliked;
    post.dislikeCount += post.isDisliked ? 1 : -1;
    // Add logic to handle the dislike functionality, e.g., update server
  }
}
