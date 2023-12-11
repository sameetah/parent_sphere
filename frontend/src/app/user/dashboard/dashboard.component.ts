import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { FileUploadStatus } from '../models/file-upload.status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user!: User | null;
  public refreshing!: boolean;
  public fileName!: string;
  public profileImage!: File;
  subscriptions: any;
  profile!: string;
  public fileStatus = new FileUploadStatus();

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  ngOnInit() {
    const user = this.authService.getUserFromLocalCache();
    this.user = user;

    if (user && user.profileImageUrl) {
      this.userService.fetchImage(user.profileImageUrl).subscribe({
        next: (blob) => {
          const objectURL = URL.createObjectURL(blob);
          if (this.user) {
            // Re-check if this.user is still valid
            this.user.profileImageUrl = objectURL;
          }
        },
        error: (error) => {
          console.error('Error loading image:', error);
          // Handle error or set a default image URL
        },
      });
    } else {
      console.log("User or user's profile image URL is not available.");
      // Set a default image URL or take other appropriate actions
    }
  }

  private sendNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'An error occurred. Please try again.'
      );
    }
  }
  public onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.profileImage = element.files[0];
      this.fileName = this.profileImage.name;
      this.uploadProfileImage();
      console.log('File selected: ', this.fileName, this.profileImage);
    } else {
      this.sendNotification(NotificationType.ERROR, 'No file selected');
    }
  }

  private uploadProfileImage(): void {
    if (!this.profileImage) {
      this.sendNotification(NotificationType.ERROR, 'No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', this.profileImage);
    if (this.user) {
      formData.append('username', this.user.username);
    }

    this.userService.updateProfileImage(formData).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Handle progress
        } else if (event instanceof HttpResponse) {
          this.sendNotification(
            NotificationType.SUCCESS,
            'Image uploaded successfully'
          );

          // Immediately update the user's profile image URL
          if (this.user) {
            const objectURL = URL.createObjectURL(this.profileImage);
            this.user.profileImageUrl = objectURL;
            this.fileName = '';
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, 'Error uploading image');
      }
    );
  }

  public onLogOut(): void {
    this.authService.logOut();
    this.router.navigate(['/user/signin']);
    this.sendNotification(
      NotificationType.SUCCESS,
      `You've been successfully logged out`
    );
  }
}
