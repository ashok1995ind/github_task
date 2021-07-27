import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  repos = [];
  constructor(private _userService: UserService) {
    this._userService.reposEmit.subscribe((data) => {
      this.repos = data;
    })
  }
  ngOnInit() {
  }

}
