import { UserService } from "service/UserService";
import { injectable, inject } from "inversify";
import { UserDao } from "repository/dao/UserDao";
import { User } from "api/dto/User";
import { UserVo } from "../../repository/vo/UserVo";
import { UserMapper } from "mapper/UserMapper";
import jwt from 'jsonwebtoken';

@injectable()
export class UserServiceImpl implements UserService {
   
    private userDao;
    private userMapper;

    constructor (
        @inject("UserDao") userDao: UserDao,
        @inject("UserMapper") userMapper: UserMapper
    ) {
        this.userDao = userDao;
        this.userMapper = userMapper;
    }

    private generateJWTToken(payload: string): string {
        return jwt.sign(payload, 'SECRET_KEY');
    }

    signUp = (user: User): Promise<User> => {

        // let userEmail = this.userDao.existsByEmail(user.email);
        // let emailExist = this.userDao.existsByEmail(user.email);

        let isUserExistPromise: Promise<boolean> = this.userDao.existsByEmail(user.email);

        return new Promise((resolve, reject) => {
            isUserExistPromise
                .then((isUserExist) => {
                    if(isUserExist) {
                        // 유저라는 것을 컨트롤러에 알려준다.
                        //에러메세지로 컨트롤러에게 알려준다.
                        // reject("user exist");
                        // reject("invalid");
                        reject(new Error("Already Exist User"));
                    } else {
                        //회원가입을 진행한다.
                        //dao에 정보를 세이브하고
                        //컨트롤러에는 resolve로 완료를보낸다.
                        let result = this.userDao.save(user);
                        result.then((userVo: UserVo) => {
                            let user: User = this.userMapper.convert(userVo);
                            resolve(user);
                        })
                    } 
                })
                .catch((err) => {
                    reject(err);
                })
        })

        // let userVo: UserVo = this.userMapper.revert(user);
        // if (user === userVo) {

        // }
        // let result = this.userDao.save(userVo);

        // return new Promise((resolve, reject) => {
        //     result.
        //     then((result) => {
        //         resolve(result);
        //     }).catch((result)=> {
        //         reject(result);
        //     })
        // })
    }

    signIn = (user: User): Promise<string> => {
        
        let loginUser: Promise<UserVo> = this.userDao.findUserVoByEmail(user.email);

        return new Promise((resolve, reject) => {
            loginUser.then((userVo: UserVo) => {
                if( userVo.email == user.email ) {
                    if ( userVo.password == user.password) {
                        let accessToken: string = this.generateJWTToken(user.email);
                        //controller로 보낸다.
                        resolve(accessToken);
                    } else {
                        //controller에게 틀렸다고 알려준다.

                        //패스워드가 틀렸다고 메세지를 보낸다.
                        //패스워드 얘기는 말고 그냥 틀렸다고 한다.

                        //console.log()를 이용한다.
                        //스트링으로 인밸리드키
                        reject(new Error("LogIn Failed"))
                    }
                }
            }).catch((err) => {
                //controller에 에러를 전달한다.

                //에러메서드를 이용한다.
                //에러메세지로 보내준다.

                // reject(new Error("Not Exist"));
                reject(err);
            })
        })
    }
}