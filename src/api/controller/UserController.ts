import { User } from '../dto/User';

export interface UserController {
    signUp(user: User): Promise<boolean>;
    signIn(user: User): Promise<string>;
}