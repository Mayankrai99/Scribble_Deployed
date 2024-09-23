import { Injectable } from '@angular/core';
import { IUser } from '../common/IUser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  addUsers(user: IUser): void {
    let users: any[] = [];
    const storedUsers = localStorage.getItem('Users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          users = parsedUsers;
        } else {
          console.warn('Stored users are not an array.');
        }
      } catch (e) {
        console.error('Failed to parse stored users:', e);
      }
    }
    users = [user, ...users];
    localStorage.setItem('Users', JSON.stringify(users));
  }

  getNewUserId(): Observable<number> { return of(Math.floor(Math.random() * 1000)); 
     }
}
