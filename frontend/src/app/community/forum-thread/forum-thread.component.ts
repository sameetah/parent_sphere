import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostResponse } from '../models/postResponse';
import { ForumService } from '../forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDto } from '../models/postDto';
import { UserService } from 'src/app/user/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css'],
})
export class ForumThreadComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
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
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.forumId = +params['id'];
      this.fetchPosts();
      console.log(this.forumId);
    });

    this.forumService.posts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => {
        this.posts = posts;
        this.posts.forEach((post) => {
          if (post.userDto?.profileImageUrl) {
            this.userService
              .fetchImage(post.userDto.profileImageUrl)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (blob) => {
                  const objectURL = URL.createObjectURL(blob);
                  post.userDto!.profileImageUrl = objectURL;
                },
                (error) => {
                  console.error('Error loading image:', error);
                  // Handle error or set a default image URL
                }
              );
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchPosts(): void {
    this.forumService.getInitialPosts().subscribe({
      next: (response: PostResponse) => {
        this.postResponse = response;
        this.forumService.updatePosts(response.content);
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
  handleImageError(event: any): void {
    event.target.src = 'path/to/default/image.jpg'; // Path to a default image
  }
}
