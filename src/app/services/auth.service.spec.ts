import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('authUser', () => {
    it('should authenticate a valid user', () => {
      const user = { userName: 'testUser', password: 'testPass' };

      // Simulate users in localStorage
      const users = [{ userName: 'testUser', password: 'testPass' }];
      localStorage.setItem('Users', JSON.stringify(users));

      const result = service.authUser(user);
      expect(result).toEqual(user);
    });

    it('should return undefined for invalid credentials', () => {
      const user = { userName: 'wrongUser', password: 'wrongPass' };

      // Simulate users in localStorage
      const users = [{ userName: 'testUser', password: 'testPass' }];
      localStorage.setItem('Users', JSON.stringify(users));

      const result = service.authUser(user);
      expect(result).toBeUndefined();
    });

    it('should return undefined if no users are stored', () => {
      const user = { userName: 'testUser', password: 'testPass' };

      // No users in localStorage
      localStorage.setItem('Users', JSON.stringify([]));

      const result = service.authUser(user);
      expect(result).toBeUndefined();
    });
  });

  describe('getLoggedInUser', () => {
    it('should return the logged-in user token if present', () => {
      const token = 'userToken';
      localStorage.setItem('token', token);

      const result = service.getLoggedInUser();
      expect(result).toBe(token);
    });

    it('should return null if no user token is present', () => {
      localStorage.removeItem('token');

      const result = service.getLoggedInUser();
      expect(result).toBeNull();
    });
  });

  describe('getLoggedInUserId', () => {
    it('should return the user ID if the user is logged in', () => {
      const user = { userName: 'testUser', password: 'testPass', id: 123 };
      localStorage.setItem('Users', JSON.stringify([user]));
      localStorage.setItem('token', 'testUser');

      const result = service.getLoggedInUserId();
      expect(result).toBe(123);
    });

    it('should return null if no user is logged in', () => {
      localStorage.removeItem('token');
      localStorage.setItem('Users', JSON.stringify([]));

      const result = service.getLoggedInUserId();
      expect(result).toBeNull();
    });

    it('should return null if the user is not found in localStorage', () => {
      localStorage.setItem('Users', JSON.stringify([{ userName: 'testUser', password: 'testPass', id: 123 }]));
      localStorage.setItem('token', 'nonExistentUser');

      const result = service.getLoggedInUserId();
      expect(result).toBeNull();
    });
  });
});