import { RequestController } from '../RequestController';
import { RequestService } from 'service/RequestService';
import { injectable, inject } from 'inversify';
import { Request } from 'api/dto/Request';

@injectable()
export class RequestControllerImpl implements RequestController {
    private requestService : RequestService;
    
    constructor(
        @inject("RequestService") requestService : RequestService
    ) {
        this.requestService = requestService;
    }

    saveUserRequest= (requests: Request): Promise<Boolean> => {
        let requestPromise = this.requestService.saveUserRequest(requests);

        return new Promise((resolve, reject) => {
            requestPromise
                .then((requests) => {
                    resolve(true)
                })
                .catch((err) => {
                    reject(false)
                })
        })
    }

    getUserRequestListByEmail = (userEmail: string): Promise<Array<Request>> => {
        let userRequestListPromise = this.requestService.getUserRequestListByEmail(userEmail);
        console.log('Request controller ok')

        return new Promise((resolve, reject) => {
            userRequestListPromise
                .then((data) => {
                    // console.log(data, 'in OrderController')
                    resolve(<Array<Request>> data)
                })
                .catch((err) => {
                    console.log("this is controller reject zunkyu")
                    reject(err)
                })
        })
    }
    getUserRequest = (userEmail: string, ordinal: number): Promise<Request> => {
        let userRequest : Promise<Request> =  this.requestService.getUserRequest(userEmail, ordinal)

        return new Promise((resolve, reject) => {
            userRequest
            .then((request : Request) => {
                resolve(request)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}