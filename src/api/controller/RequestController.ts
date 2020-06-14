import { Request } from '../dto/Request';

export interface RequestController {
    saveUserRequest(request: Request): Promise<Boolean>;
    getUserRequestListByEmail(userEmail: string): Promise<Array<Request>>;
    getUserRequest(userEmail: string, ordinal: number): Promise<Request>
}
