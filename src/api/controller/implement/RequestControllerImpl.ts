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

    getUserRequestByEmail= (requests: Request): Promise<Boolean> => {
        let requestPromise = this.requestService.getUserRequestByEmail(requests);

        return new Promise((resolve, reject) => {
            requestPromise
                .then((request: Request) => {
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
}