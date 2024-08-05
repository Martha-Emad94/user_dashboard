import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  standalone:true,
  imports:[CommonModule,MatButtonModule],
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

export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.userService.getUserById(id).subscribe(response => {
          this.user = response.data;
          console.log('User data:', this.user);
        });
      }
    });
  }


  goBack() {
    this.userService.clearSearch.next(true)
    this.router.navigate(['/']);
  }
}
