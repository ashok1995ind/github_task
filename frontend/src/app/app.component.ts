import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = new FormControl('', Validators.required);
  user: any;
  repos = [];
  isSubmit = false;
  error;
  constructor(public _userService: UserService) {
  }

  getData() {
    this.isSubmit = true;
    this.error = {}
    if (this.username.valid) {
      this._userService.getRepos({ 'username': this.username.value }).subscribe((data) => {
        this.repos = data['data'];
        this._userService.emitRepos(this.repos);
        this.isSubmit = false;
        this.username.reset();
      }, (error) => { //Error callback
        this.error = error;
        //throw error;   //You can also throw the error to a global error handler
      })

      this._userService.getUser({ 'username': this.username.value }).subscribe((data) => {
        this.user = data['data'];
        this.isSubmit = false;
        this.username.reset();
        this._userService.emitUser(this.user);
      }, (error) => { //Error callback
        this.error = error;
        //throw error;   //You can also throw the error to a global error handler
      })
    }
  }
}
