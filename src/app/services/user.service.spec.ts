import { TestBed } from '@angular/core/testing';
import { IUser } from '../common/IUser';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('addUsers', () => {
    it('should add a user to the localStorage', () => {
      const user: IUser = {
        id: 1,
        userName: 'johnDoe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      service.addUsers(user);

      const storedUsers = localStorage.getItem('Users');
      expect(storedUsers).not.toBeNull();
      const parsedUsers: IUser[] = JSON.parse(storedUsers!);
      expect(parsedUsers.length).toBe(1);
      expect(parsedUsers[0]).toEqual(user);
    });

    it('should add a user to the beginning of the list', () => {
      const user1: IUser = {
        id: 1,
        userName: 'johnDoe',
        email: 'john.doe@example.com',
        password: 'password123'
      };
      const user2: IUser = {
        id: 2,
        userName: 'janeSmith',
        email: 'jane.smith@example.com',
        password: 'password456'
      };

      service.addUsers(user1);
      service.addUsers(user2);

      const storedUsers = localStorage.getItem('Users');
      const parsedUsers: IUser[] = JSON.parse(storedUsers!);
      expect(parsedUsers.length).toBe(2);
      expect(parsedUsers[0]).toEqual(user2); // New user should be at the beginning
      expect(parsedUsers[1]).toEqual(user1); // Existing user should be at the second position
    });

    it('should handle malformed JSON in localStorage gracefully', () => {
      // Simulating invalid JSON in localStorage
      localStorage.setItem('Users', '{ invalid json }');

      const user: IUser = {
        id: 3,
        userName: 'samDoe',
        email: 'sam.doe@example.com',
        password: 'password789'
      };
      service.addUsers(user);

      const storedUsers = localStorage.getItem('Users');
      const parsedUsers: IUser[] = JSON.parse(storedUsers!);
      expect(parsedUsers.length).toBe(1);
      expect(parsedUsers[0]).toEqual(user);
    });

    it('should handle when no users exist in localStorage', () => {
      const user: IUser = {
        id: 4,
        userName: 'alexLee',
        email: 'alex.lee@example.com',
        password: 'password101'
      };

      service.addUsers(user);

      const storedUsers = localStorage.getItem('Users');
      const parsedUsers: IUser[] = JSON.parse(storedUsers!);
      expect(parsedUsers.length).toBe(1);
      expect(parsedUsers[0]).toEqual(user);
    });
  });

  describe('getNewUserId', () => {
    it('should return a random user ID between 0 and 1000', (done: DoneFn) => {
      service.getNewUserId().subscribe((userId) => {
        expect(userId).toBeGreaterThanOrEqual(0);
        expect(userId).toBeLessThan(1000);
        done();
      });
    });
  });
});