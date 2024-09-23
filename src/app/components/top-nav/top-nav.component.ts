import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  loggedInUser: string | null = null;
  loggedInUserId: number | null = null;
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private authService: AuthService) {
    this.platformId = platformId;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInUser = localStorage.getItem('token');
      this.authService.loggedInUser = this.authService.getLoggedInUser();
    }
  }

  loggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      
      this.loggedInUser = localStorage.getItem('token');
    }
    console.log('28',localStorage);
    return this.loggedInUser;
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('googleToken');
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  getLoggedInUserId() {
    if(isPlatformBrowser(this.platformId)) {
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
    else {
      return null;
    }
    
  }
}
