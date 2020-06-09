import { Request } from '../dto/Request';

export interface RequestController {
    getUserRequestByEmail(request: Request): Promise<Boolean>;
    getUserRequestListByEmail(userEmail: string): Promise<Array<Request>>;
}
