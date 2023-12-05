import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { ForumDto } from '../models/forumDto';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css'],
})
export class ForumListComponent implements OnInit {
  showForumForm = false;

  forums: ForumDto[] = [];
  filteredForums: any[] = [];
  newForumTitle = '';

  constructor(private forumService: ForumService, private router: Router) {}
  toggleForumForm() {
    this.showForumForm = !this.showForumForm;
  }
  ngOnInit(): void {
    this.forumService.getForums().subscribe((data) => {
      this.forums = data;
      this.filteredForums = data;
    });
  }
  sortForums(arg0: string) {
    throw new Error('Method not implemented.');
  }
  openCreateForumModal() {
    throw new Error('Method not implemented.');
  }
  submitNewForum() {
    const newForum: ForumDto = {
      title: this.newForumTitle,
    };
    this.forumService.createForum(newForum).subscribe({
      next: (response) => {
        this.newForumTitle = '';
        this.forums.push(response);
        console.log('Forum created successfully:', response);
      },
      error: (error) => {
        // Handle any errors here
        console.error('Error creating forum:', error);
      },
    });
  }

  filterForums() {}

  navigateToForum(forumId: number) {
    this.forumService.getForumById(forumId);
    this.router.navigate(['/community/forums', forumId]);
  }
}
