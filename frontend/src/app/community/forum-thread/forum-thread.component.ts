import { PostDto } from 'src/app/community/models/postDto';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PostResponse } from '../models/postResponse';
import { ForumService } from '../forum.service';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/user/services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/user/services/notification.service';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css'],
})
export class ForumThreadComponent implements OnInit, OnDestroy {
  selectedPostForComment!: PostDto | null;

  private destroy$ = new Subject<void>();
  postResponse: PostResponse = {
    content: [],
    pageNo: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    last: true,
  };
  bookmarkedPosts: Set<number> = new Set();
  forumId!: number;
  posts: PostDto[] = [];
  showNewThreadForm = false;
  newThreadTitle = '';

  constructor(
    private forumService: ForumService,
    private userService: UserService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  bookmarkPost(post: PostDto) {
    post.isBookmarked = !post.isBookmarked;
    if (post.isBookmarked && post.id) {
      console.log(post.id);
      this.bookmarkedPosts.add(post.id);
    } else {
      if (post.id) this.bookmarkedPosts.delete(post.id);
    }
    localStorage.setItem(
      'bookmarkedPosts',
      JSON.stringify(Array.from(this.bookmarkedPosts))
    );
  }
  commentOnPost(post: PostDto): void {
    this.selectedPostForComment = post;
    console.log('Selected post for comment:', this.selectedPostForComment);
  }
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
              .subscribe({
                next: (blob) => {
                  const objectURL = URL.createObjectURL(blob);
                  post.userDto!.profileImageUrl = objectURL;
                },

                error: (error) => {
                  console.error('Error loading image:', error);
                  // Handle error or set a default image URL
                },
              });
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

        // Update the user's profile image URL in the response
        if (response.userDto?.profileImageUrl) {
          this.userService
            .fetchImage(response.userDto.profileImageUrl)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (blob) => {
                const objectURL = URL.createObjectURL(blob);
                response.userDto!.profileImageUrl = objectURL;
              },
              (error) => {
                console.error('Error loading image:', error);
                // Handle error or set a default image URL
              }
            );
        }

        // Add the new post (with updated profile image) to the beginning of the array
        this.posts.push(response);

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
  deletePost(post: PostDto) {
    if (
      post.id !== undefined &&
      confirm('Are you sure you want to delete this post?')
    ) {
      this.forumService.deletePostById(post.id).subscribe({
        next: () => {
          this.posts = this.posts.filter((p) => p.id !== post.id);

          console.log('Post deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        },
      });
    } else {
      console.error('Post ID is undefined');
    }
  }

  handleImageError(event: any): void {
    event.target.src = 'path/to/default/image.jpg'; // Path to a default image
  }
}
