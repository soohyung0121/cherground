import { User } from "api/dto/User";

export interface UserService {
    signUp(user: User): Promise<User>;
    signIn(user: User): Promise<string>;
}