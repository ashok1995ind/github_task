import { EventEmitter, Injectable, Output } from '@angular/core';
import { GIT_ENV } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() userEmit: EventEmitter<Object> = new EventEmitter();
  @Output() reposEmit: EventEmitter<Object> = new EventEmitter();
  constructor(private http: HttpClient,) {

  }

  getRepos(query) {
    let queryParams = this.jsonToQueryString(query);
    return (this.http.get(GIT_ENV.BASE_URL + `/get-repos${queryParams}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }));
  }

  getUser(query) {
    let queryParams = this.jsonToQueryString(query);
    return (this.http.get(GIT_ENV.BASE_URL + `/get-user${queryParams}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }));
  }

  emitUser(data) {
    this.userEmit.emit(data);
  }

  emitRepos(data) {
    this.reposEmit.emit(data);
  }

  jsonToQueryString(json) {
    return '?' +
      Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key]);
      }).join('&');
  }
}
