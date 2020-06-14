import { RequestService } from 'service/RequestService';
import { injectable, inject } from 'inversify';
import { RequestDao } from 'repository/dao/RequestDao'
import { Request } from 'api/dto/Request';
import { RequestVo } from 'repository/vo/RequestVo';
import { RequestMapper } from 'mapper/RequestMapper';
import { RequestStatus, Category } from '../../api/dto/Request';


@injectable()
export class RequestServiceImpl implements RequestService {
    private requestDao;
    private requestMapper;
    
    constructor(
        @inject("RequestDao") requestDao: RequestDao,
        @inject("RequestMapper") requestMapper: RequestMapper
    ) {
        this.requestDao = requestDao;
        this.requestMapper = requestMapper;
    }

    saveUserRequest = async (requests: Request): Promise<Request> => {
        let userRequestList: Array<RequestVo> = await this.requestDao.loadUsersRequest(requests.userEmail);
        
        var ordinal;
        if (userRequestList.length > 0) {
            userRequestList.reduce((previous, current) => {
                return previous.ordinal > current.ordinal ? previous : current;
            });
            ordinal = userRequestList.length + 1;
        } else {
            ordinal = 1;
        }
        requests.ordinal = ordinal;

        // let category = this.requestMapper.convert(requests.category)

        var usersRequest;
        if(requests.categoryName in Category){
            usersRequest = this.requestDao.saveUserRequest(requests)
        } else {
            console.log("INVALID CATEGORY")
        }

        // let usersRequest = this.requestDao.saveUserRequest(requests)

        
        return new Promise((resolve, reject) => {
            usersRequest
            .then((result)=> {
                resolve(requests)
            })
            .catch((err)=> {
                reject(err)
            })
        })
    }

    getUserRequestListByEmail = (userEmail: string): Promise<Array<Request>> => {
        let userRequestListPromise: Promise<Array<Request>> = this.requestDao.loadUsersRequest(userEmail)
        return new Promise((resolve, reject) => {
            userRequestListPromise
                .then((data) => {
                    // console.log(data, "in RequestService")
                    resolve(<Array<Request>> data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    getUserRequest = (userEmail: string, ordinal: number): Promise<Request> => {
        let userRequest : Promise<RequestVo> =  this.requestDao.getUserRequest(userEmail, ordinal)

        return new Promise((resolve, reject) => {
            userRequest
            .then((requestVo : RequestVo) => {
                let getResult = this.requestMapper.convert(requestVo);
                resolve(getResult)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}