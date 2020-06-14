import { Request } from 'api/dto/Request';

export interface RequestService {
    saveUserRequest(request: Request): Promise<Request>;
    getUserRequestListByEmail(userEmail: string): Promise<Array<Request>>;
    getUserRequest(userEmail: string, ordinal: number): Promise<Request>
}