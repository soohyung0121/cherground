import { UserController } from "../UserController";
import { UserService } from "service/UserService";
import { injectable, inject } from "inversify";
import { User } from 'api/dto/User';

@injectable()
export class UserControllerImpl implements UserController {
    
    private userService: UserService;

    constructor(
        @inject("UserService") userService: UserService
    ){
        this.userService = userService;
    }

    signUp = (user: User): Promise<boolean> => {
        let userPromise: Promise<User> = this.userService.signUp(user);

        return new Promise((resolve, reject) => {
            userPromise
                .then((user: User) => {
                    //resolve
                    resolve(true);
                })
                .catch((err) => {
                    resolve(false);
                })
        })
    }

    signIn = (user: User): Promise<string> => {
        let result: Promise<string> = this.userService.signIn(user);
        
        return new Promise((resolve, reject) => {
            result
                .then((jwt: string) => {
                    resolve(jwt);
                })
                .catch((err: Error) => {
                    reject(err);
                })
        })
    }
}