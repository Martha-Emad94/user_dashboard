import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';

  constructor(private router: Router,private userService: UserService,) {}

  ngOnInit(): void {
    this.userService.clearSearch.subscribe(clear => {
      if (clear) {
        this.searchValue = ''; // Clear the input field
      }
    });
  }

  searchUser(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;
    console.log('Searching for:', searchValue);
    if (searchValue) {
      const userId = Number(searchValue);
      if (userId) {
        this.router.navigate(['/user', userId]);
       
        console.log(userId);
      } else {
        console.error('Invalid ID:', searchValue);
      }
      
    } else {
      this.router.navigate(['/']);
    }

  }
}
