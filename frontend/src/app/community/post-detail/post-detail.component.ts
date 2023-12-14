import { Component, Input, OnInit } from '@angular/core';
import { PostDto } from '../models/postDto';
import { PostDetailDto } from '../models/postDetailDto';
import { PostDetailService } from '../post-detail.service';
import { User } from 'src/app/user/models/user';
import { UserService } from 'src/app/user/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  @Input() post!: PostDto;
  private destroy$ = new Subject<void>();

  postDetail!: PostDetailDto;
  comments: PostDetailDto[] = []; // Array to hold comments
  newCommentContent: string = '';
  user: User | null = null;

  constructor(
    private postDetailService: PostDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalCache();
    if (!this.user) {
      console.error('User is not logged in or user data is unavailable');
      return;
    }
    if (!this.post?.id) {
      console.error('Post ID is undefined');
      return;
    }

    this.postDetailService.getCommentsByPostId(this.post.id).subscribe({
      next: (fetchedComments) => {
        // First, map the fetched comments and assign them to this.comments
        this.comments = fetchedComments.map((comment) => ({
          ...comment,
          isLiked: false,
          isDisliked: false,
        }));

        // Then, iterate over the mapped comments to fetch and set the profile image URLs
        this.comments.forEach((comment) => {
          if (comment.profileImageUrl) {
            this.userService
              .fetchImage(comment.profileImageUrl)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (blob) => {
                  const objectURL = URL.createObjectURL(blob);
                  comment.profileImageUrl = objectURL;
                },
                error: (error) => {
                  console.error('Error loading image:', error);
                  // Optionally set a default image URL here in case of error
                },
              });
          }
        });
      },
      error: (error) => console.error('Error fetching comments', error),
    });
  }

  createComment(): void {
    if (this.post.id === undefined) {
      console.error('Post ID is undefined');
      return;
    }

    // Retrieve the user object
    this.user = this.userService.getUserFromLocalCache();
    if (!this.user) {
      console.error('User is not logged in or user data is unavailable');
      return;
    }

    // Debug: Log the user object
    console.log('User:', this.user);

    // Create the new comment object
    const newComment: PostDetailDto = {
      content: this.newCommentContent,
      postId: this.post.id,
      authorId: this.user.id, // Now we are sure user is not null
      likesCount: 0,
      dislikesCount: 0,
    };

    console.log('New Comment:', newComment);
    console.log(this.user);

    this.postDetailService.createComment(this.post.id, newComment).subscribe({
      next: (comment) => {
        if (comment.profileImageUrl) {
          this.userService
            .fetchImage(comment.profileImageUrl)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (blob) => {
                const objectURL = URL.createObjectURL(blob);
                comment.profileImageUrl = objectURL;
              },

              error: (error) => {
                console.error('Error loading image:', error);
                // Handle error or set a default image URL
              },
            });
        }
        console.log('Comment created', comment);
        this.comments.push(comment); // Add the new comment to the comments array
      },
      error: (error) => console.error('Error creating comment', error),
    });

    this.newCommentContent = ''; // Reset the input field
    console.log(this.comments);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleDislike(commentId: number): void {
    const userId = this.userService.getUserFromLocalCache()?.id;
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    if (this.post.id === undefined) {
      console.error('Post ID is undefined');
      return;
    }

    this.postDetailService
      .dislikeComment(this.post.id, commentId, userId)
      .subscribe({
        next: (updatedComment) => {
          const commentIndex = this.comments.findIndex(
            (c) => c.id === commentId
          );
          if (commentIndex !== -1) {
            this.comments[commentIndex] = updatedComment;
          }
        },
        error: (error) => console.error('Error toggling dislike', error),
      });
  }

  toggleLike(commentId: number): void {
    const userId = this.userService.getUserFromLocalCache()?.id;
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    if (this.post.id === undefined) {
      console.error('Post ID is undefined');
      return;
    }

    this.postDetailService
      .likeComment(this.post.id, commentId, userId)
      .subscribe({
        next: (updatedComment) => {
          let commentIndex = this.comments.findIndex((c) => c.id === commentId);
          if (commentIndex !== -1) {
            this.comments[commentIndex] = updatedComment;
          }
          console.log(updatedComment);
        },
        error: (error) => {
          console.error('Error toggling like', error);
        },
      });
  }

  deleteComment(commentId: number | undefined) {
    if (commentId === undefined) {
      console.error('Comment ID is undefined');
      return;
    }
    if (this.post.id === undefined) {
      console.error('Post ID is undefined');
      return;
    }

    this.postDetailService.deleteComment(this.post.id, commentId).subscribe({
      next: () => {
        console.log('Comment deleted successfully');
        // Remove the comment from the comments array
        this.comments = this.comments.filter(
          (comment) => comment.id !== commentId
        );
        console.log(this.comments);
      },
      error: (error) => {
        console.error('Error deleting comment', error);
      },
    });
  }
}
