import { RequestVo } from 'repository/vo/RequestVo';

export interface RequestDao {
    save(Request: RequestVo): Promise<RequestVo>;
    getUsersRequest(userEmail: string): Promise<Array<RequestVo>>;
    getUserRequest(userEmail: string, ordinal: number): Promise<RequestVo>;
}