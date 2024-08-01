import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  

  constructor(private router: Router) {}

  searchUser(event: Event) {
    const input = event.target as HTMLInputElement;
    let searchValue = input.value;
    console.log('Searching for:', searchValue);
    if (searchValue) {
      const userId = Number(searchValue);
      if (userId) {
        this.router.navigate(['/user', userId]);
        searchValue = '';
        console.log(userId);
      } else {
        console.error('Invalid ID:', searchValue);
      }
    } else {
      this.router.navigate(['/']);
      
    }
     // Clear the input field
  }
}
