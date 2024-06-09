import { User } from "../../models/User";
import { IUserDAO } from "../../interfaces/IUserDAO";
import { UserT } from "../../schemas/userS";

class UserDAOStub implements IUserDAO {
  public users: UserT[];
  public userToReturn: UserT;
  public comparisonToReturn: boolean;

  constructor() {
    this.users = [];
  }

  public setUsers(users: UserT[]) {
    this.users = users;
  }

  async registerUser(userToRegister: User): Promise<any> {
    return this.userToReturn;
  }

  async updateUser(userToUpdate: User): Promise<any> {
    return this.userToReturn;
  }

  async updatePassword(email: string, password: string): Promise<any> {
    return this.userToReturn;
  }

  async updateRecoverCode(email: string, code: string): Promise<any> {
    return this.userToReturn;
  }

  async compareRecoverCode(email: string, code: string): Promise<any> {
    return this.comparisonToReturn;
  }

  async getUserByEmail(email: string): Promise<any> {
    for (const user of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async getUserNoPwd(userId: string): Promise<any> {
    return this.userToReturn;
  }
}

export { UserDAOStub };
