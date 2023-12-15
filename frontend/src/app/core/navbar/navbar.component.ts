import { AuthenticationService } from './../../user/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/user/models/user';
import { NotificationService } from 'src/app/user/services/notification.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  private destroy$ = new Subject<void>();
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.updateUserStatus();
  }
  updateUserStatus(): void {
    this.user = this.userService.getUserFromLocalCache();

    if (!this.user) {
      console.error('User is not logged in or user data is unavailable');
    }

    if (this.user)
      this.userService
        .fetchImage(this.user.profileImageUrl)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (blob) => {
            const objectURL = URL.createObjectURL(blob);
            if (this.user) {
              // Additional check for TypeScript's benefit
              this.user.profileImageUrl = objectURL;
            }
          },
          error: (error) => {
            console.error('Error loading image:', error);
            // Handle error or set a default image URL
          },
        });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signOut(): void {
    this.authenticationService.logOut(); // Implement this method in UserService
    this.updateUserStatus();
    this.router.navigate(['/']); // Redirect to home page or login page
  }
}
