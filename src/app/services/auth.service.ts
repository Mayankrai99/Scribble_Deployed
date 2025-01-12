import { Injectable } from '@angular/core';


interface User {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedInUser: string | null = null;
  loggedInUserId: number | null = null;
  constructor() {
    
  }


  authUser(user: User): User | undefined {
    const users = localStorage.getItem('Users');
    
    const userList: User[] = users ? JSON.parse(users) : [];

    return userList.find(
      (u) => u.userName === user.userName && u.password === user.password
    );
  }

  getLoggedInUser() {
    return localStorage.getItem('token');
  }

  getLoggedInUserId() {
    this.loggedInUser = localStorage.getItem('token');
      const usersData = JSON.parse(localStorage.getItem('Users') || '[]');
      const userSK = usersData.find((user: any) => user.userName === this.loggedInUser);
      console.log(localStorage);
      
      if (userSK) {
        console.log('User ID:', userSK.id);
        return userSK.id;
      } else {
        console.log('User not found');
        return null;
      }
    
  }
}
