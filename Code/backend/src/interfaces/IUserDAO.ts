import { User as UserModel } from "../models/User";

export interface IUserDAO {
  registerUser(userToRegister: UserModel): Promise<any>;
  updateUser(userToUpdate: UserModel): Promise<any>;
  updatePassword(email: string, password: string): Promise<any>;
  updateRecoverCode(email: string, code: string): Promise<any>;
  compareRecoverCode(email: string, code: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  getUserNoPwd(userId: string): Promise<any>;
}
