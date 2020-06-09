import { RequestService } from 'service/RequestService';
import { injectable, inject } from 'inversify';
import { RequestDao } from 'repository/dao/RequestDao'
import { Request } from 'api/dto/Request';
import { RequestVo } from 'repository/vo/RequestVo';
import { RequestMapper } from 'mapper/RequestMapper';

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

    getUserRequestByEmail = (requests: Request): Promise<Request> => {
        let usersRequest: Promise<RequestVo> = this.requestDao.saveUserRequest(requests)

        return new Promise((resolve, reject) => {
            usersRequest
                .then(() => {
                    resolve(requests)
                })
                .catch((err) => {
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
                    resolve(<Array<RequestVo>> data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}