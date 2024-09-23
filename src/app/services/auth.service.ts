import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


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
  constructor() {}

  

  /* attachSignin(element: any) {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('Google User signed in:', profile.getName(), profile.getEmail());
        
        // Store Google token in localStorage
        localStorage.setItem('googleToken', id_token);
      },
      (error: any) => {
        console.error(JSON.stringify(error, undefined, 2));
      }
    );
  }

  googleSignOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2.signOut().then(() => {
        console.log('User signed out from Google.');
      });
    }
  } */

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
