import { RequestVo } from 'repository/vo/RequestVo';

export interface RequestDao {
    saveUserRequest(Request: RequestVo): Promise<RequestVo>;
    loadUsersRequest(userEmail: string): Promise<Array<RequestVo>>;
}