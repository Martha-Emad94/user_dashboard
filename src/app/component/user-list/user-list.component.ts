import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PaginationDirective } from '../../directive/pagination.directive';


@Component({
  selector: 'app-user-list',
  imports:[CommonModule,FormsModule,MatPaginatorModule,MatProgressBarModule,PaginationDirective],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  animations: [
    trigger('pageChange', [
      transition('* => *', [
        animate('500ms', keyframes([
          style({ opacity: 0, transform: 'scale(0.5)', offset: 0 }),
          style({ opacity: 0.5, transform: 'scale(1.1)', offset: 0.5 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  totalUsers: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  isLoading: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
    
  }

 
  loadUsers(page: number): void {
    this.isLoading=true;
    
      this.userService.getUsers(page).subscribe(response => {
        this.users = response.data;
        this.totalUsers = response.total;
        this.currentPage = page;
      
        this.isLoading = false;
      }, () => {
       
        this.isLoading = false;
      });
    
  }
    
     

  viewUserDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }

 

  changePage(page: number): void {
    this.loadUsers(page);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

}
