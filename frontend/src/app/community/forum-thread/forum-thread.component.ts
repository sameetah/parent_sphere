import { Component, OnInit } from '@angular/core';
import { PostResponse } from '../models/postResponse';
import { ForumService } from '../forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDto } from '../models/postDto';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css'],
})
export class ForumThreadComponent implements OnInit {
  postResponse: PostResponse = {
    content: [],
    pageNo: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    last: true,
  };
  forumId!: number;
  posts: PostDto[] = [];
  showNewThreadForm = false;
  newThreadTitle = '';

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.forumId = +params['id'];
    });
    this.forumService.getInitialPosts().subscribe({
      next: (response: PostResponse) => {
        this.postResponse = response;
      },
      error: (error) => {
        console.error('Error loading initial posts:', error);
      },
    });
  }

  toggleNewThreadForm() {
    this.showNewThreadForm = !this.showNewThreadForm;
  }

  submitNewThread() {
    const newPost: PostDto = {
      content: this.newThreadTitle,
      forumId: this.forumId,
    };
    console.log(newPost);
    this.forumService.createPost(newPost).subscribe({
      next: (response) => {
        this.newThreadTitle = '';
        this.posts.unshift(response); // Add the new post at the beginning of the array
        console.log('Post created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
    this.showNewThreadForm = false;
  }
  nextPage() {
    throw new Error('Method not implemented.');
  }
  previousPage() {
    throw new Error('Method not implemented.');
  }
}
