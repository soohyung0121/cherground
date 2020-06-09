import { Request } from 'api/dto/Request';

export interface RequestService {
    getUserRequestByEmail(request: Request): Promise<Request>;
    getUserRequestListByEmail(userEmail: string): Promise<Array<Request>>;
}