import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user;
  constructor(private _userService: UserService) {
    this._userService.userEmit.subscribe((data) => {
      this.user = data;
    })
  }

  ngOnInit() {
  }
}
